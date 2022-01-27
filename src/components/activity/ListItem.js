import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native'

export const ListItem = ({product, orderNo, qty, price, isApproved}) => {
     return (
     <>
          <ScrollView style={{backgroundColor:"#fff"}}>
               <View style={styles.listContainer}>
                    <Text style={{color: '#424242', fontWeight: 'bold', fontSize: 22, marginTop: 12, color: (isApproved ? 'green' : 'red')}}>{product}</Text>
                    <Text>Order No: {orderNo}</Text>
                    <Text>Quantity: {qty}</Text>
                    <Text>Price: {price}</Text>
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
