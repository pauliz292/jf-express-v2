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
import { ToastAndroid } from 'react-native';
import * as transactionService from '../../_api/_services/transactionService';

const ApprovalScreen = observer(() => {
     const { commonStore } = useStore();
     const { user } = commonStore;
     const [role, setRole] = useState("user");
     const [ transactions, setTransactions ] = useState([]);

     useEffect(() => {
          console.log(user)
          if (user) {
               const loggedInUser = authService.getCurrentUser(user.token);
               const { unique_name } = loggedInUser;
               setRole(unique_name);

               transactionService
               .getAll()
               .then((res) => {
                    if (res.length > 0) {
                    setTransactions(res);
                    console.log(transactions);
                    }
               })
               .catch((err) => console.log(err));
          }
     }, [user])

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
          const [ approval, setApproval ] = useState(transactions)

          const handleApprove = (item) => {
               console.log(`Approved id: ${item.id} product: ${item.orderNumber}`);
               return ToastAndroid.show(`Order no: ${item.orderNumber} ${item.isApproved ? "Cancelled" : "Approved"}!`, ToastAndroid.SHORT)
          }

          return (
               <SafeAreaView>
                    <SwipeableFlatList style={styles.swipeable}
                         data={approval}
                         renderItem={({ item }) => <ListItem {...item} />}
                         keyExtractor={(index) => index.orderNumber.toString()}
                         renderLeftActions={({ item }) => (
                         <SwipeableQuickActions style={{backgroundColor: "red"}}>
                              <SwipeableQuickActionButton style={styles.button}
                              onPress={() => {
                              LayoutAnimation.configureNext(
                                   LayoutAnimation.Presets.easeInEaseOut
                              );
                              setApproval(approval.filter((value) => value.orderNumber !== item.orderNumber));
                              }}
                              text="Delete"
                              textStyle={{ fontWeight: "bold", color: "white" }}
                              />
                         </SwipeableQuickActions>
                         )}
                         renderRightActions={({ item }) => (
                         <SwipeableQuickActions style={{backgroundColor: "green"}}>
                              <SwipeableQuickActionButton style={styles.button} textStyle={{ fontWeight: "bold", color: "white" }} onPress={() => handleApprove(item)} text={item.isApproved ? "Disapprove" : "Approve"}/>
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