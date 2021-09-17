import React, { useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Button, Icon, ListItem } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'
import { useStore } from '../../_api/_mobx/stores/store'
import { observer } from 'mobx-react-lite'


const CartScreen = observer(() => {
    const navigation = useNavigation();

    const { cartStore, checkoutStore } = useStore();
    const { 
        cartItems, 
        addItemQty, 
        subtractItemQty, 
        cartTotalPrice,
        getTotalAmount, 
    } = cartStore;

    const { mapProducts, mapTotalAmount } = checkoutStore;

    useEffect(() => {
        getTotalAmount();
    }, [])

    const handleAddQty = id => {
        addItemQty(id);
        getTotalAmount();
    }

    const handleSubtractQty = id => {
        subtractItemQty(id);
        getTotalAmount();
    }

    const handleCheckout = () => {
        navigation.navigate('CheckoutScreen');
        mapProducts(cartItems);
        mapTotalAmount(cartTotalPrice);
    }

    return(
        <View style={styles.container}>
            <Text style={styles.title}>Your Cart</Text>
            <View style={styles.listContainer}>
                {cartItems.map(item => (
                    <ListItem bottomDivider key={item.id}>
                        <ListItem.Content>
                            <ListItem.Title>{item.name}</ListItem.Title>
                            <ListItem.Subtitle>
                                {item.description}
                            </ListItem.Subtitle>
                            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
                                {item.totalPrice == 0 ? item.price : item.totalPrice}
                            </Text>
                            <View style={styles.buttonContainer}>
                                <Button 
                                    icon={<Icon name='plus' type='font-awesome' color='#ffffff' />} 
                                    buttonStyle={{ marginRight: 8 }}
                                    onPress={() => handleAddQty(item.id)}
                                />
                                <Button 
                                    icon={<Icon name='minus' type='font-awesome' color='#ffffff' />} 
                                    buttonStyle={{ backgroundColor: '#E53935' }}
                                    onPress={() => handleSubtractQty(item.id)}
                                />
                                <Text style={{ marginLeft: 10, fontWeight: 'bold', fontSize: 16 }}>QTY: {item.qty}</Text>
                            </View>
                        </ListItem.Content>
                    </ListItem>
                ))}
            </View>
            <View style={styles.formContainer}>
                <Text style={{ fontWeight: 'bold', fontSize: 20 }}>TOTAL: PHP {cartTotalPrice}</Text>
                <Button 
                    buttonStyle={{borderRadius: 5, marginTop: 10, backgroundColor: '#039BE5'}}
                    onPress={() => handleCheckout()} 
                    title="Checkout" 
                />
                <Button 
                    buttonStyle={{borderRadius: 5, marginTop: 10, backgroundColor: '#C62828'}}
                    onPress={() => navigation.navigate('HomeScreen')} 
                    title="Back to Home" 
                />
            </View>
        </View>
    );
})

export default CartScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center'
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
    formContainer: {
        width: '80%',
        marginRight: 8,
        marginLeft: 8,
    },
    title: {
        color: '#424242', 
        fontWeight: 'bold', 
        fontSize: 22, 
        marginTop: 12,
    }
});