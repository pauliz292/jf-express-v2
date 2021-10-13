import React from "react";
import { View, StyleSheet, Image, Text } from "react-native";
import { Button, Input } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import Toast from "react-native-toast-message";
import { useNavigation } from "@react-navigation/native";

import * as authService from "../../_api/_services/authService";
import { Formik } from "formik";
import * as Yup from "yup";
import { observer } from "mobx-react-lite";
import { useStore } from "../../_api/_mobx/stores/store";

const LoginScreen = observer(() => {
  const navigation = useNavigation();

  const { commonStore } = useStore();
  const { setToken } = commonStore;

  const SignupSchema = Yup.object().shape({
    username: Yup.string().required("Required"),
    password: Yup.string().required("Required"),
  });

  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require("../../../assets/splash.png")}
      />
      <Formik
        initialValues={{ username: "", password: "" }}
        validationSchema={SignupSchema}
        onSubmit={(values) => {
          authService
            .login(values.username, values.password)
            .then((data) => {
              Toast.show({
                type: "success",
                text1: "Success",
                text2: "You have successfully logged in.",
                visibilityTime: 8000,
                autoHide: true,
                topOffset: 80,
                bottomOffset: 40,
              });
              const { token } = data;
              const loggedInUser = authService.getCurrentUser(token);
              const { role } = loggedInUser;
              if (role == "Admin") {
                setToken(token);
                navigation.navigate("ProductListScreen");
              } else {
                setToken(token);
                navigation.navigate("HomeScreen");
              }
            })
            .catch((err) => {
              console.log("Error on loggin in.", err);
              Toast.show({
                type: "error",
                text1: "Account not found",
                text2: "Please make sure the password/username is correct.",
                visibilityTime: 8000,
                autoHide: true,
                topOffset: 80,
                bottomOffset: 40,
              });
            });
        }}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <View style={styles.formContainer}>
            <View style={styles.form}>
              <Input
                onChangeText={handleChange("username")}
                onBlur={handleBlur("username")}
                value={values.username}
                placeholder="username"
                leftIcon={<Icon name="user" size={24} color="#03A9F4" />}
              />
              {errors.username && touched.username && (
                <Text style={styles.errorText}>{errors.username}</Text>
              )}
              <Input
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                value={values.password}
                placeholder="password"
                leftIcon={<Icon name="key" size={24} color="#03A9F4" />}
                secureTextEntry={true}
              />
              {errors.password && touched.password && (
                <Text style={styles.errorText}>{errors.password}</Text>
              )}
              <View style={styles.buttonContainer}>
                <Button title="Log In" onPress={() => handleSubmit()} />
              </View>
              <View style={styles.buttonContainer}>
                <Button
                  title="Sign Up"
                  type="outline"
                  onPress={() => navigation.navigate("SignUp")}
                />
              </View>
            </View>
          </View>
        )}
      </Formik>
    </View>
  );
});

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
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
  logo: {
    width: "70%",
    height: 50,
    marginBottom: 30,
  },
  errorText: {
    fontSize: 13,
    color: "red",
  },
});
