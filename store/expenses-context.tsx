import {createContext, ReactNode, useReducer} from 'react';
import {ExpDataType, ExpenseType} from '../components/expensesOutput/ExpensesOutput';

enum Actions {
    ADD = 'ADD',
    DELETE = 'DELETE',
    UPDATE = 'UPDATE',
    SET = 'SET',
}

type AddAction = {
    type: Actions.ADD,
    payload: { expenseData: ExpenseType }
}
type DeleteAction = {
    type: Actions.DELETE,
    payload: { id: string }
}
type UpdateAction = {
    type: Actions.UPDATE,
    payload: { id: string, expenseData: ExpenseType }
}
type SetAction = {
    type: Actions.SET,
    payload: { expenses: ExpDataType }
}
type ActionTypes = AddAction | DeleteAction | UpdateAction | SetAction
const expensesReducer = (state: ExpDataType, action: ActionTypes): ExpDataType => {
    switch (action.type) {
        case Actions.ADD: {
            // const id = 'e' + (state.length + 1)
            return [{...action.payload.expenseData}, ...state,]
        }
        case Actions.DELETE: {
            return state.filter(expense => expense.id !== action.payload.id)
        }
        case Actions.UPDATE: {
            return state.map(expense => expense.id === action.payload.id ? action.payload.expenseData : expense)
        }
        case Actions.SET: {
            return action.payload.expenses
                .reverse()
        }
    }
}

export const ExpensesContext = createContext({
    expenses: [] as ExpDataType,
    addExpenses: (data: ExpenseType) => {
    },
    deleteExpenses: (id: string) => {
    },
    updateExpenses: (id: string, {description, amount, date}: ExpenseType) => {
    },
    setExpenses: (expenses: ExpDataType) => {
    }
})
type ExpensesContextProviderProps = {
    children?: ReactNode
}
export const ExpensesContextProvider = ({children}: ExpensesContextProviderProps) => {
    const [expensesState, dispatch] = useReducer(expensesReducer, [])
    const addExpense = (expenseData: ExpenseType) => {
        dispatch({type: Actions.ADD, payload: {expenseData}})
    }
    const deleteExpense = (id: string) => {
        dispatch({type: Actions.DELETE, payload: {id}})
    }
    const updateExpense = (id: string, expenseData: ExpenseType) => {
        dispatch({type: Actions.UPDATE, payload: {id, expenseData}})
    }
    const setExpenses = (expenses: ExpDataType) => {
        dispatch({type: Actions.SET, payload: {expenses}})
    }
    return <ExpensesContext.Provider value={{
        addExpenses: addExpense,
        deleteExpenses: deleteExpense,
        updateExpenses: updateExpense,
        setExpenses: setExpenses,
        expenses: expensesState
    }}>{children}</ExpensesContext.Provider>
}
