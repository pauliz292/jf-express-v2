import React, { useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Button, Icon, ListItem } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'


const CartScreen = () => {
    const navigation = useNavigation();
    const [qty, setQty] = useState(1);

    const handleAddQty = (e) => {
        e.preventDefault();
        let i = qty;
        console.log(++i)
        setQty(i);
    }

    const handleSubtractQty = (e) => {
        e.preventDefault();
        let i = qty;
        console.log(--i)
        setQty(i);
    }

    return(
        <View style={styles.container}>
            <Text style={styles.title}>Your Cart</Text>
            <View style={styles.listContainer}>
                <ListItem bottomDivider>
                    <ListItem.Content>
                        <ListItem.Title>Product 1</ListItem.Title>
                        <ListItem.Subtitle>
                            Product description
                        </ListItem.Subtitle>
                        <View style={styles.buttonContainer}>
                            <Button 
                                icon={<Icon name='plus' type='font-awesome' color='#ffffff' />} 
                                buttonStyle={{ marginRight: 8 }}
                                onPress={e => handleAddQty(e)}
                            />
                            <Button 
                                icon={<Icon name='minus' type='font-awesome' color='#ffffff' />} 
                                buttonStyle={{ backgroundColor: '#E53935' }}
                                onPress={e => handleSubtractQty(e)}
                            />
                            <Text style={{ marginLeft: 10, fontWeight: 'bold', fontSize: 16 }}>QTY: {qty}</Text>
                        </View>
                    </ListItem.Content>
                </ListItem>
                <ListItem bottomDivider>
                    <ListItem.Content>
                        <ListItem.Title>Product 2</ListItem.Title>
                        <ListItem.Subtitle>Product description</ListItem.Subtitle>
                    </ListItem.Content>
                </ListItem>
                <ListItem bottomDivider>
                    <ListItem.Content>
                        <ListItem.Title>Product 3</ListItem.Title>
                        <ListItem.Subtitle>Product description</ListItem.Subtitle>
                    </ListItem.Content>
                </ListItem>
            </View>
            <View style={styles.formContainer}>
                <Text style={{ fontWeight: 'bold', fontSize: 20 }}>TOTAL: PHP 900.00</Text>
                <Button 
                    buttonStyle={{borderRadius: 5, marginTop: 10, backgroundColor: '#E57373'}}
                    onPress={() => navigation.navigate('HomeScreen')} 
                    title="Checkout" 
                />
            </View>
        </View>
    );
}

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