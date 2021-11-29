import React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { useStore } from '../../_api/_mobx/stores/store'
import { observer } from 'mobx-react-lite'
import { Button, ListItem } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'

const ConfirmOrderScreen = observer(() => {
    const { checkoutStore } = useStore();
    const { transaction } = checkoutStore;

    const navigation = useNavigation();

    return(
        <View style={styles.container}>
            <Text style={styles.title}>Your Order has been Placed</Text>
            <View style={styles.listContainer}>
                <ListItem>
                    <ListItem.Content>
                        <ListItem.Title style={{ fontSize: 18, fontWeight: 'bold' }}>
                            Order Number: {transaction.orderNumber}
                        </ListItem.Title>
                        <Text style={{ fontSize: 16 }}>
                            Total Amount: <Text style={{ color: '#1976D2', fontWeight: 'bold' }}>
                                PHP {transaction.totalAmount}
                                </Text>
                        </Text>
                        <Text style={{ fontSize: 16 }}>
                            Customer: {transaction.customer}
                        </Text>
                        <Text style={{ fontSize: 16 }}>
                            Transaction Date: {transaction.date}
                        </Text>
                        <Text style={{ fontSize: 16 }}>
                            Total Items: {transaction.products.length}
                        </Text>
                        <Text style={{ fontSize: 16 }}>
                            Delivery Address: {transaction.deliveryAddress}
                        </Text>
                        <Text style={{ fontSize: 16 }}>
                            Delivery Charge: PHP 150.00
                        </Text>
                        <Text style={{ fontSize: 16 }}>
                            Contact Info: {transaction.contactInfo}
                        </Text>
                        <Text style={{ fontSize: 16 }}>
                            Note: {transaction.note}
                        </Text>
                    </ListItem.Content>
                </ListItem>
                <View style={{ alignItems: 'center', width: '100%', marginTop: 20 }}>
                    <Button 
                        title="Continue Shopping" 
                        buttonStyle={{ backgroundColor: '#D32F2F' }}
                        onPress={() => navigation.navigate('HomeScreen')}
                    />
                </View>
            </View>
        </View>
    );
})

export default ConfirmOrderScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 15,
        marginBottom: 15,
        color: '#D32F2F'
    },
    listContainer: {
        margin: 5,
        padding: 5,
        width: '100%'
    },
})