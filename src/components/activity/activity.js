import React from "react";
import { View,  ScrollView, Alert } from "react-native";
import { ListItem, } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";

const ActivityScreen = () => {
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

  const items = [
    {
      name: "Meat",
      icon: "shopping-bag",
      price: "100",
    },
    {
      name: "Fish",
      icon: "shopping-bag",
      price: "150",
    },
  ];

  return (
    <ScrollView style={{ backgroundColor: "white" }}>
      <View>
        {list.map((item, i) => (
          <ListItem key={i} bottomDivider onPress={()=>Alert.alert("Transaction History")}>
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
