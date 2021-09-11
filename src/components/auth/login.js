import React from 'react'
import { View, Text } from 'react-native'
import { StyleSheet } from 'react-native'
import { Button } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'

const LoginScreen = () => {
    const navigation = useNavigation();

    return(
        <View style={styles.container}>
            <Text>Login Screen!</Text>
            <Button 
                title="Sign Up" 
                onPress={() => navigation.navigate('SignUp')}
            />
        </View>
    );
}

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});