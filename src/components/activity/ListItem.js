import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native'

export const ListItem = ({ orderNumber, customerName, deliveryAddress, contactInfo, totalAmount, isApproved}) => {
     return (
     <>
          <ScrollView style={{backgroundColor:"#fff"}}>
               <View style={styles.listContainer}>
                    {/* <Text style={{color: '#424242', fontWeight: 'bold', fontSize: 22, marginTop: 12, color: (isApproved ? 'green' : 'red')}}>{product}</Text> */}
                    <Text>Order No: {orderNumber}</Text>
                    <Text>Customer Name: {customerName}</Text>
                    <Text>Delivery Address: {deliveryAddress}</Text>
                    <Text>Contact #: {contactInfo}</Text>
                    <Text>Amount: {totalAmount}</Text>
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
     }
});
