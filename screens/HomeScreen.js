import React from 'react';
import ChatRoom from '../components/ChatRoom';
import Events from '../components/Events';
import { View, Text, Button, StyleSheet, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LightGrey, LightPurple, DarkPurple } from '../assets/colors';
import { useSelector, useDispatch } from 'react-redux';


const HomeScreen = props => {
    const navigation = useNavigation();
    // select clubs id and pass it through Flatlist
    const allData = useSelector(state => state.club.clubs)

   const clubs = []
   const events = []
   for (const key in allData){
      clubs.push(allData[key])
      for (const key1 in allData[key].events){
          events.push(allData[key].events[key1])
      }
   }
  // console.log(clubs.id)


  // FETCH ALL EVENTS
    return (
        <View style={styles.container}>
            <View>
            <View>
                <FlatList data={events} renderItem={itemData => (
                    <Events event={itemData.item}></Events>
                )}
                keyExtractor={item => item.id} />
            </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
container: {
    backgroundColor: "#f2f2f2",
    height: '100%',
}
});

export default HomeScreen;