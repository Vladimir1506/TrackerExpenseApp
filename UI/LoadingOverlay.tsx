import React from 'react';
import {StyleSheet, View, ActivityIndicator} from 'react-native';
import {GlobalStyles} from '../constants/styles';

const LoadingOverlay = () => {
    return (
        <View style={styles.container}>
            <ActivityIndicator size={'large'} color={'white'}/>
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
    }
});

export default LoadingOverlay;
