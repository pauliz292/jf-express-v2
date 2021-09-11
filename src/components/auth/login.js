import React from 'react'
import { View } from 'react-native'
import { StyleSheet } from 'react-native'
import { Button, Input } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome'
import { useNavigation } from '@react-navigation/native'

import { Formik } from 'formik'
import * as Yup from 'yup'
import { observer } from "mobx-react-lite"

const LoginScreen = observer(() => {
    const navigation = useNavigation();
    const SignupSchema = Yup.object().shape({
        email: Yup.string().required('Required'),
        password: Yup.string().required('Required'),
    });

    return(
        <View style={styles.container}>
            <Formik 
                initialValues={{ email: '', password: '' }}
                validationSchema={SignupSchema}
                onSubmit={values => {
                    console.log("Login: ", values)
                }}
            >
                {({ handleChange, handleBlur, handleSubmit, values }) => (
                    <View style={styles.formContainer}>
                        <View style={styles.form}>
                            <Input
                                onChangeText={handleChange('email')}
                                onBlur={handleBlur('email')}
                                value={values.email}
                                placeholder='email'
                                leftIcon={
                                    <Icon
                                        name='user'
                                        size={24}
                                        color='black'
                                    />
                                }
                            />
                            <Input
                                onChangeText={handleChange('password')}
                                onBlur={handleBlur('password')}
                                value={values.password}
                                placeholder='password'
                                leftIcon={
                                    <Icon
                                        name='key'
                                        size={24}
                                        color='black'
                                    />
                                }
                                secureTextEntry={true}
                            />
                            <View style={styles.buttonContainer}>
                                <Button title="Log In" onPress={() => handleSubmit()}/>
                            </View>
                            <View style={styles.buttonContainer}>
                                <Button 
                                    title="Sign Up" 
                                    type="outline" 
                                    onPress={() => navigation.navigate('SignUp')} 
                                />
                            </View>
                        </View>
                    </View>
                )}
            </Formik>
        </View>
    );
})

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    formContainer: {
        width: '80%',
        alignContent: 'center'
    },
    form: {
        backgroundColor: '#eeeeee',
        borderRadius: 15,
        padding: 10,
    },
    buttonContainer: {
        padding: 10
    }
});