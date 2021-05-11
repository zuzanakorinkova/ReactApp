import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createChatroom } from '../store/actions/ChatActions';
import Input from '../components/common/Input';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const NewChatRoom = props => {
    const navigation = useNavigation()
    const dispatch = useDispatch()
    const [chatroomName, setChatroomName] = useState('')
    const [chatroomNameValid, setChatroomNameValid] = useState(false)

    const handleSave = () => {
        dispatch(createChatroom(chatroomName))
        navigation.navigate("Chat")
    }

    return (
        <View>
            <Text>Create New chatroom</Text>
            <View>
                <Input
                    label="Chatroom name"
                    error="Please fill out the Chatroom name"
                    text={chatroomName}
                    nameValid={chatroomNameValid}
                    onValid={textValid => setChatroomNameValid(textValid)}
                    setContent={content => setChatroomName(content)}
                />
                <Button title="Save" onPress={handleSave} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({

});

export default NewChatRoom;