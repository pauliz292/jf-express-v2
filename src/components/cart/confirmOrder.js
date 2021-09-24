import React from 'react'
import { Text, View, StyleSheet } from 'react-native'

const ConfirmOrderScreen = () => {
    return(
        <View style={styles.container}>
            <Text style={styles.title}>Confirm Order</Text>
        </View>
    );
}

export default ConfirmOrderScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center'
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 15,
        marginBottom: 15,
    },
})