import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Button } from 'react-native-elements'
import { useNavigation } from '@react-navigation/core'


const WelcomeScreen = () => {
    const navigation = useNavigation();

    return(
        <View style={styles.container}>
            <Text>Welcome!</Text>
            <Button title="Start Shopping" onPress={() => navigation.navigate('HomeScreen')}/>
        </View>
    );
}

export default WelcomeScreen;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});