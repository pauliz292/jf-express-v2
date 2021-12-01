import React, {useEffect} from 'react'
import { Text, View, ScrollView, StyleSheet } from 'react-native'
import { Card, Button, Icon } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'
import { observer } from 'mobx-react-lite'
import { useStore } from '../_api/_mobx/stores/store'
import * as productService from '../_api/_services/productService'

const HomeScreen = observer(() => {
    const navigation = useNavigation();

    const { productStore, cartStore } = useStore();
    const { products, setProducts } = productStore;
    const { cartItems, addCartItem } = cartStore;

    useEffect(() => {
        productService.getAll()
            .then(res => {
                if (res.length > 0) {
                    setProducts(res)
                }
            });
    }, [])

    return(
        <ScrollView style={{backgroundColor:"#fff"}}>
            <View style={styles.container}>
                <View style={{ marginTop: 15, marginBottom: 15, padding: 10 }}> 
                    <Button 
                        title="Go to Cart" 
                        icon={<Icon name='shopping-cart' color='#ffffff' />}
                        buttonStyle={{ backgroundColor: '#03A9F4' }} 
                        onPress={() => navigation.navigate('CartScreen')}
                    />
                    <Text style={{ fontSize: 16 }}>Cart Items: {cartItems.length}</Text>
                </View>
                <View style={{ width: '100%' }}>
                    {products.map(item => (
                        <Card key={item.id}>
                            <Card.Title>{item.name}</Card.Title>
                            <Card.Divider/>
                            <Card.Image source={{ uri: item.image }}/>
                                <Text style={{marginBottom: 5}}>
                                    {item.description}
                                </Text>
                                <Text style={{marginBottom: 10}}>
                                    PRICE: PHP {item.price}
                                </Text>
                                <Button
                                    icon={<Icon name='shopping-cart' color='#ffffff' />}
                                    buttonStyle={{borderRadius: 5, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                                    title='Add to Cart'
                                    onPress={() => addCartItem(item)}
                                />
                        </Card>
                    ))}
                </View>
            </View>
        </ScrollView>
    );
})

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});