import React from "react";
import { View, StyleSheet, Image, Text } from "react-native";
import { Button, Input } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
//import Toast from 'react-native-toast-message'
//import { useNavigation } from '@react-navigation/native'
//import * as authService from '../../_api/_services/authService'
import { Formik } from "formik";
import * as Yup from "yup";
//import { observer } from 'mobx-react-lite'
//import { useStore } from "../../_api/_mobx/stores/store";

const ApplyScreen = () => {
  // const navigation = useNavigation();
  // const { commonStore } = useStore();
  //const { setToken } = commonStore;
  const ApplySchema = Yup.object().shape({
    licenseNumber: Yup.string().required("Required"),
    plateNumber: Yup.string().required("Required"),
  });

  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require("../../../assets/splash.png")}
      />
      <Formik
        initialValues={{ licenseNumber: "", plateNumber: "" }}
        validationSchema={ApplySchema}
        onSubmit={(values) => {}}
      >
        {({
          //handleChange,
          //handleBlur,
          handleSubmit,
          //values,
          errors,
          touched,
        }) => (
          <View style={styles.formContainer}>
            <View style={styles.form}>
              <Input
                placeholder="License number"
                leftIcon={
                  <Icon name="drivers-license" size={24} color="#03A9F4" />
                }
              />
              {errors.licenseNumber && touched.licenseNumber && (
                <Text style={styles.errorText}>{errors.licenseNumber}</Text>
              )}
              <Input
                placeholder="Motor plate number"
                leftIcon={<Icon name="barcode" size={24} color="#03A9F4" />}
                secureTextEntry={true}
              />
              {errors.plateNumber && touched.plateNumber && (
                <Text style={styles.errorText}>{errors.plateNumber}</Text>
              )}
              <View style={styles.buttonContainer}>
                <Button title="Apply" onPress={() => handleSubmit()} />
              </View>
            </View>
          </View>
        )}
      </Formik>
    </View>
  );
};

export default ApplyScreen;

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
