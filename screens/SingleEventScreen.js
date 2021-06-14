import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DarkPurple, LightGrey, LightPurple, Purple, DarkGrey } from '../assets/colors';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, Image } from 'react-native';
import { Button } from 'react-native-elements';
import Clubs from '../components/Clubs';
import { useNavigation } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';
import {userGoing, userNotGoing} from '../store/actions/ClubActions';
import { ScrollView } from 'react-native-gesture-handler';
import {Avatar} from 'react-native-elements';
import moment from 'moment';


const SingleEventScreen = props => {
    let clubName = ''
    let clubAvatar = ''
    let startDate = ''
    let endDate = ''
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
               clubAvatar = clubs[key].image
               startDate = moment(clubs[key].events[key1].startDate).format('MMM DD • LT')
               endDate = moment(clubs[key].events[key1].endDate).format('MMM DD • LT')
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

    const handleUserGoing = () => {
       // if (loggedInUser.id == userId){
            dispatch(userGoing(loggedInUser, clubId, id))
       // }
      
        
    }

    const handleNotGoing = () => {
        dispatch(userNotGoing(loggedInUser, clubId, id))
    }
    

    const navigation = useNavigation();
 
    return (
        <View>
            <ScrollView>
                <View>
                <Image style={styles.image} source={require("../assets/images/events.jpg")}/>
                </View>
                <View style={styles.event}>
                    <Text style={styles.title}>{props.route.params.name}</Text>
                    <View style={styles.containerTime}>
                        <Ionicons style={styles.icon} name="ios-time" size={15} color={DarkGrey}/>
                        <Text style={styles.time}>{startDate} - {endDate}</Text>
                    </View>
                    <View style={styles.containerTime}>
                        <Ionicons style={styles.icon} name="ios-location" size={15} color={DarkGrey}/>
                        <Text style={styles.location}>{location}</Text>
                    </View>
                    <View style={styles.containerClub}>
                        <View style={styles.club}>
                            <Avatar rounded source={{uri: clubAvatar}} />
                            <Text style={styles.clubName}>{clubName}</Text>
                        </View>
                        <TouchableOpacity onPress={() =>  navigation.navigate('Chat')}><Ionicons style={styles.chatIcon} name={'ios-chatbubbles'} size={25} color={'white'} /></TouchableOpacity>
                    </View>
                    <View style={styles.containerUser}>
                        <Text style={styles.goingText}>Going ⋅ {userLength.length}</Text>
                        <TouchableOpacity disabled={loggedInUser.id == userId ? true : false} style={!loggedInUser.id == userId ? styles.button : styles.btnPress} onPress={handleUserGoing}><Ionicons style={!loggedInUser.id == userId ? styles.goingIcon : styles.goingPress} name="ios-checkbox-outline" size={20}/><Text style={!loggedInUser.id == userId ? styles.buttonText : styles.btnPressText}>Going</Text></TouchableOpacity>
                        <TouchableOpacity onPress={handleNotGoing} style={!loggedInUser.id == userId ? {display: 'none'} : {display: 'flex'}} ><Ionicons style={styles.chatIcon} name={'ios-close-outline'} size={20} color={'white'} /></TouchableOpacity>
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
    width: '100%',
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
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
},
club: {
    flexDirection: 'row',
    alignItems: 'center',
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