import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { Button, Input, Image } from 'react-native-elements'
import { Formik } from 'formik'
import Toast from "react-native-toast-message"
import * as Yup from 'yup'
import * as ImagePicker from 'expo-image-picker'
import { observer } from "mobx-react-lite"
import { useNavigation } from '@react-navigation/native'
import * as productService from '../../_api/_services/productService'


const AddProductScreen = observer(() => {
    const navigation = useNavigation();

    const ValidationSchema = Yup.object().shape({
        name: Yup.string().required('Required'),
        description: Yup.string().required('Required'),
        qty: Yup.string().required('Required'),
        price: Yup.string().required('Required'),
    });

    const [image, setImage] = useState({})

    useEffect(() => {
        (async () => {
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                    alert('Sorry, we need camera roll permissions to make this work!');
                }
            }
        })();
    }, [])

    const handleUpload = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
                base64: true
            });
        
        setImage(result)
    }

    return(
        <ScrollView style={{ backgroundColor: '#fff' }}>
            <View style={styles.container}>
                <Text style={styles.title}>Add Product</Text>
                {image.uri !== "" ?
                    <Image
                        source={{ uri: image.uri }}
                        style={{ width: 200, height: 200 }}
                    /> : null
                }
                <Button title="Upload" onPress={() => handleUpload()} />
                <Formik 
                    initialValues={{ name: '', description: '', qty: '', price: '' }}
                    validationSchema={ValidationSchema}
                    onSubmit={(values, {resetForm}) => {
                        let product = {
                            "name": values.name,
                            "description": values.description,
                            "qty": Number(values.qty),
                            "price": Number(values.price)
                        }
                        
                        productService.addProduct(product, image)
                        .then(res => {
                            resetForm();
                            if (res == 200) {
                                Toast.show({
                                    type: "success",
                                    text1: "SUCCESS!",
                                    text2: "You have successfully added a new product.",
                                    visibilityTime: 8000,
                                    autoHide: true,
                                    topOffset: 80,
                                    bottomOffset: 40,
                                });
                                navigation.navigate('ProductListScreen')
                            } else {
                                Toast.show({
                                    type: "error",
                                    text1: "ERROR!",
                                    text2: "Something went wrong!",
                                    visibilityTime: 8000,
                                    autoHide: true,
                                    topOffset: 80,
                                    bottomOffset: 40,
                                });
                            }
                        });
                        
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