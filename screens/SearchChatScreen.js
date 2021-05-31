import React, {useState, useEffect} from 'react';
import Suggestions from '../components/Suggestions';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { useSelector, useDispatch } from 'react-redux';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { Button } from 'react-native-elements';
import SearchInput from '../components/common/SearchInput';

const SearchChatScreen = props => {
const clubs = useSelector(state => state.club.clubs);
//console.log('====')

const navigation = useNavigation()
const [club, setClub] = useState(null)

useEffect(() => {
    (() => {
    setClub(clubs)
    })();
}, [])



const handleSearch = (text) => {
     const search = clubs.find(c => c.name).includes(text)
     //console.log(searchClubs)
    setClub(search)
}

 return (
    <View style={styles.container}>
       <View>
        <SearchInput icon="ios-search" placeholder="Search" onChangeText={(text) => handleSearch(text)}/>
        {/* <SearchBar
            placeholder="Type Here..."
            round={true}
            onChangeText={setSearch}
            value={search}
            lightTheme={true}
            containerStyle={{backgroundColor: 'white'}}
        /> */}
       </View>
       <View>
       <FlatList
                data={clubs}
                renderItem={itemData => (
                    <Suggestions club={itemData.item} />
                )}
                keyExtractor={item => item.id}
            />
       </View>
       <View>
       <Button onPress={() =>  navigation.navigate('New Club')} type="clear"
       title="Add new club"
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
 container: {
     backgroundColor: '#fff',
     elevation:5,
    shadowColor: '#000',
    shadowOpacity: 0.2,
 }
});

export default SearchChatScreen;