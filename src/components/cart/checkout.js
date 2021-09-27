import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Button, ListItem, Input } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'
import { useStore } from '../../_api/_mobx/stores/store'
import { observer } from 'mobx-react-lite'
import { Formik } from 'formik'
import * as Yup from 'yup'
import * as authService from '../../_api/_services/authService'

const CheckoutScreen = observer(() => {
    const { checkoutStore, commonStore, cartStore } = useStore();
    const { cartItems } = cartStore;
    const { token } = commonStore;
    const { transaction, createTransaction } = checkoutStore;
    const navigation = useNavigation();

    const [user, setUser] = useState({});

    const ValidationSchema = Yup.object().shape({
        deliveryAddress: Yup.string().required('Required'),
        contactInfo: Yup.string().required('Required')
    });

    useEffect(() => {
        if(token){
            let loggedInUser = authService.getCurrentUser(token);
            if(loggedInUser != null) {
                const { unique_name } = loggedInUser;
                setUser(unique_name);
            } else {
                setUser(null);
            }
        }
    }, [])

    const Form = () => (
        <Formik 
            initialValues={{ deliveryAddress: '', note: '', contactInfo: '' }}
            validationSchema={ValidationSchema}
            onSubmit={values => {
                console.log(values)
                let obj = {
                    'products': cartItems,
                    'totalAmount': transaction.totalAmount,
                    'customer': user,
                    'date': transaction.date,
                    'orderNumber': transaction.orderNumber,
                    'deliveryAddress': values.deliveryAddress,
                    'contactInfo': values.contactInfo,
                    'note': values.note
                }
                createTransaction(obj)
                navigation.navigate('ConfirmOrderScreen')
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