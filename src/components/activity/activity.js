import React, { useEffect } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { ListItem } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import * as authService from "../../_api/_services/authService";
import { observer } from "mobx-react-lite";
import { useStore } from "../../_api/_mobx/stores/store";


const ActivityScreen = observer(() => {
  const navigation = useNavigation();

  const { commonStore } = useStore();
  const { user } = commonStore;

  const list = [
    {
      title: "Purchased",
      icon: "shopping-bag",
      subTitle: "September 21, 2025",
    },
    {
      title: "Purchased",
      icon: "shopping-bag",
      subTitle: "September 21, 2025",
    },
    {
      title: "Purchased",
      icon: "shopping-bag",
      subTitle: "September 21, 2025",
    },
  ];

  useEffect(() => {
    if(user) {
      authService.getTransactions(user.id)
        .then(res => console.log(res))
        .catch(err => console.log(err));
    } else {
      console.log("No user data.")
    }
  }, [])

  return (
    <ScrollView style={{ backgroundColor: "white" }}>
      <View style={styles.container}>
        {list.map((item, i) => (
          <ListItem
            key={i}
            bottomDivider
            onPress={() => navigation.navigate("TransactionHistoryScreen")}
          >
            <Icon name={item.icon} style={{ color: "#03A9F4", fontSize: 24 }} />
            <ListItem.Content>
              <ListItem.Title>{item.title}</ListItem.Title>
              <ListItem.Subtitle>{item.subTitle}</ListItem.Subtitle>
            </ListItem.Content>
            <ListItem.Chevron />
          </ListItem>
        ))}
      </View>
    </ScrollView>
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
