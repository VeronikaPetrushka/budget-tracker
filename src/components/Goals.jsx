import React from "react"
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from "react-native"
import { useNavigation } from '@react-navigation/native';
import Icons from "./Icons";

const { height, width } = Dimensions.get('window');

const Goals = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <View style={styles.budgetContainer}>
                <Text style={styles.budgetTitle}>Goals:</Text>
                <View style={styles.budgetBox}>
                    <View style={styles.budgetTextContainer}>
                        <Text style={styles.amountText}>
                            <Text style={styles.amountPresentText}>19421 / </Text>
                            24200.00$
                        </Text>
                        <Text style={styles.goalText}>To buy a car</Text>
                        <Text style={styles.dateText}>
                            <Text style={styles.dateEndsText}>Ends: </Text>
                            26.06.2024
                        </Text>
                        <TouchableOpacity style={styles.addBtn}>
                            <View style={styles.addIcon}>
                                <Icons type={'add'}/>
                            </View>
                            <Text style={styles.addText}>Add</Text>
                        </TouchableOpacity>
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
        alignItems: 'flex-start'
    },
    budgetBarContainer: {
        alignItems: 'flex-end'
    },
    amountText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#000',
        marginBottom: height * 0.012
    },
    amountPresentText: {
        color: '#14B910'
    },
    goalText: {
        fontSize: 12,
        fontWeight: '500',
        color: '#000',
        marginBottom: height * 0.008
    },
    dateText: {
        fontSize: 14,
        fontWeight: '300',
        color: '#000',
        marginBottom: height * 0.008
    },
    dateEndsText: {
        color: '#F9A13A',
    },
    addBtn: {
        width: 120,
        padding: 12,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#14B910',
        flexDirection: 'row'
    },
    addIcon: {
        width: 20,
        height: 20,
        marginRight: 7
    },
    addText: {
        fontSize: 14,
        fontWeight: '500',
        color: '#fff'
    },
    progressBarPlaceholder: {
        borderRadius: 100,
        borderColor: '#14B910',
        borderWidth: 3,
        width: height * 0.11,
        height: height * 0.11,
    },
})

export default Goals;