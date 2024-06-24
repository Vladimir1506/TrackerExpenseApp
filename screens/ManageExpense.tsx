import React, {useContext, useLayoutEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {RouteProp} from '@react-navigation/core';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {ParamListBase} from '@react-navigation/native';
import IconButton from '../UI/IconButton';
import {GlobalStyles} from '../constants/styles';
import {ExpensesContext} from '../store/expenses-context';
import {ScreenNames} from '../types/types';
import ExpenseForm, {InputState} from '../components/expensesOutput/ManageExpense/ExpenseForm';
import {getDateFromString} from '../utils/date';
import {deleteData, storeData, updateData} from '../api/requests';
import LoadingOverlay from '../UI/LoadingOverlay';
import ErrorOverlay from '../UI/ErrorOverlay';

type ManageExpenseProps = {
    route?: RouteProp<{ params: { expenseId: string } }>,
    navigation?: NativeStackNavigationProp<ParamListBase, ScreenNames>
}
const ManageExpense = ({route, navigation}: ManageExpenseProps) => {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [error, setError] = useState<string | null>('')
    const expenseId = route?.params.expenseId
    const isEditing = !!expenseId
    const expenseCtx = useContext(ExpensesContext)
    const currentExpense = expenseId && isEditing ? expenseCtx.expenses.find(expense => expense.id === expenseId) : undefined
    useLayoutEffect(() => {
        navigation?.setOptions({
            title: isEditing ? 'Edit Expense' : 'Add Expense'
        })
    }, [navigation, isEditing]);
    const deleteHandler = async () => {
        if (expenseId) {
            setIsSubmitting(true)
            try {
                await deleteData(expenseId)
                expenseCtx.deleteExpenses(expenseId)
                cancelHandler()
            } catch (e: any) {
                setError(e.message)
            } finally {
                setIsSubmitting(false)
            }
        }
    }
    const cancelHandler = () => {
        navigation?.goBack()
    }
    const submitHandler = async (expense: InputState) => {
        setIsSubmitting(true)
        try {
            if (isEditing && currentExpense) {
                const newDate = getDateFromString(expense.date) || new Date()
                const updatedExpense = {...expense, id: expenseId, date: newDate}
                await updateData(expenseId, updatedExpense)
                expenseCtx.updateExpenses(expenseId, updatedExpense)
            } else {
                let data = {
                    ...expense,
                    date: getDateFromString(expense.date),
                }
                const id = await storeData(data)
                expenseCtx.addExpenses({...data, id})
            }
            cancelHandler()
        } catch (e: any) {
            setError(e.message)
        } finally {
            setIsSubmitting(false)
        }
    }
    if (isSubmitting) return <LoadingOverlay/>
    if (error && !isSubmitting) return <ErrorOverlay onPress={cancelHandler} errorText={error}/>
    return (
        <View style={styles.container}>
            <ExpenseForm submit={submitHandler} cancelHandler={cancelHandler} isEditing={isEditing}
                         expense={currentExpense}/>
            {isEditing &&
                <View style={styles.deleteContainer}>
                    <IconButton name={'trash'} size={36} color={GlobalStyles.colors.error500}
                                onPress={deleteHandler}/>
                </View>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: GlobalStyles.colors.primary100
    },
    deleteContainer: {
        marginTop: 16,
        paddingTop: 8,
        borderTopWidth: 2,
        borderTopColor: GlobalStyles.colors.primary200,
        alignItems: 'center'
    },

});

export default ManageExpense;
