import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ChatRoom from '../components/ChatRoom';
import { DarkPurple, LightGrey, LightPurple, Purple } from '../assets/colors';
import { View, Text, Button, StyleSheet, FlatList, TextInput, ScrollView } from 'react-native';

import {createChatMessage} from '../store/actions/ClubActions';
import Input from '../components/common/Input';
import ChatMessages from '../components/ChatMessages'


const ChatMessagesScreen = props => {
    const dispatch = useDispatch();
    const { id } = props.route.params
    

    const [value, onInputText] = useState('Write Message');

    //const chatMessages = useSelector(state => state.chat.chatMessages)
    const chatroom = useSelector(state => state.club.clubs).find(chat => chat.id == id)
    const chatMessages = chatroom.chatMessages
   // console.log('--')
    //console.log(chatMessages)
    

    const handleSend = () => {
        console.log("value " + value);
        dispatch(createChatMessage(value, id));
    };

    return (
        <View style={ styles.container}>
            <View>
                <FlatList data={chatMessages} renderItem={itemData => (
                    <ChatMessages chatmessage={itemData.item}></ChatMessages>
                )} />
            </View>

            <View style={styles.writeMessage}>
                <TextInput
                    style={styles.input}
                    onChangeText={text => onInputText(text)}
                    value={value}
                />
                <Button color={DarkPurple} title="Send" onPress={handleSend}></Button>
            </View>
 
        </View>
    );
}

const styles = StyleSheet.create({
container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: 10,
},
writeMessage: {
    borderTopColor: LightGrey,
    borderTopWidth: 1,
    paddingTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
},
input: {
    backgroundColor: LightGrey,
    width: '70%',
    padding: 6,
    color: 'grey',
},
});

export default ChatMessagesScreen;