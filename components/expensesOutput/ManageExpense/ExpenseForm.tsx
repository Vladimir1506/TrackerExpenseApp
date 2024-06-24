import React, {useState} from 'react';
import {StyleSheet, Text, View, Alert} from 'react-native';
import Input from './Input';
import Button from '../../../UI/Button';
import {ExpenseType} from '../ExpensesOutput';
import {getFormattedDate} from '../../../utils/date';
import {GlobalStyles} from '../../../constants/styles';

export type InputState = {
    amount: number,
    date: string,
    description: string,
}
type ExpenseFormProps = {
    cancelHandler: () => void,
    submit: (expense: InputState) => void,
    isEditing: boolean,
    expense: ExpenseType | undefined,
}
const ExpenseForm = ({submit, cancelHandler, isEditing, expense}: ExpenseFormProps) => {
    const [error, setError] = useState<string[]>([])
    const [inputValues, setInputValues] = useState<InputState>(
        expense ? {
                ...expense,
                date: getFormattedDate(expense.date)
            } :
            {
                amount: 0,
                date: getFormattedDate(new Date()),
                description: '',
            }
    )
    const confirmHandler = () => {
        let errors: string[] = []
        const isDescriptionValid = !!inputValues.description.trim()
        const isDateValid = /\d+?-\d+?-\d{4}/.test(inputValues.date)
        const isAmountValid = +inputValues.amount > 0
        if (!isDescriptionValid) errors.push('description')
        if (!isDateValid) errors.push('date')
        if (!isAmountValid) errors.push('amount')
        if (isDescriptionValid && isDateValid && isAmountValid) submit(inputValues)
        if (errors.length) setError(errors)
    }
    const amountChangeHandler = (inputName: keyof InputState, value: string) => {
        setError(error.filter(error => error !== inputName))
        setInputValues((prevState) => ({
            ...prevState,
            [inputName]: value
        }))

    }
    return (
        <View style={styles.form}>
            <Text style={styles.title}>Your Expense</Text>
            <View style={styles.inputsRow}>
                <Input label={'Amount'}
                       invalid={error.includes('amount')}
                       style={styles.rowInput}
                       textInputConfig={{
                           value: inputValues.amount?.toString(),
                           keyboardType: 'decimal-pad',
                           onChangeText: amountChangeHandler.bind(this, 'amount'),
                       }}/>
                <Input label={'Date'} style={styles.rowInput}
                       invalid={error.includes('date')}
                       textInputConfig={{
                           value: inputValues.date,
                           placeholder: 'DD-MM-YYYY',
                           keyboardType: 'numeric',
                           placeholderTextColor: 'grey',
                           maxLength: 10,
                           onChangeText: amountChangeHandler.bind(this, 'date')
                       }}/>
            </View>
            <Input label={'Description'}
                   invalid={error.includes('description')}
                   textInputConfig={{
                       value: inputValues.description,
                       multiline: true,
                       numberOfLines: 4,
                       onChangeText: amountChangeHandler.bind(this, 'description')
                   }}/>
            {!!error.length && <Text style={styles.errorText}>Invalid input! Please check your entered data!</Text>}
            <View style={styles.buttons}>
                <Button error={!!error.length} onPress={confirmHandler}
                        style={styles.button}>{isEditing ? 'Update' : 'Add'}</Button>
                <Button onPress={cancelHandler} mode={'flat'} style={styles.button}>Cancel</Button>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    form: {
        marginTop: 30
    },
    title: {
        textAlign: 'center',
        color: 'white',
        fontSize: 32,
        marginBottom: 16
    },
    inputsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    rowInput: {
        flex: 1
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10
    },
    button: {
        minWidth: 120,
        marginHorizontal: 8
    },
    errorText: {
        textAlign: 'center',
        color: GlobalStyles.colors.error500,
        fontWeight: 'bold',
        margin: 8
    },

});

export default ExpenseForm;
