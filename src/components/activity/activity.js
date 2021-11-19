import React, { useEffect, useState } from "react";
import { View, ScrollView, StyleSheet, Text } from "react-native";
import { ListItem } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import * as authService from "../../_api/_services/authService";
import { observer } from "mobx-react-lite";
import { useStore } from "../../_api/_mobx/stores/store";


const ActivityScreen = observer(() => {
  const navigation = useNavigation();

  const { commonStore, activityStore } = useStore();
  const { user } = commonStore;
  const { setActivities, setActivity } = activityStore;

  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    if(user) {
      authService.getTransactions(user.id)
        .then(res => {
          if (res.length > 0) {
            setTransactions(res)
            setActivities(res)
          }
        })
        .catch(err => console.log(err));
    } else {
      console.log("No user data.")
    }
  }, [user])

  const seeDetails = activity => {
    setActivity(activity);
    navigation.navigate("TransactionHistoryScreen");
  };

  const NoUser = () => {
    return(
      <View style={styles.container}>
        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
          Login to your account.
        </Text>
      </View>
    );
  };

  const ActivitiesView = () => {
    return(
      <ScrollView style={{ backgroundColor: "white" }}>
        <View style={styles.container}>
          {transactions.map((item, i) => (
            <ListItem
              key={i}
              bottomDivider
              onPress={() => seeDetails(item)}
            >
              <ListItem.Content>
                <ListItem.Title>Order Number: {item.orderNumber}</ListItem.Title>
                <ListItem.Subtitle> Total Amount: {item.totalAmount}</ListItem.Subtitle>
              </ListItem.Content>
              <ListItem.Chevron />
            </ListItem>
          ))}
        </View>
      </ScrollView>
    );
  };

  return (
    <>
      {user ? <ActivitiesView /> : <NoUser />}
    </>
  );
});

export default ActivityScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    padding: 10,
  },
});
