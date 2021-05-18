import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DarkPurple, LightGrey, LightPurple } from '../assets/colors';
import { View, Text, Button, StyleSheet, FlatList, TextInput, TouchableOpacity } from 'react-native';

import Clubs from '../components/Clubs';
import { useNavigation } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';


const SingleEventScreen = props => {

    let title = ''
    let startDate = ''
    let endDate = ''
    let fromTime = ''
    let untilTime = ''
    let location = ''
    const { id } = props.route.params
    const clubs = useSelector(state => state.club.clubs);
    for(const key in clubs){
       if(clubs[key].events.find(event => event.id == id)) {
           for(const key1 in clubs[key].events){
               title = clubs[key].events[key1].title
               startDate = clubs[key].events[key1].startDate
               endDate = clubs[key].events[key1].endDate
               fromTime = clubs[key].events[key1].fromTime
               untilTime = clubs[key].events[key1].untilTime
               location = clubs[key].events[key1].location
           }
       }
    }

    const dispatch = useDispatch()

    const navigation = useNavigation();
 
    return (
        <View style={styles.container}>
          
            <Text style={styles.title}>{title}</Text>
            <View style={styles.containerTime}>
                <Ionicons style={styles.icon} name="ios-time" size={15} color="#4f52a0"/>
                <Text style={styles.time}>{startDate} ⋅ </Text>
                <Text style={styles.time}>{fromTime} - </Text>
                <Text style={styles.time}>{endDate} ⋅ </Text>
                <Text style={styles.time}>{untilTime}</Text>
            </View>
            <View style={styles.containerTime}>
                <Ionicons style={styles.icon} name="ios-location" size={15} color="#4f52a0"/>
                <Text style={styles.location}>{location}</Text>
            </View>
            <View style={styles.containerClub}>
                <Text>Name of the club</Text>
                <TouchableOpacity onPress={() =>  navigation.navigate('Chat')}><Ionicons style={styles.chatIcon} name={'ios-chatbubbles'} size={25} color={'white'} /></TouchableOpacity>
            </View>
        </View>
    );
}
// TouchableOpacity leading to chat messages - by club id
// Button saying "GOING" to the event - for logged in user
const styles = StyleSheet.create({
container: {
    padding: 20,
},
title: {
    fontSize: 23,
    fontWeight: 'bold',
    paddingBottom: 10,
},
containerTime: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 10,
},
icon: {
    paddingRight: 10,
},
time: {
    fontSize: 17,
    fontWeight: 'bold',
},
location: {
    fontSize: 17,
},
containerClub: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderRadius: 7,
    borderColor: LightGrey,
    padding: 10,
},
chatIcon: {
    backgroundColor: LightPurple,
    padding: 7,
    borderRadius: 7,
}
});

export default SingleEventScreen;