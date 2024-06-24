import React from 'react';
import {FlatList, ListRenderItemInfo, StyleSheet, Text} from 'react-native';
import {ExpenseType} from './ExpensesOutput';
import ExpenseItem from './ExpenseItem';


const renderExpense = (data: ListRenderItemInfo<ExpenseType>) => {
    return <ExpenseItem item={data.item}></ExpenseItem>
}
const ExpensesList = ({expenses}: { expenses: ExpenseType[] }) => {
    return (
        <FlatList data={expenses} renderItem={renderExpense} keyExtractor={({id}) => id}/>
    );
};

const styles = StyleSheet.create({});

export default ExpensesList;
