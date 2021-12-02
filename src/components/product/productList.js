import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { useStore } from '../../_api/_mobx/stores/store'
import { ListItem, Button, Icon } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'
import { observer } from 'mobx-react-lite'
import * as productService from '../../_api/_services/productService'

const ProductListScreen = observer(() => {
    const { productStore } = useStore();
    const { products, setProducts, setProduct } = productStore;

    const [isDeleted, setIsDeleted] = useState(false);

    const navigation = useNavigation();

    useEffect(() => {
        productService.getAll()
            .then(res => {
                if (res.length > 0) {
                    setProducts(res)
                }
            });
    }, [])

    const handleEdit = (item) => {
        setProduct(item);
        navigation.navigate('EditProductScreen');
    }

    const handleArchive = (item) => {
        setIsDeleted(true)
        item.isDeleted = isDeleted;
        
        productService.archiveProduct(item)
        .then(res => {
            console.log("Success!", res)
        })
        .catch(err => console.log(err))
    }

    return(
        <ScrollView style={{backgroundColor:"#fff"}}>
            <View style={styles.container}>
                <Text style={styles.title}>Product List</Text>
                <Button 
                    icon={<Icon name='plus' type='font-awesome' color='#ffffff' />} 
                    title="Add Product"
                    buttonStyle={{ marginTop: 15 }}
                    titleStyle={{ marginHorizontal: 5 }}
                    onPress={() => navigation.navigate('AddProductScreen')}
                />
                <View style={styles.listContainer}>
                    {products.map(item => (
                        <ListItem bottomDivider key={item.id}>
                            <ListItem.Content>
                                <ListItem.Title>{item.name}</ListItem.Title>
                                <ListItem.Subtitle>
                                    {item.description}
                                </ListItem.Subtitle>
                                <Text style={{ marginLeft: 10, fontWeight: 'bold', fontSize: 16 }}>QTY: {item.qty}</Text>
                                <Text style={{ marginLeft: 10, fontWeight: 'bold', fontSize: 16 }}>Price: {item.price}</Text>
                                <View style={styles.buttonContainer}>
                                    <Button 
                                        icon={<Icon name='edit' type='font-awesome' color='#ffffff' />} 
                                        buttonStyle={{ marginRight: 8 }}
                                        onPress={() => handleEdit(item)}
                                    />
                                    <Button 
                                        icon={<Icon name='trash' type='font-awesome' color='#ffffff' />} 
                                        buttonStyle={{ backgroundColor: '#E53935' }}
                                        onPress={() => handleArchive(item)}
                                    />
                                </View>
                            </ListItem.Content>
                        </ListItem>
                    ))}
                </View>
            </View>
        </ScrollView>
    );
})

export default ProductListScreen;

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