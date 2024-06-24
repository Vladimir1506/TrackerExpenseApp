import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {GlobalStyles} from '../../constants/styles';

type ExpensesSummaryProps = {
    expenses: any[],
    period: string
}

const ExpensesSummary = ({expenses, period}: ExpensesSummaryProps) => {
    const expensesSum = (expenses?.reduce((sum, expense) => sum + +expense.amount, 0))?.toFixed(2)
    return (
        <View style={styles.container}>
            <Text style={styles.period}>{period}</Text>
            <Text style={styles.sum}>$ {expensesSum}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 8,
        backgroundColor: GlobalStyles.colors.primary50,
        borderRadius: 6,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    period: {
        fontSize: 12
    },
    sum: {
        fontSize: 16,
        fontWeight: '900',
        color: GlobalStyles.colors.primary500
    }
});

export default ExpensesSummary;
