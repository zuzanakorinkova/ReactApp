import React from 'react';
import { View, Text, Button, StyleSheet, } from 'react-native';
import { DarkPurple, Purple } from '../assets/colors';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

const ProfileScreen = props => {
    const navigation = useNavigation()
    const userInfo = useSelector(state => state.user.loggedInUser)
    console.log("Profile name: " + userInfo.name);

    return (
        <View>
            <View>
                <Text style={styles.text}>{userInfo.name}</Text>
                <Text style={styles.text}>{userInfo.email}</Text>
            </View>
            <Button title="Edit profile" onPress={() => navigation.navigate("Edit Profile")}></Button>
        </View>
    );
}

const styles = StyleSheet.create({
    text: {
        color: DarkPurple,
    }
});

export default ProfileScreen;