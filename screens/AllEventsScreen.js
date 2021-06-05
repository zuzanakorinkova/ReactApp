import React from 'react';
import { View, Text, Button, StyleSheet, FlatList  } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Events from '../components/Events';

const AllEventsScreen = props => {
    const data = useSelector(state => state.club.clubs);

    const clubs = []
    const events = []
    for ( const key in data) {
        clubs.push(data[key])
        for (const key1 in data[key].events){
            events.push(data[key].events[key1])
        }
    }
 return ( 
     <View>
          <View>
            <FlatList data={events} renderItem={itemData => (
                    <Events event={itemData.item} />
                )}
                keyExtractor={item => item.id} />
        </View>
     </View>
 
 );
}

const styles = StyleSheet.create({
 
});

export default AllEventsScreen;