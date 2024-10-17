import React, { useState, useEffect } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { Calendar } from 'react-native-calendars';
import Icons from './Icons';

const TransactionsModal = ({ visible, onClose }) => {
    const [transaction, setTransaction] = useState(0);
    const [goal, setGoal] = useState('');
    const [date, setDate] = useState(new Date());
    const [showCalendar, setShowCalendar] = useState(false);
    const [errors, setErrors] = useState({
        transaction: '',
        goal: '',
        date: '',
    });

    useEffect(() => {
        if (visible) {
            setDate(new Date());
            setTransaction('');
            setGoal('');
            setErrors({ transaction: '', goal: '', date: ''});
        }
    }, [visible]);

    const handleDayPress = (day) => {
        setDate(new Date(day.dateString));
        setShowCalendar(false);
    };

    const validateForm = () => {
        let valid = true;
        const newErrors = {};

        if (!transaction) {
            newErrors.transaction = 'Transaction is required';
            valid = false;
        }

        if (!goal) {
            newErrors.goal = 'A valid goal is required';
            valid = false;
        }

        if (!date) {
            newErrors.date = 'A valid date is required';
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };

    const handleSubmit = () => {
        if (validateForm()) {
            const transactionDetails = {
                date: date.toLocaleDateString(),
                transaction,
                goal,
            };
            onSubmit(transactionDetails);
            onClose();
        } else {
            Alert.alert('Validation Error', 'Please correct the errors before submitting.');
        }
    };

    return (
        <Modal
            transparent={true}
            visible={visible}
            animationType="slide"
            onRequestClose={onClose}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>

                    <View style={styles.transactionContainer}>
                    <TextInput
                        style={styles.transactionInput}
                        value={transaction}
                        onChangeText={setTransaction}
                        placeholder="00.000$"
                        placeholderTextColor={'#8e8e8e'}
                    />
                        <View style={styles.transactionBtnContainer}>
                            <TouchableOpacity style={styles.transactionPlusIcon}>
                                <Icons type={'plus'}/>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.transactionMinusIcon}>
                                <Icons type={'minus'}/>
                            </TouchableOpacity>
                        </View>
                    </View>
                    {errors.transaction ? <Text style={styles.error}>{errors.transaction}</Text> : null}

                    <TextInput
                        style={[styles.goalInput, goal ? {fontWeight: '500'} : {fontWeight: '300'}]}
                        value={goal}
                        onChangeText={setGoal}
                        placeholder="Type the title, for example 'Salary'"
                        placeholderTextColor={'#8e8e8e'}
                    />
                    {errors.goal ? <Text style={styles.error}>{errors.goal}</Text> : null}

                    <TouchableOpacity style={styles.dateContainer} onPress={() => setShowCalendar(!showCalendar)}>
                        <Text style={styles.calendarText}>{date.toLocaleDateString()}</Text>
                        <View style={styles.calendarIcon}>
                            <Icons type={'calendar'}/>
                        </View>
                    </TouchableOpacity>
                    {errors.date ? <Text style={styles.error}>{errors.date}</Text> : null}

                    {showCalendar && (
                        <Calendar
                            onDayPress={handleDayPress}
                            markedDates={{
                                [date.toISOString().split('T')[0]]: { selected: true, selectedColor: '#f9a500' }
                            }}
                            theme={{
                                selectedDayBackgroundColor: '#f9a500',
                                todayTextColor: '#f9a500',
                                arrowColor: '#f9a500',
                                textDayFontWeight: '500',
                                textMonthFontWeight: 'bold',
                                textDayHeaderFontWeight: '500'
                            }}
                        />
                    )}

                    <TouchableOpacity style={styles.confirmBtn} onPress={handleSubmit}>
                        <Text style={styles.confirmBtnText}>Confirm</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.cancelBtn} onPress={onClose}>
                        <Text style={styles.cancelBtnText}>Cancel</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        width: '75%',
        padding: 18,
        backgroundColor: 'white',
        borderRadius: 23,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 15,
        elevation: 5,
    },
    transactionContainer: {
        width: '100%',
        height: 48,
        paddingVertical: 13,
        paddingHorizontal: 11,
        backgroundColor: '#F7F7F7',
        borderRadius: 12,
        marginBottom: 11
    },
    transactionInput: {
        width: '100%',
        height: '100%',
        color: '#8e8e8e',
        fontSize: 18,
        fontWeight: '600'
    },
    transactionBtnContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        position: 'absolute',
        top: 13,
        right: 11
    },
    transactionPlusIcon: {
        width: 15,
        height: 15,
        marginRight: 10
    },
    transactionMinusIcon: {
        width: 25,
        height: 25,
    },
    goalInput: {
        width: '100%',
        borderRadius: 12,
        marginBottom: 11,
        backgroundColor: '#F7F7F7',
        paddingVertical: 8,
        paddingHorizontal: 14,
        color: '#fff',
        fontSize: 12,
    },
    dateContainer: {
        flexDirection: 'row',
        marginBottom: 11,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    calendarText: {
        fontSize: 14,
        fontWeight: '300',
        color: '#d9d9d9',
        marginRight: 10
    },
    calendarIcon: {
        width: 20,
        height: 20
    },
    confirmBtn: {
        width: '100%',
        padding: 14,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 12,
        backgroundColor: '#f9a13a',
        marginBottom: 14
    },
    confirmBtnText: {
        fontSize: 15,
        fontWeight: '600',
        color: '#fff'
    },
    cancelBtnText: {
        fontSize: 14,
        fontWeight: '300',
        color: '#ff5b5b'
    }
});

export default TransactionsModal;
