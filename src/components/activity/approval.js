import React, { useState, useEffect } from 'react';
import { LayoutAnimation, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import * as authService from "../../_api/_services/authService";
import { observer } from "mobx-react-lite";
import { useStore } from "../../_api/_mobx/stores/store";
import {
     SwipeableFlatList,
     SwipeableQuickActionButton,
     SwipeableQuickActions,
} from 'react-native-swipe-list';
import { ListItem } from './ListItem';
import Toast from 'react-native-toast-message'
import * as transactionService from '../../_api/_services/transactionService';

const ApprovalScreen = observer(() => {
     const { commonStore } = useStore();
     const { user } = commonStore;
     const [role, setRole] = useState("user");
     const [ transactions, setTransactions ] = useState([]);

     useEffect(() => {
          if (user) {
               const loggedInUser = authService.getCurrentUser(user.token);
               const { unique_name } = loggedInUser;
               setRole(unique_name);

               transactionService
               .getAll()
               .then(res => {
                    if (res.length > 0) {
                         setTransactions(res);
                    }
               })
               .catch((err) => console.log(err));
          }
     }, [transactions, user])

     const NoUser = () => {
          return (
               <View style={styles.container}>
                    <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                         Login an Admin account.
                    </Text>
               </View>
          );
     };

     const AdminUser = () => {
          const products = transactions.filter((item) => item.isApproved !== true);
          const [ approval, setApproval ] = useState(products)

          const handleApprove = (item) => {
               console.log(`Approved id: ${item.customerName} product: ${item.orderNumber}`);
               transactionService.updateTransaction(item)
               .then(res => {
                    console.log("return data:", res)
                    const test = approval.filter(record => {
                         return record.orderNumber !== res.orderNumber
                    })
                    setApproval(test);
                    Toast.show({
                         type: "success",
                         text1: "Order Approved",
                         text2: `Order Number: ${item.orderNumber} \nCustomer Name: ${item.customerName}`,
                         visibilityTime: 1000,
                         autoHide: true,
                         topOffset: 80,
                         bottomOffset: 40,
                    });
               })
               .catch(err => console.log(err));
          }

          return (
               <SafeAreaView>
                    <SwipeableFlatList style={styles.swipeable}
                         data={approval}
                         renderItem={({ item }) => <ListItem {...item} />}
                         keyExtractor={(index) => index.id.toString()}
                         // renderLeftActions={({ item }) => (
                         // <SwipeableQuickActions style={{backgroundColor: "red"}}>
                         //      <SwipeableQuickActionButton style={styles.button}
                         //      onPress={() => {
                         //      LayoutAnimation.configureNext(
                         //           LayoutAnimation.Presets.easeInEaseOut
                         //      );
                         //      setApproval(approval.filter((value) => value.orderNumber !== item.orderNumber));
                         //      }}
                         //      text="Delete"
                         //      textStyle={{ fontWeight: "bold", color: "white" }}
                         //      />
                         // </SwipeableQuickActions>
                         // )}
                         renderRightActions={({ item }) => (
                         <SwipeableQuickActions style={{backgroundColor: "green"}}>
                              <SwipeableQuickActionButton style={styles.button} textStyle={{ fontWeight: "bold", color: "white" }} onPress={() => handleApprove(item)} text={"Approve"}/>
                         </SwipeableQuickActions>
                         )}
                    />
               </SafeAreaView>
          );
     };

     return (
     <>
          {user == null || role !== "admin" ?
          <NoUser/> : <AdminUser/>}
     </>);
});

export default ApprovalScreen;

const styles = StyleSheet.create({
     button: {
          display: 'flex',
          width: 100,
          height: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 10
     }
});