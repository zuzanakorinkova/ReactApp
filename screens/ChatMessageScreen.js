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
    console.log(id);

    const [value, onInputText] = useState('WriteMessage');

    const chatMessages = useSelector(state => state.chat.chatrooms).find(room => room.id === id).chatMessages

    const handleSend = () => {
        console.log("value " + value);
        dispatch(createChatMessage(value, id));
    };

    return (
        <View>
            <View>
                <FlatList data={chatMessages} renderItem={itemData => (
                    <ChatMessage chatmessage={itemData.item}></ChatMessage>
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