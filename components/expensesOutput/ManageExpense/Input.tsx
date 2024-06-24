import React from 'react';
import {StyleSheet, Text, View, TextInput, TextInputProps, StyleProp, ViewStyle, Alert} from 'react-native';
import {GlobalStyles} from '../../../constants/styles';

type InputProps = {
    label: string,
    style?: StyleProp<ViewStyle>,
    textInputConfig: TextInputProps,
    invalid: boolean
}

const Input = ({label, textInputConfig, style, invalid}: InputProps) => {
    return (
        <View style={[styles.inputContainer, style]}>
            <Text style={[styles.label, invalid && styles.invalidLabel]}>{label}</Text>
            <TextInput
                style={[styles.input, textInputConfig.multiline && styles.inputMultiline, invalid && styles.invalidInput]} {...textInputConfig}/>
        </View>
    );
};

const styles = StyleSheet.create({
    inputContainer: {
        marginHorizontal: 4,
        marginVertical: 16,
    },
    label: {
        fontSize: 12,
        color: GlobalStyles.colors.primary500,
        marginBottom: 4
    },
    input: {
        backgroundColor: GlobalStyles.colors.primary200,
        padding: 6,
        borderRadius: 10,
        fontSize: 18,
        color: GlobalStyles.colors.primary700
    },
    inputMultiline: {
        minHeight: 100,
        textAlignVertical: 'top'
    },
    invalidLabel: {
        color: GlobalStyles.colors.error500,
    },
    invalidInput: {
        backgroundColor: GlobalStyles.colors.error50,
    },
});

export default Input;
