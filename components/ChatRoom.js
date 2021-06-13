import React, {useState} from 'react';
import { View, Text, Button, StyleSheet,TouchableOpacity, Image} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {Avatar} from 'react-native-elements';
import moment from 'moment';
import { useSelector, useDispatch } from 'react-redux';
import {readMessage} from '../store/actions/ClubActions';

const ChatRoom = props => {
    // chatroom = club name
    const navigation = useNavigation();

    const lastPosition = props.chatroom.chatMessages.length - 1
    let lastMessage = '';
    let displayTime = '';
    let isNew = '';

    if (lastPosition > -1) {
        lastMessage = props.chatroom.chatMessages[props.chatroom.chatMessages.length - 1].message;
        const lastTime = props.chatroom.chatMessages[props.chatroom.chatMessages.length - 1].created;
        isNew = props.chatroom.chatMessages[props.chatroom.chatMessages.length - 1].isNew
        displayTime = moment(lastTime).format('LT')
    }
 
    //const [read, setRead] = useState(isNew)

    const dispatch = useDispatch()

    const handleNavigate = () => {
        navigation.navigate("ChatMessages", {id: props.chatroom.id})
    }

    // let chatRoom = {...props.chatroom};
    // let last = chatRoom.chatMessages[chatRoom.chatMessages.length - 1]
    // const [newMessage, setNewMessage] = useState(true)
    // console.log(last.isNew)
    // last.isNew = newMessage

    // const goToMessage = () => {
    //     handleNavigate()
         //setRead(false)
    //     setNewMessage(false)
    //     dispatch(readMessage(props.chatroom.id, last.id, last))
    // }
    return (
        <TouchableOpacity onPress={handleNavigate} style={styles.chatContainer}>
            <View style={styles.club}>
                <Avatar rounded source={{uri: props.chatroom.image}} />   
                <View>
                    <Text style={styles.chatTitle}>{props.chatroom.name}</Text>
                    <Text style={isNew ? styles.newMessage : styles.message} ellipsizeMode='tail' numberOfLines={1}>{lastMessage}</Text>
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
    newMessage: {
        marginLeft: 15,
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