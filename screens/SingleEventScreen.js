import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DarkPurple, LightGrey, LightPurple, Purple, DarkGrey } from '../assets/colors';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, Image } from 'react-native';
import { Button } from 'react-native-elements';
import Clubs from '../components/Clubs';
import { useNavigation } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';
import {pushUser} from '../store/actions/ClubActions';
import { ScrollView } from 'react-native-gesture-handler';


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
    let thumbnail = ''
    const { id } = props.route.params
    const clubs = useSelector(state => state.club.clubs);
    let clubId = ''
    for(const key in clubs){
       if(clubs[key].events.find(event => event.id == id)) {
           clubId = clubs[key].id
           for(const key1 in clubs[key].events){
               thumbnail = clubs[key].events[key1].thumbnail
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
        <View>
            <ScrollView>
                <View>
                    <Image style={styles.image} source={{uri:thumbnail}} />
                </View>
                <View style={styles.event}>
                    <Text style={styles.title}>{props.route.params.name}</Text>
                    <View style={styles.containerTime}>
                        <Ionicons style={styles.icon} name="ios-time" size={15} color={DarkGrey}/>
                        <Text style={styles.time}>{startDate} ⋅ </Text>
                        <Text style={styles.time}>{fromTime} - </Text>
                        <Text style={styles.time}>{endDate} ⋅ </Text>
                        <Text style={styles.time}>{untilTime}</Text>
                    </View>
                    <View style={styles.containerTime}>
                        <Ionicons style={styles.icon} name="ios-location" size={15} color={DarkGrey}/>
                        <Text style={styles.location}>{location}</Text>
                    </View>
                    <View style={styles.containerClub}>
                        <Text style={styles.clubName}>{clubName}</Text>
                        <TouchableOpacity onPress={() =>  navigation.navigate('Chat')}><Ionicons style={styles.chatIcon} name={'ios-chatbubbles'} size={25} color={'white'} /></TouchableOpacity>
                    </View>
                    <View style={styles.containerUser}>
                        <Text style={styles.goingText}>Going ⋅ {userLength.length}</Text>
                        <TouchableOpacity style={loggedInUser.id == userId ? styles.btnPress : styles.button} onPress={handlePushUser}><Ionicons style={loggedInUser.id == userId ? styles.goingPress : styles.goingIcon} name="ios-checkbox-outline" size={20}/><Text style={loggedInUser.id == userId ? styles.btnPressText : styles.buttonText}>Going</Text></TouchableOpacity>
                    </View>
                </View>
                <View style={styles.containerAbout}>
                    <Text style={styles.about}>About</Text>
                    <Text>{description}</Text>
                </View>
            </ScrollView>
        </View>
    );
}
// TouchableOpacity leading to chat messages - by club id
// Button saying "GOING" to the event - for logged in user
const styles = StyleSheet.create({
event: {
    elevation:5,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    padding: 20,
    backgroundColor: '#fff', 
},
image: {
    height: 200,
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
    backgroundColor: Purple,
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
marginTop: 30,
backgroundColor: '#fff',
padding: 40,
elevation:5,
shadowColor: '#000',
shadowOpacity: 0.2,
},
about: {
    fontWeight: 'bold',
    fontSize: 18,
},
button: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Purple,
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 5,
    paddingBottom: 5,
    borderRadius: 5,
},
buttonText: {
    color: Purple,
    fontWeight: '700',
    fontSize: 16,
},
btnPress: {
    backgroundColor: Purple,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 5,
    paddingBottom: 5,
    borderRadius: 5,
},
btnPressText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
},
goingIcon: {
    color: Purple,
    paddingRight: 10,
},
goingPress: {
    color: 'white',
    paddingRight: 10,
}

});

export default SingleEventScreen;