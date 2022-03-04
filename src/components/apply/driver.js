import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { ListItem } from 'react-native-elements'
import * as driverService from '../../_api/_services/driverService';

const DriverScreen = () => {
     const [ driver, setDriver ] = useState([]);

     useEffect(() => {
          driverService
          .getAll()
          .then(res => {
               if (res.length > 0) {
                    setDriver(res);
                    console.log(driver);
               }
          })
          .catch((err) => console.log(err));
     }, [])

     return (
          <ScrollView style={{backgroundColor:"#fff"}}>
               <View style={styles.container}>
                    <View style={styles.listContainer}>
                         {driver.map((item, index) => (
                              <ListItem bottomDivider key={index}>
                                   <ListItem.Content>
                                        <ListItem.Title style={styles.title}>Name: {item.firstName}</ListItem.Title>
                                        <ListItem.Subtitle>license Number: {item.licenseNumber}</ListItem.Subtitle>
                                        <ListItem.Subtitle>Plate Number:{item.plateNumber}</ListItem.Subtitle>
                                        <ListItem.Subtitle>Phone Number: {item.phoneNumber}</ListItem.Subtitle>
                                        <ListItem.Subtitle>Email: {item.email}</ListItem.Subtitle>
                                   </ListItem.Content>
                              </ListItem>
                         ))}
                    </View>
               </View>
          </ScrollView>
     )
}

export default DriverScreen

const styles = StyleSheet.create({
     container: {
          flex: 1,
          backgroundColor: '#fff',
          alignItems: 'center'
     },
     listContainer: {
          margin: 5,
          padding: 5,
          width: '100%'
     },
     title: {
          color: '#424242',
          fontWeight: 'bold',
          fontSize: 20
     }
});