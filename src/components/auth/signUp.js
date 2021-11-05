import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Button, Input } from "react-native-elements";
import Toast from "react-native-toast-message";
import { useNavigation } from "@react-navigation/native";

import { Formik } from "formik";
import * as Yup from "yup";
import { observer } from "mobx-react-lite";
import { useStore } from "../../_api/_mobx/stores/store";
import * as authService from "../../_api/_services/authService";

const SignUpScreen = observer(() => {
  const navigation = useNavigation();

  const { commonStore } = useStore();
  const { setToken, setUser } = commonStore;

  const SignupSchema = Yup.object().shape({
    username: Yup.string().required("Required"),
    email: Yup.string().required("Required"),
    password: Yup.string().required("Required"),
    confirmPassword: Yup.string().required("Required"),
    firstName: Yup.string().required("Required"),
    lastName: Yup.string().required("Required"),
  });

  return (
    <ScrollView style={styles.container}>
      <View style={{ alignItems: "center", marginTop: 15 }}>
        <Formik
          initialValues={{ email: "", password: "", confirmPassword: "" }}
          validationSchema={SignupSchema}
          onSubmit={(values, { resetForm }) => {
            if (values.password !== values.confirmPassword) {
              Toast.show({
                type: "error",
                text1: "Passwords Do Not Match",
                text2: "Please make sure the passwords you enter match.",
                visibilityTime: 8000,
                autoHide: true,
                topOffset: 80,
                bottomOffset: 40,
              });
            } else {
              authService.signUp(values)
                .then((data) => {
                  resetForm();
                  Toast.show({
                    type: "success",
                    text1: "Success",
                    text2: "You have successfully registered your account.",
                    visibilityTime: 8000,
                    autoHide: true,
                    topOffset: 80,
                    bottomOffset: 40,
                  });
                  setUser(data);
                  const { token } = data;
                  setToken(token);
                  navigation.navigate("HomeScreen");
                })
                .catch((err) => console.log("Error on register.", err));
            }
          }}
        >
          {({ handleChange, handleBlur, handleSubmit, values }) => (
            <View style={styles.formContainer}>
              <View style={styles.form}>
                <Input
                  onChangeText={handleChange("username")}
                  onBlur={handleBlur("username")}
                  value={values.username}
                  placeholder="Username"
                />
                <Input
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  value={values.email}
                  placeholder="Email"
                />
                <Input
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                  value={values.password}
                  placeholder="Password"
                  secureTextEntry={true}
                />
                <Input
                  onChangeText={handleChange("confirmPassword")}
                  onBlur={handleBlur("confirmPassword")}
                  value={values.confirmPassword}
                  placeholder="Confirm Password"
                  secureTextEntry={true}
                />
                <Input
                  onChangeText={handleChange("firstName")}
                  onBlur={handleBlur("firstName")}
                  value={values.firstName}
                  placeholder="First Name"
                />
                <Input
                  onChangeText={handleChange("lastName")}
                  onBlur={handleBlur("lastName")}
                  value={values.lastName}
                  placeholder="Last Name"
                />
                <View style={styles.buttonContainer}>
                  <Button title="Sign Up" onPress={() => handleSubmit()} />
                </View>
                <View style={styles.buttonContainer}>
                  <Button
                    title="Login"
                    type="outline"
                    onPress={() => navigation.navigate("LoginScreen")}
                  />
                </View>
              </View>
            </View>
          )}
        </Formik>
      </View>
    </ScrollView>
  );
});

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  formContainer: {
    width: "80%",
    alignContent: "center",
  },
  form: {
    backgroundColor: "#eee",
    borderRadius: 15,
    padding: 10,
  },
  buttonContainer: {
    padding: 10,
  },
});
