import React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity  } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { LightGrey, LightPurple, DarkPurple } from '../assets/colors';
import Ionicons from '@expo/vector-icons/Ionicons';

const Events = props => {
   const navigation = useNavigation()
  
 return (
    <TouchableOpacity onPress={() => navigation.navigate('Single Event', {name: props.event.title, id: props.event.id})} style={styles.container}>
         <Text style={styles.title}>{props.event.title}</Text>
         <View style={styles.containerTime}>
         <Ionicons name="ios-time" size={20} color="#4f52a0"/>
            <Text style={styles.time}>{props.event.startDate} </Text>
            <Text style={styles.time}>{props.event.fromTime} -</Text>
            <Text style={styles.time}>{props.event.untilTime}</Text>
         </View>
         <View style={styles.containerTime}>
         <Ionicons name="ios-location" size={20} color="#4f52a0"/>
         <Text style={styles.location}>{props.event.location}</Text>
         </View>
         
    </TouchableOpacity>
 );
}

const styles = StyleSheet.create({
container: {
   padding: 20,
   margin: 20,
   backgroundColor: 'white',
   borderRadius:10,
   elevation:10,
   shadowColor: '#000',
   shadowOpacity: 0.2,
   shadowRadius: 5, 
},
title: {
color: DarkPurple,
fontSize: 18,
fontWeight: 'bold',
},
time: {
   marginLeft: 10,
   color: 'grey',
},
location: {
   marginLeft: 10,
   color: 'black',
},
containerTime: {
    flexDirection: 'row',
    padding: 2,
 },
});

export default Events;