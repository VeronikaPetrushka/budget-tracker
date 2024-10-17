import { StyleSheet, View, TouchableOpacity, Text, Image, Dimensions } from "react-native"
import Icons from "./Icons"

const { height, width } = Dimensions.get('window');

const Budget = () => {
    return (
        <View style={styles.container}>
            <View style={styles.balanceContainer}>
                <Text style={styles.titleText}>Total balance:</Text>
                <View style={styles.balanceBox}>
                    <View style={styles.dateBox}>
                        <Text style={styles.dateText}>24.09.24</Text>
                    </View>
                    <Text style={styles.balanceText}>00.000$</Text>
                    <View style={styles.balanceBtnContainer}>
                        <TouchableOpacity style={styles.balanceAddBtn}>
                            <View style={styles.icon}>
                                <Icons type={'add'}/>
                            </View>
                            <Text style={styles.balanceBtnText}>Add</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.balanceWasteBtn}>
                            <View style={styles.icon}>
                                <Icons type={'minus'}/>
                            </View>
                            <Text style={styles.balanceBtnText}>Add</Text>
                        </TouchableOpacity>
                    </View>
                    <Image source={require('../assets/decor/crown-small.png')} style={styles.crownSmall}/>
                    <Image source={require('../assets/decor/crown-big.png')} style={styles.crownBig}/>
                </View>
            </View>

            <View style={styles.itemsContainer}>
                <Text style={styles.titleText}>Goals:</Text>
                <TouchableOpacity style={styles.goalsBtn}>
                    <View style={styles.icon}>
                        <Icons type={'add'}/>
                    </View>
                    <Text style={styles.btnText}>Set goal</Text>
                </TouchableOpacity>
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
                <View style={styles.noTransBox}>
                    <Text style={styles.noTransText}>Here will be your transactions</Text>
                </View>
            </View>
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
        paddingTop: height * 0.075,
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
    },
    noTransBox: {
        width: '100%',
        height: height * 0.075,
        backgroundColor: '#FAFAFA',
        borderWidth: 1,
        borderColor: '#DDD',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 21,
        borderRadius: 16,
        flexDirection: 'row'
    },
    noTransText: {
        fontSize: 14,
        fontWeight: '300',
        color: '#B7B7B7'
    }
});

export default Budget;