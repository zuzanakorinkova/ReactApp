import React from 'react';
import { View, Text, Button, StyleSheet,  } from 'react-native';
import moment from 'moment'; // https://momentjs.com/
import { TouchableOpacity } from 'react-native-gesture-handler';
import Ionicons from '@expo/vector-icons/Ionicons';
import PostOrEventScreen from '../screens/PostOrEventScreen';
import { DarkPurple, Purple, LightGrey } from '../assets/colors';
import { useSelector, useDispatch } from 'react-redux';

const Posts = props => {

    const clubs = useSelector(state => state.club.clubs)

    for(const key in clubs){
        console.log(clubs[key].posts)
        for (const key1 in clubs[key].posts){
            console.log(clubs[key].posts[key1].id) 
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
    padding: 10,
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