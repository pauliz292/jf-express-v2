import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createDrawerNavigator } from '@react-navigation/drawer'

import SignUpScreen from '../components/auth/signUp'
import LoginScreen from '../components/auth/login'
import ProfileScreen from '../components/profile/profile'
import ActivityScreen from '../components/activity/activity'

const AuthStack = createStackNavigator();
const AuthStackScren = () => (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
        <AuthStack.Screen name="Login" component={LoginScreen} />
        <AuthStack.Screen 
            name="SignUp" 
            component={SignUpScreen}
            options={{
                title: "Sign Up"
            }} 
        />
    </AuthStack.Navigator>
)

const ProfileStack = createStackNavigator();
const ProfileStackScren = () => (
    <ProfileStack.Navigator screenOptions={{ headerShown: false }}>
        <ProfileStack.Screen name="Profile" component={ProfileScreen} />
    </ProfileStack.Navigator>
)

const ActivityStack = createStackNavigator();
const ActivityStackScreen = () => (
    <ActivityStack.Navigator screenOptions={{ headerShown: false }}>
        <ActivityStack.Screen name="Activity" component={ActivityScreen} />
    </ActivityStack.Navigator>
)

const Drawer = createDrawerNavigator();

export default function HomeNavigation () {
    return(
        <NavigationContainer>
            <Drawer.Navigator>
                <Drawer.Screen name="Profile" component={ProfileStackScren} />
                <Drawer.Screen name="Activity" component={ActivityStackScreen} />
                <Drawer.Screen name="Login" component={AuthStackScren} />
            </Drawer.Navigator>
            
        </NavigationContainer>
    );
}