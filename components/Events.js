import React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { LightGrey, LightPurple, DarkPurple } from '../assets/colors';
import Ionicons from '@expo/vector-icons/Ionicons';
import moment from 'moment';

const Events = props => {
   const navigation = useNavigation()
   let start = moment(props.event.startDate).format('MMM D • hh:mm');
   let end = moment(props.event.endDate).format('MMM D • hh:mm');
  
 return (
    <TouchableOpacity onPress={() => navigation.navigate('Single Event', {name: props.event.title, id: props.event.id})} style={styles.container}>
         <Image style={styles.image} source={{uri:props.event.thumbnail}} />
         <View style={styles.view}>
            <Text style={styles.title}>{props.event.title}</Text>
            <View style={styles.containerTime}>
            <Ionicons name="ios-time" size={20} color="#4f52a0"/>
               <Text style={styles.time}>{start} - {end}</Text>
            </View>
            <View style={styles.containerTime}>
            <Ionicons name="ios-location" size={20} color="#4f52a0"/>
            <Text style={styles.location}>{props.event.location}</Text>
            </View>
         </View>
    </TouchableOpacity>
 );
}

const styles = StyleSheet.create({
container: {
   margin: 20,
   backgroundColor: 'white',
   borderRadius:10,
   elevation:10,
   shadowColor: '#000',
   shadowOpacity: 0.2,
   shadowRadius: 5, 
},
image: {
width: "100%",
height: 70,
borderTopRightRadius: 10,
borderTopLeftRadius: 10,
},
view: {
   padding: 20,
  
},
title: {
color: DarkPurple,
fontSize: 22,
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