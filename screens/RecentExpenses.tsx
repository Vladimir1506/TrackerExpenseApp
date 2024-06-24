import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import ExpensesOutput from '../components/expensesOutput/ExpensesOutput';
import {ExpensesContext} from '../store/expenses-context';
import {getDateMinusDays} from '../utils/date';
import {getData} from '../api/requests';
import LoadingOverlay from '../UI/LoadingOverlay';
import ErrorOverlay from '../UI/ErrorOverlay';

const RecentExpenses = () => {
    const [isFetching, setIsFetching] = useState<boolean>(true)
    const [error, setError] = useState<string | null>('')
    const expensesCtx = useContext(ExpensesContext)
    useEffect(() => {
        const getExpenses = async () => {
            try {
                const expenses = await getData()
                expensesCtx.setExpenses(expenses)
            } catch (e: any) {
                setError(e.message)
            } finally {
                setIsFetching(false)
            }
        }
        getExpenses()
    }, []);
    const handleError = () => {
        setError(null)
    }
    if (error && !isFetching) return <ErrorOverlay onPress={handleError} errorText={error}/>
    if (isFetching) return <LoadingOverlay/>
    const recentExpenses = expensesCtx.expenses.filter(expense => expense.date > getDateMinusDays(new Date(), 7))
    return <ExpensesOutput expenses={recentExpenses} period={'Last expenses'}
                           fallbackText={'No expenses registered for the last 7 days.'}/>
};

const styles = StyleSheet.create({});

export default RecentExpenses;
