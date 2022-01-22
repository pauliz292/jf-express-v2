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

const ApprovalScreen = observer(() => {
     const { commonStore } = useStore();
     const { user } = commonStore;
     const [role, setRole] = useState("user");

     useEffect(() => {
          console.log(user)
          if (user) {
               const loggedInUser = authService.getCurrentUser(user.token);
               const { unique_name } = loggedInUser;
               setRole(unique_name);
          }
     }, [user])

     const NoUser = () => {
          return (
               <View style={styles.container}>
                    <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                         Login to your account.
                    </Text>
               </View>
          );
     };

     const initialData = [
          {
               id: 1,
               product: 'Chicken',
               orderNo: '002010',
               qty: 1,
               price: 200,
               isApproved: false
          },
          {
               id: 2,
               product: 'Pork',
               orderNo: '002011',
               qty: 2,
               price: 300,
               isApproved: false
          },
          {
               id: 3,
               product: 'Beef',
               orderNo: '002012',
               qty: 1,
               price: 400,
               isApproved: false
          }
     ]

     const AdminUser = () => {
          const [approval, setApproval] = useState(initialData)
          return (
               <SafeAreaView>
                    <SwipeableFlatList style={styles.swipeable}
                         data={approval}
                         renderItem={({ item }) => <ListItem {...item} />}
                         keyExtractor={(index) => index.id.toString()}
                         renderLeftActions={({ item }) => (
                         <SwipeableQuickActions>
                              <SwipeableQuickActionButton style={styles.button}
                              onPress={() => {
                              LayoutAnimation.configureNext(
                                   LayoutAnimation.Presets.easeInEaseOut
                              );
                              setApproval(approval.filter((value) => value.id !== item.id));
                              }}
                              text="Delete"
                              textStyle={{ fontWeight: "bold", color: "red" }}
                              />
                         </SwipeableQuickActions>
                         )}
                         renderRightActions={({ item }) => (
                         <SwipeableQuickActions>
                              <SwipeableQuickActionButton style={styles.button} textStyle={{ fontWeight: "bold", color: "green" }} onPress={() => {}} text="Approve"/>
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
          width: '100%',
          height: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 10
     },
     swipeable: {
          borderBottomColor: 'black',
          color: 'red'
     }
});