import React from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { Button, Input } from 'react-native-elements'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { observer } from "mobx-react-lite"
import { useNavigation } from '@react-navigation/native'


const AddProductScreen = observer(() => {
    const navigation = useNavigation();

    const ValidationSchema = Yup.object().shape({
        name: Yup.string().required('Required'),
        description: Yup.string().required('Required'),
        qty: Yup.string().required('Required'),
        price: Yup.string().required('Required'),
    });


    return(
        <ScrollView style={{ backgroundColor: '#fff' }}>
            <View style={styles.container}>
                <Text style={styles.title}>Add Product</Text>
                <Formik 
                    initialValues={{ name: '', description: '', qty: '', price: '' }}
                    validationSchema={ValidationSchema}
                    onSubmit={values => {
                        console.log(values)
                    }}
                >
                    {({ handleChange, handleBlur, handleSubmit, values }) => (
                        <View style={styles.formContainer}>
                            <View style={styles.form}>
                                <Input
                                    onChangeText={handleChange('name')}
                                    onBlur={handleBlur('name')}
                                    value={values.name}
                                    placeholder='Name'
                                />
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
                                        onPress={() => navigation.navigate('ProductListScreen')} 
                                    />
                                </View>
                            </View>
                        </View>
                    )}
                </Formik>
            </View>
        </ScrollView>
    );
})

export default AddProductScreen;

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