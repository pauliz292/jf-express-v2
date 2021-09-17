import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Button, ListItem } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'
import { useStore } from '../../_api/_mobx/stores/store'
import { observer } from 'mobx-react-lite'

const CheckoutScreen = observer(() => {
    const { checkoutStore } = useStore();
    const { transaction } = checkoutStore;
    const navigation = useNavigation();

    return(
        <View style={styles.container}>
            <Text style={styles.title}>Checkout</Text>
            <View style={styles.listContainer}>
                <ListItem>
                    <ListItem.Content>
                        <ListItem.Title style={{ fontSize: 18, fontWeight: 'bold' }}>
                            Order Number: {transaction.orderNumber.toUpperCase()}
                        </ListItem.Title>
                        <Text style={{ fontSize: 16 }}>
                            Total Amount: <Text style={{ color: '#1976D2', fontWeight: 'bold' }}>
                                PHP {transaction.totalAmount}
                                </Text>
                        </Text>
                        <Text style={{ fontSize: 16 }}>
                            Transaction Date: {transaction.date}
                        </Text>
                        <Text style={{ fontSize: 16 }}>
                            Total Items: {transaction.products.length}
                        </Text>
                        <View style={styles.buttonContainer}>
                            <Button 
                                title="Proceed with Checkout" 
                                buttonStyle={{ marginBottom: 10 }}
                                // onPress={() => handleAddQty(item.id)}
                            />
                            <Button 
                                title="Cancel Order" 
                                buttonStyle={{ backgroundColor: '#E53935', marginBottom: 15 }}
                                onPress={() => navigation.navigate('CartScreen')}
                            />
                        </View>
                    </ListItem.Content>
                </ListItem>
            </View>
        </View>
    );
})

export default CheckoutScreen;

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
    listContainer: {
        margin: 5,
        padding: 5,
        width: '100%'
    },
    buttonContainer: {
        marginTop: 15,
        padding: 5,
        width: '100%'
    },
})