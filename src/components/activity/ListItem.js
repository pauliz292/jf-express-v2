import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native'

export const ListItem = ({ orderNumber, customerName, deliveryAddress, contactInfo, totalAmount, products}) => {
     return (
     <>
          <ScrollView style={{backgroundColor:"#fff"}}>
               <View style={styles.listContainer}>
                    <Text>Order No: {orderNumber}</Text>
                    <Text>Customer Name: {customerName}</Text>
                    <Text>Delivery Address: {deliveryAddress}</Text>
                    <Text>Contact #: {contactInfo}</Text>
                    <Text>Amount: {totalAmount}</Text>
                    <Text style={styles.title}>Orders:</Text>
                         {products.map((i, index) => (
                              <View style={{marginLeft: 5}} key={index}>
                                   <Text style={{marginLeft: 10}}>{`${i.name} - ${i.qty}pc(s) for ${i.price} pesos`}</Text>
                              </View>
                         ))}
               </View>
          </ScrollView>
     </>
     );
};

const styles = StyleSheet.create({
     listContainer: {
          margin: 5,
          padding: 5,
          width: '100%'
     },
     title: {
          color: '#424242',
          fontWeight: 'bold',
          fontSize: 16
     }
});
