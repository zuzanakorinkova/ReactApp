import React from 'react';
import { View, Text, Button, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { LightGrey, LightPurple, Purple } from '../assets/colors';
import {UserState} from '../store/reducers/ChatReducers';
import Input from '../components/common/Input';



const ChatMessages = props => {

    const loggedInUserId = useSelector(state => state.user.loggedInUser.id)
    
    const hours = props.chatmessage.created.getHours();
    const minutes = props.chatmessage.created.getMinutes();

    const userIdOfMessage = props.chatmessage.user.loggedInUser.id;
    //console.log(userIdOfMessage)
    const isMe = loggedInUserId === userIdOfMessage; // const isMe = hardcodedUserId === userIdOfMessage
    //console.log(isMe)

    let name;
    if (!isMe) {
        name = 'From ' + props.chatmessage.user.loggedInUser.email
    }
    return (
        <ScrollView style={styles.container}>
            <View style={styles.messageContainer}>
                <View style={[styles.messageView, isMe ? styles.messageViewFromMe : '']}>
                    <Text style={[styles.messageText, isMe ? styles.messageTextFromMe : '']}>
                    {props.chatmessage.message}
                    </Text>
                </View>
                <Text style={styles.underMessage}>{name}</Text>
                <Text>{hours}:{minutes}</Text>  
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    messageContainer: {
        padding: 10,
        margin: 10,

    },
    messageView: {
        backgroundColor: LightGrey,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        borderBottomLeftRadius: 1,
        borderBottomRightRadius: 15,
        padding: 10,
    },
    messageViewFromMe: {
        backgroundColor: Purple,
        flexDirection: 'row-reverse',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 1,
        alignSelf: 'flex-end',
        padding: 10,
    },
    messageTextFromMe: {
        color: 'white',
    },
    messageText: {
        color: 'black',
    },
    underMessage: {
        color: 'grey',
        fontSize: 12,
    }


});

export default ChatMessages;