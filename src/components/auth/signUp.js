import React from 'react'
import { View, StyleSheet, ScrollView } from 'react-native'
import { Button, Input } from 'react-native-elements'
import Toast from 'react-native-toast-message'
import Icon from 'react-native-vector-icons/FontAwesome'
import { useNavigation } from '@react-navigation/native'

import { Formik } from 'formik'
import * as Yup from 'yup'
import { observer } from "mobx-react-lite"
import * as authService from '../../_api/_services/authService'

const SignUpScreen = observer(() => {
    const navigation = useNavigation();
    const SignupSchema = Yup.object().shape({
        username: Yup.string().required('Required'),
        email: Yup.string().required('Required'),
        password: Yup.string().required('Required'),
        confirmPassword: Yup.string().required('Required'),
        firstName: Yup.string().required('Required'),
        lastName: Yup.string().required('Required'),
    });

    return(
        <ScrollView style={styles.container}>
            <View style={{ alignItems: 'center', marginTop: 15 }}>
                <Formik 
                    initialValues={{ email: '', password: '' }}
                    validationSchema={SignupSchema}
                    onSubmit={values => {
                        if (values.password !== values.confirmPassword) {
                            Toast.show({
                                type:'error',
                                text1: "Passwords Do Not Match",
                                text2: "Please make sure the passwords you enter match.",
                                visibilityTime: 8000,
                                autoHide: true,
                                topOffset: 80,
                                bottomOffset: 40,
                            })
                        } else {
                            console.log("Sign Up: ", values);
                            authService.signUp(values);
                        }
                    }}
                >
                    {({ handleChange, handleBlur, handleSubmit, values }) => (
                        <View style={styles.formContainer}>
                            <View style={styles.form}>
                                <Input
                                    onChangeText={handleChange('username')}
                                    onBlur={handleBlur('username')}
                                    value={values.username}
                                    placeholder='Username'
                                    leftIcon={
                                        <Icon
                                            name='code'
                                            size={24}
                                            color='#03A9F4'
                                        />
                                    }
                                />
                                <Input
                                    onChangeText={handleChange('email')}
                                    onBlur={handleBlur('email')}
                                    value={values.email}
                                    placeholder='Email'
                                    leftIcon={
                                        <Icon
                                            name='user'
                                            size={24}
                                            color='#03A9F4'
                                        />
                                    }
                                />
                                <Input
                                    onChangeText={handleChange('password')}
                                    onBlur={handleBlur('password')}
                                    value={values.password}
                                    placeholder='Password'
                                    leftIcon={
                                        <Icon
                                            name='key'
                                            size={24}
                                            color='#03A9F4'
                                        />
                                    }
                                    secureTextEntry={true}
                                />
                                <Input
                                    onChangeText={handleChange('confirmPassword')}
                                    onBlur={handleBlur('confirmPassword')}
                                    value={values.confirmPassword}
                                    placeholder='Confirm Password'
                                    leftIcon={
                                        <Icon
                                            name='key'
                                            size={24}
                                            color='#03A9F4'
                                        />
                                    }
                                    secureTextEntry={true}
                                />
                                <Input
                                    onChangeText={handleChange('firstName')}
                                    onBlur={handleBlur('firstName')}
                                    value={values.firstName}
                                    placeholder='First Name'
                                    leftIcon={
                                        <Icon
                                            name='tag'
                                            size={24}
                                            color='#03A9F4'
                                        />
                                    }
                                />
                                <Input
                                    onChangeText={handleChange('lastName')}
                                    onBlur={handleBlur('lastName')}
                                    value={values.lastName}
                                    placeholder='Last Name'
                                    leftIcon={
                                        <Icon
                                            name='tag'
                                            size={24}
                                            color='#03A9F4'
                                        />
                                    }
                                />
                                <View style={styles.buttonContainer}>
                                    <Button title="Sign Up" onPress={() => handleSubmit()}/>
                                </View>
                                <View style={styles.buttonContainer}>
                                    <Button 
                                        title="Login" 
                                        type="outline" 
                                        onPress={() => navigation.navigate('LoginScreen')} 
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

export default SignUpScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
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