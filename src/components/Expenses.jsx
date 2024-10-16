import React from "react"
import { View, Text,TouchableOpacity, StyleSheet, Dimensions } from "react-native"
import { useNavigation } from '@react-navigation/native';

const { height, width } = Dimensions.get('window');

const Expenses = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <View style={styles.budgetContainer}>
                <Text style={styles.budgetTitle}>Monthly limits:</Text>
                <View style={styles.budgetBox}>
                    <View style={styles.budgetTextContainer}>

                        <View style={styles.budgetItem}>
                            <Text style={styles.budgetTitleSmall}>Used this month:</Text>
                            <Text style={styles.budgetValueUsed}>2524.13$</Text>
                        </View>
                        <View style={styles.budgetItem}>
                            <Text style={styles.budgetTitleSmall}>Monthly limit:</Text>
                            <Text style={styles.budgetValueLimit}>3000.00$</Text>
                        </View>
                    </View>

                    <View style={styles.budgetBarContainer}>
                        <View style={styles.progressBarPlaceholder}></View>
                    </View>
                </View>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    budgetContainer: {
        width: '100%',
        alignItems: 'flex-start',
        justifyContent:'center',
        paddingHorizontal: width * 0.08,
        marginTop: height * 0.23
    },
    budgetTitle: {
        fontSize: 17,
        fontWeight: '700',
        color: '#000',
        marginBottom: height * 0.013
    },
    budgetBox: {
        width: '100%',
        height: height * 0.19,
        padding: 24,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        borderColor: '#ddd',
        backgroundColor: '#FAFAFA',
        borderRadius: 10,
        borderWidth: 1,
        marginBottom: height * 0.085
    },
    budgetTextContainer: {
        width: '49%',
        alignItems: 'flex-start'
    },
    budgetBarContainer: {
        width: '49%',
        alignItems: 'flex-end'
    },
    budgetItem: {
        marginBottom: height * 0.01,
        width: '100%',
        alignItems: 'flex-start'
    },
    budgetTitleSmall: {
        fontSize: 12,
        fontWeight: '300',
        color: '#000'
    },
    budgetValueUsed: {
        fontSize: 18,
        fontWeight: '600',
        color: '#FFA800'
    },
    budgetValueLimit: {
        fontSize: 18,
        fontWeight: '600',
        color: '#000'
    },
    progressBarPlaceholder: {
        borderRadius: 100,
        borderColor: '#FFA800',
        borderWidth: 3,
        width: height * 0.11,
        height: height * 0.11,
    },
})

export default Expenses;