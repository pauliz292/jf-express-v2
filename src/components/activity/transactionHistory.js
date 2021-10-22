import React from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { Card, Text, Button } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";

const TransactionHistoryScreen = () => {
  const navigation = useNavigation();

  const items = [
    {
      name: "Meat",
      price: "100",
    },
    {
      name: "Fish",
      price: "150",
    },
  ];

  return (
    <ScrollView style={{ backgroundColor: "white" }}>
      <View style={styles.container}>
        <Text style={styles.title}>Purchased Items</Text>
        <View style={{ width: "100%", marginTop: 40 }}>
          {items.map((item, i) => (
            <Card key={i}>
              <Text h4={true}>{item.name}</Text>
              <Card.Divider />
              <Text style={{ fontSize: 20 }}>
                Price: <Text style={{ fontSize: 16 }}>PHP {item.price}</Text>
              </Text>
            </Card>
          ))}
          <Text style={{ marginLeft: 20, marginTop: 20, fontSize: 22 }}>
            Total: 250
          </Text>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            onPress={() => navigation.navigate("ActivityScreen")}
            title="Back"
            buttonStyle={{ backgroundColor: "#E53935" }}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default TransactionHistoryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
  },
  buttonContainer: {
    width: "90%",
    padding: 50,
  },
});
