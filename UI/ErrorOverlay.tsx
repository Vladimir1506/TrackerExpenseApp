import React from 'react';
import {Text, StyleSheet, View} from 'react-native';
import {GlobalStyles} from '../constants/styles';
import Button from './Button';

type ErrorOverlayProps = {
    onPress: () => void,
    errorText: string
}
const ErrorOverlay = ({onPress, errorText}: ErrorOverlayProps) => {

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Something went wrong...</Text>
            <Text style={styles.text}>{errorText}</Text>
            <Button onPress={onPress} style={{}}>Okay</Button>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: GlobalStyles.colors.primary100,
        padding: 24,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    text: {
        color: 'white',
        textAlign: 'center',
        marginBottom: 8
    },
});

export default ErrorOverlay;
