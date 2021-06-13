import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import moment from 'moment'; // https://momentjs.com/
import { TouchableOpacity } from 'react-native-gesture-handler';
import Ionicons from '@expo/vector-icons/Ionicons';
import PostOrEventScreen from '../screens/PostOrEventScreen';
import { DarkPurple, Purple, LightGrey } from '../assets/colors';
import { useSelector, useDispatch } from 'react-redux';
import {Avatar} from 'react-native-elements';
import {likePost} from '../store/actions/ClubActions';
import { useNavigation } from '@react-navigation/native';

const Posts = props => {
    const navigation = useNavigation()

    const clubs = useSelector(state => state.club.clubs)
    let clubName = ''
    let clubImage = ''
    let clubId = ''
    let userId = ''
    for(const key in clubs){

        for (const key1 in clubs[key].posts){

            if(clubs[key].posts[key1].id == props.post.id){
                clubId = clubs[key].id
                clubName = clubs[key].name
                clubImage = clubs[key].image
            }
            for (const key2 in clubs[key].posts[key1].likes){
                userId = clubs[key].posts[key1].likes[key2].id

            }
            // if this id == id of the current prop post -> display the club
        }
    }
    const dispatch = useDispatch()
    const loggedInUser = useSelector(state => state.user.loggedInUser)

    const handleLike = () => {
            dispatch(likePost(loggedInUser,clubId, props.post.id))
        
    }

    const timestamp = props.post.created
    let time = moment(timestamp || moment.now()).fromNow()

 return (
    <TouchableOpacity style={styles.container} onPress={() => navigation.navigate('Single Post', {name: props.post.title, id: props.post.id})}> 
        <View style={styles.blog}>
            <Ionicons name="ios-newspaper" size={20} color="#4f52a0"/>
            <Text style={styles.blogText}>Blog</Text>
        </View> 
        <View>
            <Text style={styles.title}>{props.post.title}</Text>
            <Text>{props.post.content}</Text>
            <View style={styles.timeContainer}>
                <Text style={styles.time}>{time}</Text>
                <TouchableOpacity disabled={loggedInUser.id == userId ? true : false} style={{flexDirection: 'row'}} onPress={handleLike}>
                    <Ionicons name={loggedInUser.id == userId ? "ios-heart" : 'ios-heart-outline' } size={20} color="#4f52a0"/>
                    <Text style={styles.likes}>{props.post.likes.length}</Text>
                </TouchableOpacity>
            </View> 
            <View style={styles.clubContainer}>
                <Avatar rounded source={{uri:clubImage}} /> 
                <Text style={styles.club}>{clubName}</Text>
            </View>
        </View>
        
    </TouchableOpacity>
 )
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
    fontSize: 22,
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