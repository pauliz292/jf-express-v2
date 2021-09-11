import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import SignUpScreen from '../components/auth/signUp'
import LoginScreen from '../components/auth/login'

const AuthStack = createStackNavigator();

export default function HomeNavigation () {
    return(
        <NavigationContainer>
            <AuthStack.Navigator>
                <AuthStack.Screen name="Login" component={LoginScreen} />
                <AuthStack.Screen name="SignUp" component={SignUpScreen} />
            </AuthStack.Navigator>
        </NavigationContainer>
    );
}