import React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity  } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

const Events = props => {
   const navigation = useNavigation()
   const id = props.club.id
   //console.log(id)
   const test = useSelector(state => state.club.clubs).find(clubId => clubId.id == id)
   const event = test.events
  //console.log(event)
  // info: start and end date, location
   const titleArray = []
   const dateArray = []
   const fromArray = []
   const untilArray = []
   const locationArray = []
   const ids = []
   for(const key in event){
     // console.log(event[key].title)
      titleArray.push(event[key].title) 
      dateArray.push(event[key].date) 
      fromArray.push(event[key].fromTime)
      untilArray.push(event[key].untilTime)
      locationArray.push(event[key].location)
      ids.push(event[key].id)
   }
   let title = titleArray.join('\n')
   let date = dateArray.join('\n')
   let from = fromArray.join('\n')
   let until = untilArray.join('\n')
   let location = locationArray.join('\n')
   let eventId = ids.join('\n')
 return (
    <TouchableOpacity onPress={() => navigation.navigate('Single Event', {id: eventId})} style={styles.container}>
         <Text>{title}</Text>
         <View style={styles.containerTime}>
            <Text>{date} </Text>
            <Text>{from} - </Text>
            <Text>{until}</Text>
         </View>
         <Text>{location}</Text>
         
    </TouchableOpacity>
 );
}

const styles = StyleSheet.create({
container: {
   padding: 20,
   margin: 15,
   borderWidth: 1,
   borderRadius: 10,
},
containerTime: {
    flexDirection: 'row',
 }
});

export default Events;