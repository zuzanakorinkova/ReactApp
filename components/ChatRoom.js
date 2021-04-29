import React from 'react';
import { View, Text, Button, StyleSheet} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {TouchableOpacity} from 'react-native-gesture-handler';

const ChatRoom = props => {
    const navigation = useNavigation();

    const lastPosition = props.chatroom.chatMessages.length - 1
    let lastMessage = '';
    let displayTime = '';
    if (lastPosition > -1) {
        lastMessage = props.chatroom.chatMessages[props.chatroom.chatMessages.length - 1].message;
        const lastTime = props.chatroom.chatMessages[props.chatroom.chatMessages.length - 1].created;

        displayTime = lastTime.getHours() + ":" + lastTime.getMinutes()
    }
    return (
        <TouchableOpacity onPress={() => navigation.navigate("ChatMessages", {id: props.chatroom.id})} style={styles.chatContainer}>
            <View>
                <Text style={styles.chatTitle}>{props.chatroom.name}</Text>
                <Text ellipsizeMode='tail' numberOfLines={1}>{lastMessage}</Text>
            </View>
            <View style={styles.rightContainer}>
                <Text>🟣</Text>
                <Text style={styles.time}>{displayTime}</Text>
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
    rightContainer: {
        alignItems: 'flex-end',
    },
    time: {
        color: 'grey',
    }
});

export default ChatRoom;