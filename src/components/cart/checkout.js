import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Button, ListItem, Input } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'
import { useStore } from '../../_api/_mobx/stores/store'
import { observer } from 'mobx-react-lite'
import { Formik } from 'formik'
import * as Yup from 'yup'

const CheckoutScreen = observer(() => {
    const { checkoutStore } = useStore();
    const { transaction } = checkoutStore;
    const navigation = useNavigation();

    const ValidationSchema = Yup.object().shape({
        deliveryAddress: Yup.string().required('Required'),
        note: Yup.string().required('Required'),
        contactInfo: Yup.string().required('Required')
    });

    const Form = () => (
        <Formik 
            initialValues={{ deliveryAddress: '', note: '', contactInfo: '' }}
            validationSchema={ValidationSchema}
            onSubmit={values => {
                console.log(values)
                navigation.navigate('ConfirmOrderScreen')
            }}
        >
            {({ handleChange, handleBlur, handleSubmit, values }) => (
                <View style={styles.formContainer}>
                    <View style={styles.form}>
                        <Input
                            onChangeText={handleChange('deliveryAddress')}
                            onBlur={handleBlur('deliveryAddress')}
                            value={values.deliveryAddress}
                            placeholder='Address'
                        />
                        <Input
                            onChangeText={handleChange('contactInfo')}
                            onBlur={handleBlur('contactInfo')}
                            value={values.contactInfo}
                            placeholder='Contact Number'
                        />
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
})