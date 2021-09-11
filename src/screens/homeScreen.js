import React from 'react'
import { View } from 'react-native'
import { Button } from 'react-native-elements'
// import { useNavigation } from '@react-navigation/native'

const HomeScreen = ({ navigation }) => {
    // const navigation = useNavigation();

    return(
        <View>
            <Button 
                title="Log In" 
                onPress={() => navigation.push("Login")}
            />
            <Button 
                title="Sign Up" 
                onPress={() => navigation.push("SignUp")}
            />
        </View>
    );
}

export default HomeScreen;