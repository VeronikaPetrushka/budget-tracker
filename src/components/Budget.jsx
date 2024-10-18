import React, { useState, useEffect } from "react";
import { StyleSheet, View, TouchableOpacity, Text, Image, ScrollView, Button, Dimensions } from "react-native"
import AsyncStorage from '@react-native-async-storage/async-storage';
import TransactionsModal from "./TransactionsModal";
import GoalModal from "./GoalModal";
import TopUpGoalModal from "./TopUpGoalModal";
import ProgressBar from "./ProgressBar";
import Icons from "./Icons"

const { height } = Dimensions.get('window');

const Budget = () => {
    const [transactionModalVisible, setTransactionModalVisible] = useState(false);
    const [transactionType, setTransactionType] = useState(null);
    const [goalModalVisible, setGoalModalVisible] = useState(false);
    const [goalTopUpModalVisible, setGoalTopUpModalVisible] = useState(false);
    const [limitModalVisible, setLimitModalVisible] = useState(false);
    const [forGoal, setForGoal] = useState(0);

    const [budget, setBudget] = useState(0);
    const [transactions, setTransactions] = useState([]);
    const [goals, setGoals] = useState([]);

    const loadBudgetAndTransactions = async () => {
        try {
            const storedBudget = await AsyncStorage.getItem('budget');
            const storedTransactions = await AsyncStorage.getItem('transactions');
            const storedForGoal = await AsyncStorage.getItem('forGoal');

            if (storedBudget) {
                setBudget(parseFloat(storedBudget));
            }
            if (storedTransactions) {
                setTransactions(JSON.parse(storedTransactions));
            }
            if (storedForGoal) {
                setForGoal(parseFloat(storedForGoal));
            }
        } catch (error) {
            Alert.alert('Storage Error', 'There was an error retrieving data.');
        }
    };

    const loadGoals = async () => {
        try {
            const storedGoals = await AsyncStorage.getItem('goal');
            if (storedGoals) {
                setGoals(JSON.parse(storedGoals));
            }
        } catch (error) {
            Alert.alert('Storage Error', 'There was an error retrieving goals.');
        }
    };

    useEffect(() => {
        loadBudgetAndTransactions();
        loadGoals();
    }, []);

    const updateBudget = async (amount) => {
        const newBudget = budget + amount;
        setBudget(newBudget);
        try {
            await AsyncStorage.setItem('budget', newBudget.toString());
        } catch (error) {
            Alert.alert('Storage Error', 'There was an error updating the budget.');
        }
    };

    const handleTransactionSubmit = (transactionDetails) => {
        setTransactions((prevTransactions) => {
            const newTransactions = [...prevTransactions, transactionDetails];
            AsyncStorage.setItem('transactions', JSON.stringify(newTransactions));
            return newTransactions;
        });

        const amount = parseFloat(transactionDetails.transaction.replace('$', '').replace('+ ', '').replace('- ', ''));
        updateBudget(transactionDetails.transactionType === 'add' ? amount : -amount);
    };

    const handleTopUpGoal = async (amount) => {
        const newBudget = budget - amount;
        const newForGoal = forGoal + amount;
        setBudget(newBudget);
        setForGoal(newForGoal)

        try {
            await AsyncStorage.setItem('budget', newBudget.toString());
            await AsyncStorage.setItem('forGoal', newForGoal.toString());
        } catch (error) {
            Alert.alert('Storage Error', 'There was an error updating the numbers.');
        }

    };

    const handleTransactionModalVisible = (type) => {
        setTransactionType(type);
        setTransactionModalVisible(!transactionModalVisible);
        if (!transactionModalVisible) {
            loadBudgetAndTransactions();
        }
    };

    const handleGoalModalVisible = () => {
        setGoalModalVisible(!goalModalVisible);
        if (!goalModalVisible) {
            loadGoals();
        }
    };

    const handleTopUpModalVisible = () => {
        setGoalTopUpModalVisible(!goalTopUpModalVisible);
    }

    // const handleReset = async () => {
    //     await AsyncStorage.removeItem('transactions');
    //     await AsyncStorage.removeItem('goal');
        // await AsyncStorage.removeItem('forGoal');

    //     loadBudgetAndTransactions();
    //     loadGoals();
    // }

    // const handleLimitModalVisible = () => {
    //     setLimitModalVisible(!limitModalVisible);
    // };

    const formatDate = (date) => {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
    
        return `${day}.${month}.${year}`;
    };

    return (
        <View style={styles.container}>
            <View style={styles.balanceContainer}>
                <Text style={styles.titleText}>Total balance:</Text>
                <View style={styles.balanceBox}>
                    <View style={styles.dateBox}>
                        <Text style={styles.dateText}>{formatDate(new Date())}</Text>
                    </View>
                    <Text style={styles.balanceText}>{budget.toFixed(2)}$</Text>
                    <View style={styles.balanceBtnContainer}>
                        <TouchableOpacity style={styles.balanceAddBtn} onPress={() => handleTransactionModalVisible('add')}>
                            <View style={styles.icon}>
                                <Icons type={'add'}/>
                            </View>
                            <Text style={styles.balanceBtnText}>Add</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.balanceWasteBtn} onPress={() => handleTransactionModalVisible('waste')}>
                            <View style={styles.icon}>
                                <Icons type={'waste'}/>
                            </View>
                            <Text style={styles.balanceBtnText}>Waste</Text>
                        </TouchableOpacity>
                    </View>
                    <Image source={require('../assets/decor/crown-small.png')} style={styles.crownSmall}/>
                    <Image source={require('../assets/decor/crown-big.png')} style={styles.crownBig}/>
                </View>
            </View>

            <View style={styles.itemsContainer}>
                <Text style={styles.titleText}>Goals:</Text>
                {/* <Button title='reset' onPress={handleReset}/>
                <ScrollView> */}
                {goals.length === 0 ? (
                <TouchableOpacity style={styles.goalsBtn} onPress={() => handleGoalModalVisible()}>
                    <View style={styles.icon}>
                        <Icons type={'add'}/>
                    </View>
                    <Text style={styles.btnText}>Set goal</Text>
                </TouchableOpacity>
                ) : (
                    goals.map((goal, index) => (
                        <View key={index} style={styles.goalBox}>
                            <View style={styles.goalTextContainer}>
                                <Text style={styles.goalAmount}>
                                    <Text style={styles.forGoalAmount}>{forGoal} / </Text>
                                     {goal.amount}
                                </Text>
                                <Text style={styles.goalText}>{goal.goal}</Text>
                                <Text style={styles.goalDate}>
                                    <Text style={styles.goalEndDate}>Ends: </Text>{goal.date}</Text>
                                <TouchableOpacity style={styles.goalAddBtn} onPress={() => handleTopUpModalVisible()}>
                                    <View style={styles.icon}>
                                        <Icons type={'add'}/>
                                    </View>
                                    <Text style={styles.balanceBtnText}>Add</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{height: '100%', paddingTop: 20}}>
                            <Image source={require('../assets/decor/violet-crown.png')} style={styles.progressImg}/>
                            <ProgressBar forGoal={forGoal} goalAmount={goal.amount} />
                            </View>
                        </View>
                    ))
                )}
                {/* </ScrollView> */}
            </View>

            <View style={styles.itemsContainer}>
                <Text style={styles.titleText}>Monthly limits:</Text>
                <TouchableOpacity style={styles.limitsBtn}>
                    <View style={styles.icon}>
                        <Icons type={'add'}/>
                    </View>
                    <Text style={styles.btnText}>Set monthly limit</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.transactionsContainer}>
                <Text style={styles.titleText}>List of transactions</Text>
                {transactions.length === 0 ? (
                    <View style={styles.transBox}>
                        <Text style={styles.noTransText}>Here will be your transactions</Text>
                    </View>
                ) : (
                    <ScrollView>
                        {transactions.map((item, index) => (
                            <View key={index} style={styles.transBox}>
                                <View style={styles.transactionTextContainer}>
                                    <Text style={styles.transactionDate}>{item.date}</Text>
                                    <Text style={styles.transactionName}>{item.name}</Text>
                                </View>
                                <Text style={[styles.transactionAmount, item.transactionType === 'add' ? {color: '#14b910'} : {color: '#f66233'}]}>
                                    {item.transaction}
                                </Text>
                            </View>
                        ))}
                    </ScrollView>
                )}
            </View>

            <TransactionsModal 
                visible={transactionModalVisible} 
                onClose={handleTransactionModalVisible}
                transactionType={transactionType}
                onSubmit={handleTransactionSubmit}
                />

            <GoalModal
                visible={goalModalVisible} 
                onClose={handleGoalModalVisible}
                />

            <TopUpGoalModal 
                visible={goalTopUpModalVisible} 
                onClose={handleTopUpModalVisible}
                onAdd={(amount) => handleTopUpGoal(amount)}
                budget={budget}
                />
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 23,
        paddingTop: height * 0.07,
        backgroundColor: '#fff'
    },
    balanceContainer: {
        width: '100%',
        marginBottom: height * 0.021,
        alignItems: 'flex-start'
    },
    titleText: {
        fontSize: 17,
        fontWeight: '700',
        color: '#000',
        marginBottom: height * 0.016
    },
    crownSmall: {
        width: height * 0.11,
        height: height * 0.1,
        position: 'absolute',
        top: 10,
        left: 6
    },
    crownBig: {
        width: height * 0.21,
        height: height * 0.2,
        position: 'absolute',
        top: 20,
        right: 6
    },
    balanceBox: {
        width: '100%',
        height: height * 0.224,
        padding: 25,
        paddingTop: 13,
        alignItems: 'center',
        backgroundColor: '#454545',
        borderRadius: 16
    },
    dateBox: {
        padding: 4,
        width: 110,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F9A13A',
        borderRadius: 30,
        marginBottom: height * 0.025,
        zIndex: 2
    },
    dateText: {
        fontSize: 14,
        fontWeight: '300',
        color: '#fff'
    },
    balanceText: {
        fontSize: 32,
        fontWeight: '600',
        color: '#fff',
        marginBottom: height * 0.025,
        zIndex: 2
    },
    balanceBtnContainer: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        zIndex: 2
    },
    balanceAddBtn: {
        width: '47%',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#14B910',
        flexDirection: 'row',
        padding: 8
    },
    balanceWasteBtn: {
        width: '47%',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#DAA848',
        flexDirection: 'row',
        padding: 8
    },
    icon: {
        width: 22,
        height: 22,
        marginRight: 7
    },
    balanceBtnText: {
        fontSize: 14,
        fontWeight: '500',
        color: '#fff'
    },
    itemsContainer: {
        width: '100%',
        alignItems: 'flex-start',
        marginBottom: height * 0.021
    },
    titleText: {
        fontSize: 17,
        fontWeight: '700',
        color: '#000',
        marginBottom: height * 0.02
    },
    goalsBtn: {
        width: '100%',
        height: height * 0.095,
        backgroundColor: '#9893FF',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 26,
        borderRadius: 16,
        flexDirection: 'row'
    },
    goalBox: {
        width: '100%',
        height: height * 0.21,
        borderWidth: 0.5,
        borderColor: '#ddd',
        borderRadius: 16,
        backgroundColor: '#fafafa',
        padding: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    goalAmount: {
        fontSize: 18,
        fontWeight: '600',
        color: '#000',
        marginBottom: height * 0.017
    },
    forGoalAmount: {
        color: '#14b910'
    },
    goalText: {
        fontSize: 12,
        fontWeight: '500',
        color: '#000',
        marginBottom: height * 0.01
    },
    goalDate: {
        fontSize: 14,
        fontWeight: '300',
        color: '#000',
        marginBottom: height * 0.01
    },
    goalEndDate: {
        color: '#454545'
    },
    goalAddBtn: {
        width: 119,
        padding: 8,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        backgroundColor: '#14b910',
        borderRadius: 10
    },
    progressImg: {
        position: 'absolute',
        width: 50,
        height: 46,
        right: 20,
        top: -8,
        zIndex: 2
    },
    limitsBtn: {
        width: '100%',
        height: height * 0.095,
        backgroundColor: '#F8D694',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 26,
        borderRadius: 16,
        flexDirection: 'row'
    },
    btnText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '500',
        marginLeft: 7
    },
    transactionsContainer: {
        width: '100%',
        alignItems: 'flex-start',
        height: height * 0.225
    },
    transBox: {
        width: '100%',
        height: height * 0.076,
        backgroundColor: '#FAFAFA',
        borderWidth: 1,
        borderColor: '#DDD',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 21,
        borderRadius: 16,
        flexDirection: 'row',
        marginBottom: 8
    },
    noTransText: {
        fontSize: 14,
        fontWeight: '300',
        color: '#B7B7B7'
    },
    transactionTextContainer: {
        alignItems: 'flex-start',
        justifyContent: 'space-between'
    },
    transactionDate: {
        fontSize: 12,
        fontWeight: '300',
        color: '#c9c9c9',
        marginBottom: 5
    },
    transactionName: {
        fontSize: 14,
        fontWeight: '500',
        color: '#000'
    },
    transactionAmount: {
        fontSize: 18,
        fontWeight: '600',
    }
});

export default Budget;