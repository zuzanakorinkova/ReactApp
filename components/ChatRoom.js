import React from 'react';
import { View, Text, Button, StyleSheet,TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {Avatar} from 'react-native-elements';

const ChatRoom = props => {
    // chatroom = club name
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
            <View style={styles.club}>
                <Avatar rounded source={{uri:props.chatroom.image}} />   
                <View>
                    <Text style={styles.chatTitle}>{props.chatroom.name}</Text>
                    <Text style={styles.message} ellipsizeMode='tail' numberOfLines={1}>{lastMessage}</Text>
                </View>
            </View>
            <View style={styles.rightContainer}>
                <Text>🟣</Text>
                <Text style={styles.time}>{displayTime}</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    club: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    chatContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20,
    },
    chatTitle: {
        marginLeft: 15,
        fontSize: 15,
        fontWeight: 'bold',
    },
    message: {
        marginLeft: 15,
    },
    rightContainer: {
        alignItems: 'flex-end',
    },
    time: {
        color: 'grey',
    }
});

export default ChatRoom;