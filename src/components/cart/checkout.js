import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Button, ListItem, Input } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'
import { useStore } from '../../_api/_mobx/stores/store'
import { observer } from 'mobx-react-lite'
import { toJS } from 'mobx'
import { Formik } from 'formik'
import Toast from "react-native-toast-message"
import * as Yup from 'yup'
import * as transactionService from '../../_api/_services/transactionService'

const CheckoutScreen = observer(() => {
    const { checkoutStore, commonStore, cartStore } = useStore();
    const { cartItems } = cartStore;
    const { user } = commonStore;
    const { transaction, createTransaction } = checkoutStore;
    const navigation = useNavigation();

    const ValidationSchema = Yup.object().shape({
        deliveryAddress: Yup.string().required('Required'),
        contactInfo: Yup.string().required('Required')
    });

    const Form = () => (
        <Formik 
            initialValues={{ deliveryAddress: '', note: '', contactInfo: '' }}
            validationSchema={ValidationSchema}
            onSubmit={values => {
                let obj = {
                    'products': toJS(cartItems),
                    'totalAmount': transaction.totalAmount,
                    'customerId': user.id,
                    'orderNumber': transaction.orderNumber,
                    'deliveryAddress': values.deliveryAddress,
                    'contactInfo': values.contactInfo,
                    'note': values.note
                }
                transactionService.addTransaction(obj)
                    .then(res => {
                        if (res === 200) {
                            createTransaction(obj)
                            navigation.navigate('ConfirmOrderScreen')
                        }
                        else {
                            Toast.show({
                                type: "error",
                                text1: "Error on your transaction",
                                text2: "Please try again later. If the issue persist contact customer support.",
                                visibilityTime: 8000,
                                autoHide: true,
                                topOffset: 80,
                                bottomOffset: 40,
                            });
                        }
                    })
                    .catch(err => {
                        console.log(err)
                        Toast.show({
                            type: "error",
                            text1: "Error on your transaction",
                            text2: "Please try again later. If the issue persist contact customer support.",
                            visibilityTime: 8000,
                            autoHide: true,
                            topOffset: 80,
                            bottomOffset: 40,
                        });
                    })
            }}
        >
            {({ 
                handleChange, 
                handleBlur, 
                handleSubmit, 
                values, 
                errors, 
                touched 
            }) => (
                <View style={styles.formContainer}>
                    <Input
                        onChangeText={handleChange('deliveryAddress')}
                        onBlur={handleBlur('deliveryAddress')}
                        value={values.deliveryAddress}
                        placeholder='Address'
                    />
                    {errors.deliveryAddress && touched.deliveryAddress ?
                        (<Text style={styles.validation}>Please fill out this field.</Text>) : null
                    }
                    <Input
                        onChangeText={handleChange('contactInfo')}
                        onBlur={handleBlur('contactInfo')}
                        value={values.contactInfo}
                        placeholder='Contact Number'
                    />
                    {errors.contactInfo && touched.contactInfo ?
                        (<Text style={styles.validation}>Please fill out this field.</Text>) : null
                    }
                    <Input
                        onChangeText={handleChange('note')}
                        onBlur={handleBlur('note')}
                        value={values.note}
                        placeholder='Note'
                    />
                    <View style={styles.buttonContainer}>
                        <Button 
                            title="Proceed to Checkout" 
                            buttonStyle={{ marginBottom: 10 }}
                            onPress={() => handleSubmit()}
                        />
                        <Button 
                            title="Cancel Order" 
                            buttonStyle={{ backgroundColor: '#E53935', marginBottom: 15 }}
                            onPress={() => navigation.navigate('CartScreen')}
                        />
                    </View>
                </View>
            )}
        </Formik>
    );

    return(
        <View style={styles.container}>
            <Text style={styles.title}>Checkout</Text>
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
                            Transaction Date: {transaction.date}
                        </Text>
                        <Text style={{ fontSize: 16 }}>
                            Total Items: {cartItems.length}
                        </Text>
                        <Text style={{ fontSize: 16 }}>
                            Delivery Charge: PHP 150.00
                        </Text>
                        <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#D32F2F' }}>
                            NOTE: Cash on delivery only 
                        </Text>
                        <Form />
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
    formContainer: {
        width: '100%',
        marginTop: 15,
    },
    buttonContainer: {
        marginTop: 15,
        padding: 5,
        width: '100%'
    },
    validation: {
        color: '#E53935',
        margin: 0,
        padding: 0,
    }
})