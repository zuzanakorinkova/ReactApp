import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ChatRoom from '../components/ChatRoom';
import { View, Text, Button, StyleSheet, FlatList, TextInput } from 'react-native';

import {createChatMessage} from '../store/actions/ChatActions';
import Input from '../components/common/Input';
import ChatMessages from '../components/ChatMessages'


const ChatMessagesScreen = props => {
    const dispatch = useDispatch();
    const { id } = props.route.params
    

    const [value, onInputText] = useState('Write Message');

    //const chatMessages = useSelector(state => state.chat.chatMessages)
    const chatroom = useSelector(state => state.chat.chatrooms).find(room => room.id == id)
    const chatMessages = chatroom.chatMessages
   // console.log('--')
    //console.log(chatMessages)
    

    const handleSend = () => {
        console.log("value " + value);
        dispatch(createChatMessage(value, id));
    };

    return (
        <View>
           
            <View>
                <FlatList data={chatMessages} renderItem={itemData => (
                    <ChatMessages chatmessage={itemData.item}></ChatMessages>
                )} />
            </View>
            <View>
                <TextInput
                    onChangeText={text => onInputText(text)}
                    value={value}
                />
                <Button title="Send" onPress={handleSend}></Button>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({

});

export default ChatMessagesScreen;