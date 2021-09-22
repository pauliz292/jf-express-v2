import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Button } from 'react-native-elements'
import Toast from 'react-native-toast-message'
import { useNavigation } from '@react-navigation/core'

import { useStore } from '../_api/_mobx/stores/store'
import { observer } from "mobx-react-lite"


const SettingsScreen = observer(() => {
    const { commonStore } = useStore();
    const { signOut } = commonStore;
    const navigation = useNavigation();

    const handleSignOut = () => {
        signOut()
        Toast.show({
            type:'success',
            text1: "Success",
            text2: "You have successfully signed out from your account.",
            visibilityTime: 8000,
            autoHide: true,
            topOffset: 80,
            bottomOffset: 40,
        })
        navigation.navigate('HomeScreen')
    }

    return(
        <View style={styles.container}>
            <Button title="Log Out" onPress={() => handleSignOut()} />
        </View>
    );
})

export default SettingsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
});