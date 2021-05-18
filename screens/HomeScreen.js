import React from 'react';
import ChatRoom from '../components/ChatRoom';
import Events from '../components/Events';
import { View, Text, Button, StyleSheet, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';

const HomeScreen = props => {
    const navigation = useNavigation();
    // select clubs id and pass it through Flatlist
    const allData = useSelector(state => state.club.clubs)
   //console.log(clubs)
   const clubs = []
   for (const key in allData){
      clubs.push(allData[key])
   }
  // console.log(clubs.id)


  // FETCH ALL EVENTS
    return (
        <View>
            <Button title="Add event" onPress={() => navigation.navigate('All Clubs')}/>
            <View>
            <View>
                <FlatList data={clubs} renderItem={itemData => (
                    <Events club={itemData.item}></Events>
                )}
                keyExtractor={item => item.id} />
            </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({

});

export default HomeScreen;