import React from 'react'
import { Text, View, ScrollView, StyleSheet } from 'react-native'
import { Card, Button, Icon } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'

const HomeScreen = () => {
    const navigation = useNavigation();

    return(
        <ScrollView>
            <View style={styles.container}>
                <Card>
                    <Card.Title>Product 1</Card.Title>
                    <Card.Divider/>
                    <Card.Image source={require('../../assets/meat.png')}/>
                        <Text style={{marginBottom: 10}}>
                        The idea with React Native Elements is more about component structure than actual design.
                        </Text>
                        <Button
                            icon={<Icon name='shopping-cart' color='#ffffff' />}
                            buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                            title='Add to Cart'
                            onPress={() => navigation.navigate('CartScreen')} 
                        />
                </Card>
                <Card>
                    <Card.Title>Product 2</Card.Title>
                    <Card.Divider/>
                    <Card.Image source={require('../../assets/meat.png')}/>
                        <Text style={{marginBottom: 10}}>
                        The idea with React Native Elements is more about component structure than actual design.
                        </Text>
                        <Button
                        icon={<Icon name='shopping-cart' color='#ffffff' />}
                        buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                        title='Add to Cart' />
                </Card>
                <Card>
                    <Card.Title>Product 3</Card.Title>
                    <Card.Divider/>
                    <Card.Image source={require('../../assets/meat.png')}/>
                        <Text style={{marginBottom: 10}}>
                        The idea with React Native Elements is more about component structure than actual design.
                        </Text>
                        <Button
                        icon={<Icon name='shopping-cart' color='#ffffff' />}
                        buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                        title='Add to Cart' />
                </Card>
            </View>
        </ScrollView>
    );
}

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});