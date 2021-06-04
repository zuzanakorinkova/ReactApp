import React from 'react';
import { View, Text, Button, StyleSheet,  } from 'react-native';
import moment from 'moment'; // https://momentjs.com/
import { TouchableOpacity } from 'react-native-gesture-handler';
import Ionicons from '@expo/vector-icons/Ionicons';
import PostOrEventScreen from '../screens/PostOrEventScreen';
import { DarkPurple, Purple, LightGrey } from '../assets/colors';
import { useSelector, useDispatch } from 'react-redux';
import {Avatar} from 'react-native-elements';

const Posts = props => {


    const clubs = useSelector(state => state.club.clubs)
    let clubName = ''
    let clubImage = ''
    for(const key in clubs){
        for (const key1 in clubs[key].posts){
            if(clubs[key].posts[key1].id == props.post.id){
                clubName = clubs[key].name
                clubImage = clubs[key].image
            }
            // if this id == id of the current prop post -> display the club
        }
    }


    const timestamp = props.post.created
    let time = moment(timestamp || moment.now()).fromNow()


 return (
    <View style={styles.container}>
        <View style={styles.blog}>
            <Ionicons name="ios-newspaper" size={20} color="#4f52a0"/>
            <Text style={styles.blogText}>Blog</Text>
        </View> 
        <View>
            <Text style={styles.title}>{props.post.title}</Text>
            <Text>{props.post.content}</Text>
            <View style={styles.timeContainer}>
                <Text style={styles.time}>{time}</Text>
                <TouchableOpacity style={{flexDirection: 'row'}}>
                    <Ionicons name="ios-heart-outline" size={20} color="#4f52a0"/>
                    <Text style={styles.likes}>1</Text>
                </TouchableOpacity>
            </View> 
            <View style={styles.clubContainer}>
                <Avatar rounded source={{uri:clubImage}} /> 
                <Text style={styles.club}>{clubName}</Text>
            </View>
        </View>
        
    </View>
 );
}

const styles = StyleSheet.create({
container: {
    backgroundColor: 'white',
    margin: 20,
    borderRadius:10,
    elevation:10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5, 
    padding: 15,
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
title: {
    fontSize: 25,
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
time: {
    paddingTop: 10,
    color: 'grey',
    paddingBottom: 10,
},
likes: {
    paddingLeft: 2,
    color: Purple,
    fontWeight: 'bold',
}

 
});

export default Posts;