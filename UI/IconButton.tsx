import React from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import {Ionicons} from '@expo/vector-icons';

type  IconButtonProps = {
    name: keyof typeof Ionicons.glyphMap,
    size: number,
    color: string | undefined,
    onPress: () => void

}
const IconButton = ({name, size, color, onPress}: IconButtonProps) => {
    return (
        <Pressable onPress={onPress} style={({pressed}) => pressed && styles.pressed}>
            <View style={styles.buttonContainer}>
                <Ionicons name={name} size={size} color={color}/>
            </View>
        </Pressable>

    );
};

const styles = StyleSheet.create({
    buttonContainer: {
        borderRadius: 24,
        padding: 6,
        marginHorizontal: 8,
        marginVertical: 2
    },
    pressed: {
        opacity: 0.25
    }
});

export default IconButton;
