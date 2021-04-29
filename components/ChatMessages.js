import React from 'react';
import { View, Text, Button, StyleSheet, } from 'react-native';
import colors, { LightGrey, LightPurple, Purple } from '../assets/colors';
import Input from '../components/common/Input';



const ChatMessages = props => {

    const hardcodedUserId = 'HvkYPWaNeSU7tUk4jEEeeJlGyX72';
    const hours = props.chatmessage.created.getHours();
    const minutes = props.chatmessage.created.getMinutes();

    const userIdOfMessage = props.chatmessage.user.id;
    const isMe = hardcodedUserId === userIdOfMessage;

    let name;
    if (!isMe) {
        name = 'From' + props.chatmessage.user.name
    }
    return (
        <View style={styles.container}>
            <View style={styles.messageContainer}>
                <View style={[styles.messageView, isMe ? styles.messageViewFromMe : '']}>
                    <Text style={[styles.messageText, isMe ? styles.messageTextFromMe : '']}>
                    {props.chatmessage.message}
                    </Text>
                </View>
                <Text style={styles.underMessage}>{name}</Text>
            </View>
          <View>
              {hours}:{minutes}
          </View>
        </View>
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
        width: 100,
        padding: 10,
    },
    messageViewFromMe: {
        backgroundColor: Purple,
        flexDirection: 'row-reverse',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 1,
        width: 100,
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