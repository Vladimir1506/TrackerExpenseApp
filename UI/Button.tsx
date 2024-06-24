import React, {ReactNode} from 'react';
import {Pressable, StyleSheet, View, StyleProp, ViewStyle, Text} from 'react-native';
import {GlobalStyles} from '../constants/styles';

type ButtonProps = {
    children: ReactNode,
    onPress: () => void,
    mode?: string,
    style: StyleProp<ViewStyle>,
    error?: boolean
}
const Button = ({children, onPress, mode, style, error}: ButtonProps) => {
    return (
        <View style={style}>
            <Pressable disabled={error} onPress={onPress} style={({pressed}) => pressed && styles.pressed}>
                <View style={[styles.button, (mode === 'flat' || error) && styles.flat]}>
                    <Text style={[styles.buttonText, (mode === 'flat'||error) && styles.flatText]}>{children}</Text>
                </View>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    pressed: {
        opacity: 0.25,
        backgroundColor: GlobalStyles.colors.primary100
    },
    button: {
        borderRadius: 4,
        padding: 8,
        backgroundColor: GlobalStyles.colors.primary500,
        borderWidth: 1,
        borderColor: GlobalStyles.colors.primary500,
    },
    buttonText: {
        color: 'white',
        textAlign: 'center'
    },
    flat: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: GlobalStyles.colors.primary200,
    },
    flatText: {
        color: GlobalStyles.colors.primary200
    },
});

export default Button;
