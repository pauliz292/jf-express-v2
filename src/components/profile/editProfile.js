import React from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { Button, Input, Avatar } from 'react-native-elements'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { observer } from 'mobx-react-lite'
import { useNavigation } from '@react-navigation/native';

const EditProfileScreen = observer(() => {

    const navigation = useNavigation();

    const ValidationSchema = Yup.object().shape({
        email: Yup.string().required('Required'),
        firstName: Yup.string().required('Required'),
        lastName: Yup.string().required('Required'),
    });

    return(
        <ScrollView>
            <View style={styles.container}>
                <Text style={styles.title}>Edit Profile</Text>
                <Formik 
                    initialValues={{ email: '', firstName: '', lastName: '' }}
                    validationSchema={ValidationSchema}
                    onSubmit={values => {
                        console.log(values)
                    }}
                >
                    {({ handleChange, handleBlur, handleSubmit, values }) => (
                        <View style={styles.formContainer}>
                            <View style={styles.profile}>
                                <Avatar
                                    rounded
                                    size='xlarge'
                                    source={{
                                        uri:
                                        'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
                                    }}
                                />
                            </View>
                            <View style={styles.form}>
                                <Input
                                    onChangeText={handleChange('email')}
                                    onBlur={handleBlur('email')}
                                    value={values.email}
                                    placeholder='Email'
                                />
                                <Input
                                    onChangeText={handleChange('firstName')}
                                    onBlur={handleBlur('firstName')}
                                    value={values.firstName}
                                    placeholder='First Name'
                                />
                                <Input
                                    onChangeText={handleChange('lastName')}
                                    onBlur={handleBlur('lastName')}
                                    value={values.lastName}
                                    placeholder='Last Name'
                                />
                                <View style={styles.buttonContainer}>
                                    <Button title="Update"/>
                                </View>
                                <View style={styles.buttonContainer}>
                                    <Button 
                                        title="Cancel" 
                                        buttonStyle={{ backgroundColor: '#E53935' }} 
                                        onPress={() => navigation.navigate('ProfileScreen')}
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

export default EditProfileScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 10,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
    },
    profile: {
        marginTop: 15,
        marginBottom: 15,
        alignItems: 'center'
    },
    buttonContainer: {
        padding: 10
    },
    formContainer: {
        width: '90%',
        alignContent: 'center',
        marginTop: 15,
    },
    form: {
        backgroundColor: '#eee',
        borderRadius: 15,
        padding: 10,
    },
});