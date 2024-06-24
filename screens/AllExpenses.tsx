import React, {useContext} from 'react';
import {StyleSheet} from 'react-native';
import ExpensesOutput from '../components/expensesOutput/ExpensesOutput';
import {ExpensesContext} from '../store/expenses-context';

const AllExpenses = () => {
    const expensesCtx = useContext(ExpensesContext)
    return <ExpensesOutput expenses={expensesCtx.expenses} period={'All expenses'}
                           fallbackText={'No expenses registered.'}/>

};

const styles = StyleSheet.create({container: {flex: 1}});

export default AllExpenses;
