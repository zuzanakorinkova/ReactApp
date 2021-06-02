import React from 'react';
import { View, Text, Button, StyleSheet} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {TouchableOpacity} from 'react-native-gesture-handler';

const Clubs = props => {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <Text>Create event for:</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Create Event", {id: props.club.id})} >
                <View>
                    <Text style={styles.clubTitle}>{props.club.name}</Text>
                </View>
            </TouchableOpacity>
            <Text>Create post for:</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Create Post", {id: props.club.id})}>
                <View>
                    <Text style={styles.clubTitle}>{props.club.name}</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        padding: 20,
    },
    clubTitle: {
        fontSize: 15,
        fontWeight: 'bold',
        paddingTop: 10,
        paddingBottom: 10,
    },
});

export default Clubs;














//<TouchableOpacity onPress={() => navigation.navigate('Create Event',  {id: props.chatroom.id})}> 