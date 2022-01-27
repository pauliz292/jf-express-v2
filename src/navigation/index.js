import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createDrawerNavigator } from '@react-navigation/drawer'

import HomeScreen from '../screens/homeScreen'
import SignUpScreen from '../components/auth/signUp'
// import LoginScreen from '../components/auth/login'
import ProfileScreen from '../components/profile/profile'
import EditProfileScreen from '../components/profile/editProfile'
import ActivityScreen from '../components/activity/activity'
import CartScreen from '../components/cart/cart'
import CartAuthScreen from '../components/cart/cartAuth'
import CheckoutScreen from '../components/cart/checkout'
import WelcomeScreen from '../screens/welcomeScreen'
import SettingsScreen from '../screens/settingsScreen'
import ConfirmOrderScreen from '../components/cart/confirmOrder'
// import ProductListScreen from '../components/product/productList'
import AddProductScreen from '../components/product/addProduct'
import EditProductScreen from '../components/product/editProduct'
import ApplyAuth from '../components/apply/apply'
import ApplyScreen from '../components/apply/applyScreen'
import TransactionHistoryScreen from '../components/activity/transactionHistory'
import LoginChecker from '../components/auth/loginChecker'
import ProductDetails from '../components/auth/loginChecker'

const HomeStack = createStackNavigator();
const HomeStackScren = () => (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
        <HomeStack.Screen name="HomeScreen" component={HomeScreen} />
        <HomeStack.Screen name="CartScreen" component={CartScreen} />
        <HomeStack.Screen name="CartAuthScreen" component={CartAuthScreen} />
        <HomeStack.Screen name="CheckoutScreen" component={CheckoutScreen} />
        <HomeStack.Screen name="ConfirmOrderScreen" component={ConfirmOrderScreen} />
        <HomeStack.Screen name="WelcomeScreen" component={WelcomeScreen} />
    </HomeStack.Navigator>
)

const AuthStack = createStackNavigator();
const AuthStackScren = () => (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
        <AuthStack.Screen name="LoginScreen" component={LoginChecker} />
        <AuthStack.Screen 
            name="SignUp" 
            component={SignUpScreen}
            options={{
                title: "Sign Up"
            }} 
        />
        <AuthStack.Screen 
            name="ProductListScreen" 
            component={ProductDetails} 
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
        <AuthStack.Screen 
            name="EditProductScreen" 
            component={EditProductScreen} 
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
        <ProfileStack.Screen name="EditProfileScreen" component={EditProfileScreen} />
    </ProfileStack.Navigator>
)

const ActivityStack = createStackNavigator();
const ActivityStackScreen = () => (
    <ActivityStack.Navigator screenOptions={{ headerShown: false }}>
        <ActivityStack.Screen name="ActivityScreen" component={ActivityScreen} />
        <ActivityStack.Screen name="TransactionHistoryScreen" component={TransactionHistoryScreen} />
    </ActivityStack.Navigator>
)

const SettingsStack = createStackNavigator();
const SettingsStackScreen = () => (
    <SettingsStack.Navigator screenOptions={{ headerShown: false }}>
        <SettingsStack.Screen name="SettingsScreen" component={SettingsScreen} />
    </SettingsStack.Navigator>
)

const ApplyStack = createStackNavigator();
const ApplyStackScreen = () => (
    <ApplyStack.Navigator screenOptions={{ headerShown: false }}>
        <ApplyStack.Screen name="ApplyAuth" component={ApplyAuth} />
        <ApplyStack.Screen name="ApplyScreen" component={ApplyScreen} />
    </ApplyStack.Navigator>
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
                <Drawer.Screen name="Apply" component={ApplyStackScreen} />
                <Drawer.Screen name="Login" component={AuthStackScren} />
            </Drawer.Navigator>
            
        </NavigationContainer>
    );
}