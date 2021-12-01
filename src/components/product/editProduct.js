import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { useStore } from '../../_api/_mobx/stores/store'
import { observer } from 'mobx-react-lite'
import { Formik } from 'formik'
import { useNavigation } from '@react-navigation/native'
import { Button, Input } from 'react-native-elements'
import Toast from "react-native-toast-message"
import * as productService from '../../_api/_services/productService'


const EditProductScreen = observer(() => {
    const { productStore } = useStore();
    const { product, removeProduct } = productStore;

    const [item, setItem] = useState(product)

    const navigation = useNavigation();

    useEffect(() => {
        if (product) {
            setItem(product)
        }
    }, [])

    const handleCancel = () => {
        removeProduct();
        setItem({
            "description": "",
            "qty": "",
            "price": "",
        })
        navigation.navigate('ProductListScreen');
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Edit Product</Text>
                <Formik 
                    initialValues={{ 
                        description: item.description, 
                        qty: item.qty.toString(),
                        price: item.price.toString() 
                    }}
                    onSubmit={(values) => {
                        let data = {
                            "id": product.id,
                            "description": values.description,
                            "qty": Number(values.qty),
                            "price": Number(values.price),
                        }

                        productService.updateProduct(data)
                        .then(res => {
                            console.log("return data:", res)
                            Toast.show({
                                type: "success",
                                text1: "SUCCESS!",
                                text2: "You have successfully updated a product.",
                                visibilityTime: 8000,
                                autoHide: true,
                                topOffset: 80,
                                bottomOffset: 40,
                            });
                            navigation.navigate('ProductListScreen')
                        })
                        .catch(err => console.log(err));
                    }}
                >
                    {({ handleChange, handleBlur, handleSubmit, values }) => (
                        <View style={styles.formContainer}>
                            <View style={styles.form}>
                                <Input
                                    onChangeText={handleChange('description')}
                                    onBlur={handleBlur('description')}
                                    value={values.description}
                                    placeholder='Description'
                                />
                                <Input
                                    onChangeText={handleChange('qty')}
                                    onBlur={handleBlur('qty')}
                                    value={values.qty}
                                    placeholder='Qty'
                                    keyboardType="numeric"
                                />
                                <Input
                                    onChangeText={handleChange('price')}
                                    onBlur={handleBlur('price')}
                                    value={values.price}
                                    placeholder='Price'
                                    keyboardType="numeric"
                                />
                                <View style={styles.buttonContainer}>
                                    <Button 
                                        title="Submit" 
                                        buttonStyle={{ width: '100%' }}
                                        onPress={() => handleSubmit()}
                                    />
                                </View>
                                <View style={styles.buttonContainer}>
                                    <Button 
                                        title="Cancel" 
                                        buttonStyle={{ backgroundColor: '#E53935', width: '100%' }}
                                        onPress={() => handleCancel()} 
                                    />
                                </View>
                            </View>
                        </View>
                    )}
                </Formik>
        </View>
    )
})

export default EditProductScreen;

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
    buttonContainer: {
        padding: 5,
        width: '100%'
    },
    formContainer: {
        marginVertical: 20,
        width: '80%',
        alignContent: 'center',
    },
    form: {
        backgroundColor: '#eee',
        borderRadius: 15,
        padding: 10,
        alignContent: 'center'
    },
});