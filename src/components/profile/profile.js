import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { Button, Avatar, ListItem, Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { observer } from "mobx-react-lite";
import { useStore } from "../../_api/_mobx/stores/store";

const ProfileScreen = observer(() => {
  const navigation = useNavigation();

  const { profileStore, commonStore } = useStore();
  // const { profile } = profileStore;
  const { user } = commonStore;

  const ProfileDetails = () => {
    return(
      <View style={styles.container}>
        <Text style={styles.title}>
            {user.firstName} {user.lastName}
        </Text>
        <View style={styles.profile}>
          {user.profilePicture !== "" ?
            <Avatar
              rounded
              size="xlarge"
              source={{
                uri: user.profilePicture,
              }}
            /> : null
          }
        </View>
        <View style={styles.profileDetails}>
          <ListItem bottomDivider>
            <ListItem.Content>
              <ListItem.Title>
                Email: {user.email}
              </ListItem.Title>
              <ListItem.Subtitle>
                Contact: {user ? <Text>{user.contact}</Text> : " "}
              </ListItem.Subtitle>
              <View style={styles.buttonContainer}>
                <Button
                  icon={<Icon name="edit" size={18} color="white" />}
                  buttonStyle={{ marginRight: 10 }}
                  onPress={() => navigation.navigate("EditProfileScreen")}
                />
                <Button
                  icon={<Icon name="delete" size={18} color="white" />}
                  buttonStyle={{ backgroundColor: "#E53935" }}
                />
              </View>
            </ListItem.Content>
          </ListItem>
        </View>
      </View>
    );
  }

  const DefaultProfile = () => {
    return(
      <View style={styles.container}>
        <Text style={{ fontSize: 18, color: "#424242" }}>Please login to your account.</Text>
      </View>
    );
  }

  return (
    <>
      {user ?
        <ProfileDetails /> : <DefaultProfile />
      }
    </>
  );
  
});

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
  },
  profile: {
    marginTop: 15,
  },
  profileDetails: {
    marginTop: 10,
    width: "100%",
  },
  buttonContainer: {
    marginTop: 10,
    flexDirection: "row",
    padding: 5,
  },
});
