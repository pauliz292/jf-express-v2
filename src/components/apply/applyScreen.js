import React from "react";
import { View, StyleSheet, Image, Text } from "react-native";
import { Button, Input } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
//import Toast from 'react-native-toast-message'
import { useNavigation } from '@react-navigation/native'
//import * as authService from '../../_api/_services/authService'
import { Formik } from "formik";
import * as Yup from "yup";
import { NavigationContainer } from "@react-navigation/native";
//import { observer } from 'mobx-react-lite'
//import { useStore } from "../../_api/_mobx/stores/store";

const ApplyScreen = () => {
  const navigation = useNavigation();
  // const { commonStore } = useStore();
  //const { setToken } = commonStore;
  const ApplySchema = Yup.object().shape({
    licenseNumber: Yup.string().required("Required"),
    plateNumber: Yup.string().required("Required"),
  });

  return (
    <View style={styles.container}>
      <Formik
        initialValues={{ licenseNumber: "", plateNumber: "" }}
        validationSchema={ApplySchema}
        onSubmit={(values) => {
          console.log(values)
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
            <Text style={styles.formTitle}>Apply as Driver</Text>
            <View style={styles.form}>
              <Input
                placeholder="License number"
                onChangeText={handleChange("licenseNumber")}
                onBlur={handleBlur("licenseNumber")}
                value={values.licenseNumber}
                leftIcon={
                  <Icon name="drivers-license" size={24} color="#03A9F4" />
                }
              />
              {errors.licenseNumber && touched.licenseNumber && (
                <Text style={styles.errorText}>{errors.licenseNumber}</Text>
              )}
              <Input
                placeholder="Motor plate number"
                onChangeText={handleChange("plateNumber")}
                onBlur={handleBlur("plateNumber")}
                value={values.plateNumber}
                leftIcon={<Icon name="barcode" size={24} color="#03A9F4" />}
                secureTextEntry={true}
              />
              {errors.plateNumber && touched.plateNumber && (
                <Text style={styles.errorText}>{errors.plateNumber}</Text>
              )}
              <View style={styles.buttonContainer}>
                <Button title="Apply" onPress={() => handleSubmit()} />
              </View>
              <View style={styles.buttonContainer}>
                <Button 
                  title="Cancel" 
                  buttonStyle={{ backgroundColor: '#E53935' }}
                  onPress={() => navigation.navigate('ApplyAuth')} 
                />
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
    padding: 5,
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
