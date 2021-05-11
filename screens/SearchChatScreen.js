import React, {useState} from 'react';
import Suggestions from '../components/Suggestions';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { useSelector, useDispatch } from 'react-redux';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { Button } from 'react-native-elements';

const SearchChatScreen = props => {
const chatrooms = useSelector(state => state.chat.chatrooms);
const navigation = useNavigation()
const [search, setSearch] = useState('');
 return (
    <View>
       <View>
        <SearchBar
            placeholder="Type Here..."
            round={true}
            onChangeText={setSearch}
            value={search}
            lightTheme={true}
            containerStyle={{backgroundColor: 'white'}}
        />
       </View>
       <View>
       <FlatList
                data={chatrooms}
                renderItem={itemData => (
                    <Suggestions chatroom={itemData.item} />
                )}
                keyExtractor={item => item.id}
            />
       </View>
       <View>
       <Button onPress={onPress = () =>  navigation.navigate('New ChatRoom')} type="clear"
       title="Add new chatroom"
       icon={
        <Ionicons
            name="ios-add-outline"
            size={25}
            color="#4f52a0"/>}
            />
       </View>
       
    </View>
 );
}

const styles = StyleSheet.create({
 
});

export default SearchChatScreen;