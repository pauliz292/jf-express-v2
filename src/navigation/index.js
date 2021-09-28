import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createDrawerNavigator } from '@react-navigation/drawer'

import HomeScreen from '../screens/homeScreen'
import SignUpScreen from '../components/auth/signUp'
import LoginScreen from '../components/auth/login'
import ProfileScreen from '../components/profile/profile'
import ActivityScreen from '../components/activity/activity'
import CartScreen from '../components/cart/cart'
import CheckoutScreen from '../components/cart/checkout'
import WelcomeScreen from '../screens/welcomeScreen'
import SettingsScreen from '../screens/settingsScreen'
import ConfirmOrderScreen from '../components/cart/confirmOrder'
import ProductListScreen from '../components/product/productList'
import AddProductScreen from '../components/product/addProduct'


const HomeStack = createStackNavigator();
const HomeStackScren = () => (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
        <HomeStack.Screen name="HomeScreen" component={HomeScreen} />
        <HomeStack.Screen name="CartScreen" component={CartScreen} />
        <HomeStack.Screen name="CheckoutScreen" component={CheckoutScreen} />
        <HomeStack.Screen name="ConfirmOrderScreen" component={ConfirmOrderScreen} />
        <HomeStack.Screen name="WelcomeScreen" component={WelcomeScreen} />
    </HomeStack.Navigator>
)

const AuthStack = createStackNavigator();
const AuthStackScren = () => (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
        <AuthStack.Screen name="LoginScreen" component={LoginScreen} />
        <AuthStack.Screen 
            name="SignUp" 
            component={SignUpScreen}
            options={{
                title: "Sign Up"
            }} 
        />
        <AuthStack.Screen 
            name="ProductListScreen" 
            component={ProductListScreen} 
            options={{
                title: "Products"
            }}
        />
        <AuthStack.Screen 
            name="AddProductScreen" 
            component={AddProductScreen} 
            options={{
                title: "Products"
            }}
        />
    </AuthStack.Navigator>
)

const ProfileStack = createStackNavigator();
const ProfileStackScren = () => (
    <ProfileStack.Navigator screenOptions={{ headerShown: false }}>
        <ProfileStack.Screen name="ProfileScreen" component={ProfileScreen} />
    </ProfileStack.Navigator>
)

const ActivityStack = createStackNavigator();
const ActivityStackScreen = () => (
    <ActivityStack.Navigator screenOptions={{ headerShown: false }}>
        <ActivityStack.Screen name="ActivityScreen" component={ActivityScreen} />
    </ActivityStack.Navigator>
)

const SettingsStack = createStackNavigator();
const SettingsStackScreen = () => (
    <SettingsStack.Navigator screenOptions={{ headerShown: false }}>
        <SettingsStack.Screen name="SettingsScreen" component={SettingsScreen} />
    </SettingsStack.Navigator>
)

const Drawer = createDrawerNavigator();

export default function HomeNavigation () {
    return(
        <NavigationContainer>
            <Drawer.Navigator screenOptions={{ 
                drawerStyle: {
                    backgroundColor: '#B71C1C',
                    width: 240,
                    },
                drawerLabelStyle: {
                    color: '#fff'
                } 
            }}>
                <Drawer.Screen name="Home" component={HomeStackScren} />
                <Drawer.Screen name="Profile" component={ProfileStackScren} />
                <Drawer.Screen name="Activity" component={ActivityStackScreen} />
                <Drawer.Screen name="Settings" component={SettingsStackScreen} />
                <Drawer.Screen name="Login" component={AuthStackScren} />
            </Drawer.Navigator>
            
        </NavigationContainer>
    );
}