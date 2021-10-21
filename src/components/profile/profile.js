import React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { Button, Avatar, ListItem, Icon } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'

const ProfileScreen = () => {
    const navigation = useNavigation();

    return(
        <View style={styles.container}>
            <Text style={styles.title}>Paulo Rodriguez</Text>
            <View style={styles.profile}>
                <Avatar
                    rounded
                    size='xlarge'
                    source={{
                        uri:
                        'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
                    }}
                />
            </View>
            <View style={styles.profileDetails}>
            <ListItem bottomDivider>
                <ListItem.Content>
                    <ListItem.Title>Email: test@test.com</ListItem.Title>
                    <ListItem.Subtitle>Contact: 555-6156</ListItem.Subtitle>
                    <View style={styles.buttonContainer}>
                        <Button 
                            icon={
                                <Icon
                                    name="edit"
                                    size={18}
                                    color="white"
                                />
                            }
                            buttonStyle={{ marginRight: 10 }}
                            onPress={() => navigation.navigate('EditProfileScreen')}
                        />
                        <Button 
                            icon={
                                <Icon
                                    name="delete"
                                    size={18}
                                    color="white"
                                />
                            }
                            buttonStyle={{ backgroundColor: '#E53935' }}
                        />
                    </View>
                </ListItem.Content>
            </ListItem>
            </View>
        </View>
    );
}

export default ProfileScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
    },
    profile: {
        marginTop: 15,
    },
    profileDetails: {
        marginTop: 10,
        width: '100%'
    },
    buttonContainer: {
        marginTop: 10,
        flexDirection: 'row',
        padding: 5
    }
});