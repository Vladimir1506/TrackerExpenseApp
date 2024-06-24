import React from 'react';
import {StyleSheet, View, Pressable, Text} from 'react-native';
import {ExpenseType} from './ExpensesOutput';
import {GlobalStyles} from '../../constants/styles';
import {getFormattedDate} from '../../utils/date';
import {useNavigation} from '@react-navigation/core';
import {ParamListBase} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {ScreenNames} from '../../types/types';

type ExpenseItemProps = {
    item: ExpenseType,
}
const ExpenseItem = ({item}: ExpenseItemProps) => {
    const {id, description, amount, date} = item
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase, ScreenNames>>()
    const expensePressHandler = () => navigation.navigate(ScreenNames.ManageExpense, {expenseId: id})
    return (
        <Pressable onPress={expensePressHandler} style={({pressed}) => pressed && styles.pressed}>
            <View style={styles.expenseItem}>
                <View>
                    <Text style={[styles.baseText, styles.description]}>{description}</Text>
                    <Text style={styles.baseText}>{getFormattedDate(date)}</Text>
                </View>
                <View style={styles.amountContainer}>
                    <Text style={styles.amount}>{(+amount).toFixed(2)}</Text>
                </View>
            </View>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    expenseItem: {
        padding: 12,
        marginVertical: 8,
        backgroundColor: GlobalStyles.colors.primary500,
        flexDirection: 'row',
        color: GlobalStyles.colors.primary50,
        justifyContent: 'space-between',
        borderRadius: 12,
        elevation: 3,
        shadowColor: GlobalStyles.colors.gray500,
        shadowRadius: 4,
        shadowOffset: {width: 1, height: 1},
        shadowOpacity: 0.4
    },
    baseText: {
        color: GlobalStyles.colors.primary50
    },
    description: {
        fontSize: 16,
        marginBottom: 4,
        fontWeight: 'bold'
    },
    amountContainer: {
        paddingHorizontal: 12,
        paddingVertical: 4,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        minWidth: 60,
    },
    amount: {
        color: GlobalStyles.colors.primary500,
        fontWeight: 'bold'
    },
    pressed: {
        opacity: 0.75
    }

});

export default ExpenseItem;
