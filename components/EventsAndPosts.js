import React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, Image  } from 'react-native';
import { event } from 'react-native-reanimated';
import { LightGrey, Purple, DarkPurple } from '../assets/colors';
import { useNavigation } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';
import {Avatar} from 'react-native-elements';
import moment from 'moment'; 
import { renderNode } from 'react-native-elements/dist/helpers';

const EventsAndPosts = props => {
    const navigation = useNavigation()
 
   let postLoop = []
   for (const key in props.home.posts){
    const timestamp = props.home.posts[key].created
    let time = moment(timestamp || moment.now()).fromNow()
       postLoop.push(
        <View style={[styles.container,{padding: 15}]}>
        <View style={styles.blog}>
            <Ionicons name="ios-newspaper" size={20} color="#4f52a0"/>
            <Text style={styles.blogText}>Blog</Text>
        </View> 
        <View>
            <Text style={styles.title}>{props.home.posts[key].title}</Text>
            <Text>{props.home.posts[key].content}</Text>
            <View style={styles.timeContainer}>
                <Text style={styles.time}>{time}</Text>
                <TouchableOpacity style={{flexDirection: 'row'}}>
                    <Ionicons name="ios-heart-outline" size={20} color="#4f52a0"/>
                    <Text style={styles.likes}>1</Text>
                </TouchableOpacity>
            </View> 
            <View style={styles.clubContainer}>
                <Avatar rounded source={{uri:props.home.image}} /> 
                <Text style={styles.club}>{props.home.name}</Text>
            </View>
        </View>
        
    </View>
       )

   }


   let eventLoop = []
   for (const key in props.home.events){
    eventLoop.push(
        <TouchableOpacity onPress={() => navigation.navigate('Single Event', {name: props.home.events[key].title, id: props.home.events[key].id})} style={styles.container}>
        <Image style={styles.image} source={{uri:props.home.events[key].thumbnail}} />
        <View style={styles.view}>
           <Text style={styles.title}>{props.home.events[key].title}</Text>
           <View style={styles.containerTime}>
           <Ionicons name="ios-time" size={20} color="#4f52a0"/>
              <Text style={styles.time}>{props.home.events[key].startDate} </Text>
              <Text style={styles.time}>{props.home.events[key].fromTime} -</Text>
              <Text style={styles.time}>{props.home.events[key].untilTime}</Text>
           </View>
           <View style={styles.containerTime}>
           <Ionicons name="ios-location" size={20} color="#4f52a0"/>
           <Text style={styles.location}>{props.home.events[key].location}</Text>
           </View>
        </View>
       </TouchableOpacity>
    )

   // eventLocation = props.home.events[key].location
   }
 return (
    <View>
        <View>
            {eventLoop}
        </View>
       

      <View>
          {postLoop}
      </View>

    </View>
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
      blog: {
        flexDirection: 'row',
    },
    blogText: {
        paddingLeft: 10,
        textTransform: 'uppercase',
        color: Purple,
        fontWeight: 'bold',
    },
});

export default EventsAndPosts;