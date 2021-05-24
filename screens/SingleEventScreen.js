import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DarkPurple, LightGrey, LightPurple } from '../assets/colors';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-elements';
import Clubs from '../components/Clubs';
import { useNavigation } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';
import {pushUser} from '../store/actions/ClubActions';


const SingleEventScreen = props => {
    let clubName = ''
    let startDate = ''
    let endDate = ''
    let fromTime = ''
    let untilTime = ''
    let location = ''
    let userId = ''
    let userLength = ''
    let description = ''
    
    const { id } = props.route.params
    const clubs = useSelector(state => state.club.clubs);
    let clubId = ''
    for(const key in clubs){
       if(clubs[key].events.find(event => event.id == id)) {
           clubId = clubs[key].id
           for(const key1 in clubs[key].events){
               clubName = clubs[key].name
               startDate = clubs[key].events[key1].startDate
               endDate = clubs[key].events[key1].endDate
               fromTime = clubs[key].events[key1].fromTime
               untilTime = clubs[key].events[key1].untilTime
               location = clubs[key].events[key1].location
               description = clubs[key].events[key1].description
               userLength = clubs[key].events[key1].users
               for(const key2 in clubs[key].events[key1].users){
                   userId = clubs[key].events[key1].users[key2].id
               }
           }
       }
    }
    const dispatch = useDispatch()
    const loggedInUser = useSelector(state => state.user.loggedInUser)
    const handlePushUser = () => {
       if(!loggedInUser.id == userId) {
            dispatch(pushUser(loggedInUser,clubId, id))
       }else {
           console.log('user is already in event')
       }
        
    }

    const navigation = useNavigation();
 
    return (
        <View style={styles.container}>
          
            <Text style={styles.title}>{props.route.params.name}</Text>
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
                <Text style={styles.clubName}>{clubName}</Text>
                <TouchableOpacity onPress={() =>  navigation.navigate('Chat')}><Ionicons style={styles.chatIcon} name={'ios-chatbubbles'} size={25} color={'white'} /></TouchableOpacity>
            </View>
            <View style={styles.containerUser}>
                <Text style={styles.goingText}>Going ⋅ {userLength.length}</Text>
                <Button buttonStyle={{ borderColor: 'grey', padding: 10}} onPress={handlePushUser} type="outline" title="Going" icon={<Ionicons style={{paddingRight: 10,}} name="ios-checkbox-outline" size={25} color="#4f52a0"/>} />
            </View>
            <View style={styles.containerAbout}>
                <Text style={styles.about}>About</Text>
                <Text>{description}</Text>
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
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderRadius: 7,
    borderColor: LightGrey,
    padding: 10,
},
clubName: {
    color: DarkPurple,
    fontSize: 18,
    fontWeight: 'bold',
},
chatIcon: {
    backgroundColor: DarkPurple,
    padding: 7,
    borderRadius: 7,
},
containerUser: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
},
goingText: {
    fontWeight: 'bold',
    fontSize: 16,
},
containerAbout: {
marginTop: 20,
padding: 10,
},
about: {
    fontWeight: 'bold',
    fontSize: 18,
}
});

export default SingleEventScreen;