import React from "react";
import { View, ScrollView} from "react-native";
import { useStore } from "../../_api/_mobx/stores/store";
import ApplyScreen from "./applyScreen";
import LoginScreen from "../auth/login";

const Apply = () => {
  const { commonStore } = useStore();
  const { token, isLoggedIn } = commonStore;

  return (
    <ScrollView style={{ backgroundColor: "white" }}>
      <View style={{ marginTop: 147, backgroundColor: "white" }}>
        {isLoggedIn ? <ApplyScreen/> : <LoginScreen />}
      </View>
    </ScrollView>
  );
};

export default Apply;


