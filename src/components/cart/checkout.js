import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const CheckoutScreen = () => {
    return(
        <View style={styles.container}>
            <Text>Checkout Screen!</Text>
        </View>
    );
}

export default CheckoutScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center'
    },
})