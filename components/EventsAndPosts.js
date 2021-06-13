import React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, Image  } from 'react-native';
import { event } from 'react-native-reanimated';
import { LightGrey, Purple, DarkPurple } from '../assets/colors';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import Ionicons from '@expo/vector-icons/Ionicons';
import {Avatar} from 'react-native-elements';
import moment from 'moment'; 
import {likePost} from '../store/actions/ClubActions';


const EventsAndPosts = props => {
    const navigation = useNavigation()
 
    const dispatch = useDispatch()
    const loggedInUser = useSelector(state => state.user.loggedInUser)

    const handleLike = () => {
        if(!loggedInUser.id == likeId) {
            console.log('like')
             dispatch(likePost(loggedInUser,homeId, postId))
        }else {
            console.log('user already liked this')
        }
         
     }
   let postLoop = []
   let postId = ''
   let likeId = ''
   let homeId = ''
   for (const key in props.home.posts){
       homeId = props.home.id
    for(const key1 in props.home.posts[key].likes){
        likeId = props.home.posts[key].likes[key1].id
    }
    postId = props.home.posts[key].id
    const timestamp = props.home.posts[key].created
    let time = moment(timestamp || moment.now()).fromNow()
    
       postLoop.push(
        <TouchableOpacity style={[styles.container,{padding: 15}]} 
        onPress={() => navigation.navigate('Single Post', 
        {name: props.home.posts[key].title, id: props.home.posts[key].id})}>
            
        <View style={styles.blog}>
            <Ionicons name="ios-newspaper" size={20} color="#4f52a0"/>
            <Text style={styles.blogText}>Blog</Text>
        </View> 
        <View>
            <Text style={styles.title}>{props.home.posts[key].title}</Text>
            <Text>{props.home.posts[key].content}</Text>
            <View style={styles.timeContainer}>
                <Text style={styles.postTime}>{time}</Text>
                <TouchableOpacity onPress={handleLike} style={{flexDirection: 'row'}}>
                    <Ionicons name={loggedInUser.id == likeId ? 'ios-heart' : "ios-heart-outline"} size={20} color="#4f52a0"/>
                    <Text style={styles.likes}>{props.home.posts[key].likes.length}</Text>
                </TouchableOpacity>
            </View> 
            <View style={styles.clubContainer}>
                <Avatar rounded source={{uri:props.home.image}} /> 
                <Text style={styles.club}>{props.home.name}</Text>
            </View>
        </View>
        
    </TouchableOpacity>
       )}
  
   let eventLoop = []
   for (const key in props.home.events){

    let start = moment(props.home.events[key].startDate).format('MMM D • LT');
    let end = moment(props.home.events[key].endDate).format('MMM D • LT');
    eventLoop.push(
        <TouchableOpacity onPress={() => navigation.navigate('Single Event', {name: props.home.events[key].title, id: props.home.events[key].id})} style={styles.container}>
        <Image style={styles.image} source={{uri:props.home.events[key].thumbnail}} />
        <View style={styles.view}>
           <Text style={styles.title}>{props.home.events[key].title}</Text>
           <View style={styles.containerTime}>
           <Ionicons name="ios-time" size={20} color="#4f52a0"/>
              <Text style={styles.time}>{start} - {end}</Text>
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
   const array = postLoop.concat(eventLoop)
 return (
    <View>

       <View>
        {array}
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
      blog: {
        flexDirection: 'row',
    },
    blogText: {
        paddingLeft: 10,
        textTransform: 'uppercase',
        color: Purple,
        fontWeight: 'bold',
    },
    timeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderColor: LightGrey,
    },
    clubContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5,
    },
    club: {
        fontWeight: 'bold',
        marginLeft: 10,
        textTransform: 'uppercase',
    },
    likes: {
        paddingLeft: 2,
        color: Purple,
        fontWeight: 'bold',
    },
    postTime: {
        paddingTop: 10,
        color: 'grey',
        paddingBottom: 10,
    }
});

export default EventsAndPosts;