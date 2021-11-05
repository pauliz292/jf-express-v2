import React from "react";
import { View, ScrollView, StyleSheet, Text} from "react-native";
import { useStore } from "../../_api/_mobx/stores/store";
import { useNavigation } from "@react-navigation/native";
import { Button, Input } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import { observer } from "mobx-react-lite";
import { Formik } from "formik";
import * as Yup from "yup";
import * as authService from "../../_api/_services/authService";

const ApplyAuth = observer(() => {
  const { commonStore } = useStore();
  const { setToken, setUser } = commonStore;

  const navigation = useNavigation();

  const SignupSchema = Yup.object().shape({
    username: Yup.string().required("Required"),
    password: Yup.string().required("Required"),
  });

  return (
    <ScrollView style={{ backgroundColor: '#ffffff' }}>
      <View style={styles.container}>
        <Formik
          initialValues={{ username: "", password: "" }}
          validationSchema={SignupSchema}
          onSubmit={(values,{resetForm}) => {
            authService
              .login(values.username, values.password)
              .then((data) => {
                setUser(data);
                const { token } = data;
                setToken(token);
                navigation.navigate('ApplyScreen');
                resetForm();
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
              <Text style={styles.formTitle}>Login to Your Account</Text>
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
              </View>
            </View>
          )}
        </Formik>
      </View>
    </ScrollView>
  );
});

export default ApplyAuth;

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
    marginTop: 100,
  },
  formTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#424242',
    marginBottom: 5,
    alignSelf: 'center'
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
