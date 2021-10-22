import React from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { ListItem } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";

const ActivityScreen = () => {
  const navigation = useNavigation();

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
};

export default ActivityScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    padding: 10,
  },
});
