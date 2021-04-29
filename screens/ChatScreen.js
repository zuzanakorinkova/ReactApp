import React from 'react';
import ChatRoom from '../components/ChatRoom';
import { useSelector, useDispatch } from 'react-redux';
import { DarkPurple, Purple } from '../assets/colors';
import { View, Text, Button, Image, StyleSheet, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ChatScreen = props => {
    const dispatch = useDispatch()

    const chatrooms = useSelector(state => state.chat.chatrooms);

    //Flatlist
    const navigation = useNavigation();

    return (
        <View>
            <View>
            <Button
                title="Create new Chatroom"
                onPress={() => navigation.navigate("New ChatRoom")}
            />
            </View>
            <FlatList
                data={chatrooms}
                renderItem={itemData => (
                    <ChatRoom chatroom={itemData.item} />
                )}
                keyExtractor={item => item.id}
            />
        </View>
    );
}

const styles = StyleSheet.create({

});

export default ChatScreen;