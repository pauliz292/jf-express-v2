import React from 'react'
import { View, Text, StyleSheet } from 'react-native';

const AddProductScreen = () => {
    return(
        <View style={styles.container}>
            <Text style={styles.title}>Add Product</Text>
        </View>
    );
}

export default AddProductScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center'
    },
    title: {
        color: '#424242', 
        fontWeight: 'bold', 
        fontSize: 22, 
        marginTop: 12,
    },
    listContainer: {
        margin: 5,
        padding: 5,
        width: '100%'
    },
    buttonContainer: {
        margin: 5,
        padding: 5,
        flexDirection: 'row',
    },
});