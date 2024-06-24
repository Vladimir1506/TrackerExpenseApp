import axios from 'axios';
import {ExpDataType, ExpenseType} from '../components/expensesOutput/ExpensesOutput';

const BACKEND_URL = 'https://react-narive-course-default-rtdb.europe-west1.firebasedatabase.app/'
export const storeData = async (data: Omit<ExpenseType, 'id'>) => {
    return (await axios.post(BACKEND_URL + 'expenses.json', data)).data.name
}
export const getData = async (): Promise<ExpDataType> => {
    const data = (await axios.get(BACKEND_URL + 'expenses.json')).data
    const expenses: ExpDataType = []
    for (let key in data) {
        const expense = data[key]
        expenses.push({
            id: key,
            date: new Date(expense.date),
            amount: expense.amount,
            description: expense.description
        })
    }
    return expenses
}

export const updateData = (id: string, data: ExpenseType) => {
    return axios.put(BACKEND_URL + `expenses/${id}.json`, data)
}
export const deleteData = (id: string) => {
    return axios.delete(BACKEND_URL + `expenses/${id}.json`)
}
