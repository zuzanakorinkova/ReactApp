import React from 'react';
import ChatRoom from '../components/ChatRoom';
import { useSelector, useDispatch } from 'react-redux';
import { DarkPurple, Purple } from '../assets/colors';
import { View, Text, Button, Image, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';

const ChatScreen = props => {
    const dispatch = useDispatch()

    const chatrooms = useSelector(state => state.chat.chatrooms);
    const userNotifications = useSelector(state => state.user.loggedInUser.chatNotification)
   
    const navigation = useNavigation();

    return (
        <View>
             <View style={styles.notificationContainer}>
                <Text style={styles.notificationText}>Enable Notifications to stay on the loop</Text>
               <TouchableOpacity onPress={onPress = () =>  console.log(userNotifications)}><Ionicons name={'ios-notifications'} size={25} color={'white'} /></TouchableOpacity>
            </View>
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
    notificationContainer: {
        flexDirection: 'row',
        backgroundColor: DarkPurple,
        padding: 10,
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    notificationText: {
        color: 'white',
    }
});

export default ChatScreen;