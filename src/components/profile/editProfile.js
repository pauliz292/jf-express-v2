import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { Button, Input, Avatar } from 'react-native-elements'
import { Formik } from 'formik'
import * as Yup from 'yup'
import * as ImagePicker from 'expo-image-picker'
import { observer } from 'mobx-react-lite'
import { useNavigation } from '@react-navigation/native'
import * as authService from '../../_api/_services/authService'
import { useStore } from '../../_api/_mobx/stores/store'


const EditProfileScreen = observer(() => {
    const { commonStore } = useStore();
    const { user } = commonStore;
    const navigation = useNavigation();

    const ValidationSchema = Yup.object().shape({
        email: Yup.string().required('Required'),
        phoneNumber: Yup.string().required('Required'),
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

        setImage(result);
    }

    return (
        <ScrollView>
            <View style={styles.container}>
                <Text style={styles.title}>Edit Profile</Text>
                <Formik
                    initialValues={{ email: '', phoneNumber: '' }}
                    validationSchema={ValidationSchema}
                    onSubmit={values => {
                        let data = {
                            id: user.id,
                            phoneNumber: values.phoneNumber,
                            email: values.email
                        }
                        authService.updateProfile(data, image)
                    }}
                >
                    {({ handleChange, handleBlur, handleSubmit, values }) => (
                        <View style={styles.formContainer}>
                            <View style={styles.profile}>
                                <Avatar
                                    rounded
                                    size='xlarge'
                                    source={{ uri: image.uri }}
                                />
                                <Button title="Upload" onPress={() => handleUpload()} />
                            </View>
                            <View style={styles.form}>
                                <Input
                                    onChangeText={handleChange('email')}
                                    onBlur={handleBlur('email')}
                                    value={values.email}
                                    placeholder='Email'
                                />
                                <Input
                                    onChangeText={handleChange('phoneNumber')}
                                    onBlur={handleBlur('phoneNumber')}
                                    value={values.phoneNumber}
                                    placeholder='Phone Number'
                                />
                                <View style={styles.buttonContainer}>
                                    <Button title="Update" onPress={() => handleSubmit()} />
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