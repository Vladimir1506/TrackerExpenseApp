import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import ExpensesSummary from './ExpensesSummary';
import ExpensesList from './ExpensesList';
import {GlobalStyles} from '../../constants/styles';
import {getDateFromString} from '../../utils/date';

export type ExpenseType = {
    id: string,
    description: string,
    amount: number ,
    date: Date
}
export type ExpDataType = ExpenseType[]
// export const EXP_DATA: ExpDataType = [
//     {
//         id: 'e1',
//         description: 'Tomatoes',
//         amount: 38.60,
//         date: getDateFromString('23-02-2024')
//     }, {
//         id: 'e2',
//         description: 'Kiwi',
//         amount: 30.00,
//         date: getDateFromString('24-02-2024')
//     }, {
//         id: 'e3',
//         description: 'Cheese',
//         amount: 33.50,
//         date: getDateFromString('12-02-2024')
//     }, {
//         id: 'e4',
//         description: 'Tea',
//         amount: 33.00,
//         date: getDateFromString('12-02-2022')
//     }, {
//         id: 'e5',
//         description: 'Oranges',
//         amount: 22.50,
//         date: getDateFromString('12-02-2023')
//     }, {
//         id: 'e6',
//         description: 'Meat',
//         amount: 80.00,
//         date: getDateFromString('03-03-2023')
//     }, {
//         id: 'e7',
//         description: 'Ice',
//         amount: 15.50,
//         date: getDateFromString('22-02-2022')
//     }, {
//         id: 'e8',
//         description: 'Nuts',
//         amount: 50.00,
//         date: getDateFromString('01-01-2024')
//     }, {
//         id: 'e9',
//         description: 'Salad',
//         amount: 15.20,
//         date: getDateFromString('15-01-2024')
//     },
// ]
type ExpensesOutputProps = {
    expenses: ExpDataType,
    period: string,
    fallbackText: string
}
const ExpensesOutput = ({expenses, period, fallbackText}: ExpensesOutputProps) => {
    let content = <Text style={styles.infoText}>{fallbackText}</Text>
    if (expenses.length) content = <>
        <ExpensesList expenses={expenses}/>
    </>

    return <View style={styles.container}>
        <ExpensesSummary expenses={expenses} period={period}/>
        {content}
    </View>
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 24,
        paddingTop: 24,
        backgroundColor: GlobalStyles.colors.primary100
    },
    infoText: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center',
        marginTop: 32
    }
});

export default ExpensesOutput;
