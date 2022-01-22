import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native'

export const ListItem = ({product, orderNo, qty, price}) => {
     return (
     <>
          <ScrollView style={{backgroundColor:"#fff"}}>
               <View style={styles.listContainer}>
                    <Text style={styles.title}>{product}</Text>
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
     },
     title: {
          color: '#424242', 
          fontWeight: 'bold', 
          fontSize: 22, 
          marginTop: 12,
     }
});
