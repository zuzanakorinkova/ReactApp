import React from 'react';
import { View, Text, Button, StyleSheet} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {TouchableOpacity} from 'react-native-gesture-handler';

const ChatRoom = props => {
    const navigation = useNavigation();
    return (
        <TouchableOpacity onPress={() => navigation.navigate("Create Event", {id: props.chatroom.id})} style={styles.chatContainer}>
            <View>
                <Text style={styles.chatTitle}>{props.chatroom.name}</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    chatContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20,
    },
    chatTitle: {
        fontSize: 15,
        fontWeight: 'bold',
    },
});

export default ChatRoom;














//<TouchableOpacity onPress={() => navigation.navigate('Create Event',  {id: props.chatroom.id})}> 