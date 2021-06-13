import React, {useState} from 'react';
import { View, Text, Button, StyleSheet, ScrollView, TouchableOpacity  } from 'react-native';
import { DarkPurple, LightGrey, LightPurple, Purple, DarkGrey } from '../assets/colors';
import { useSelector, useDispatch } from 'react-redux';
import {Avatar} from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';
import {likePost} from '../store/actions/ClubActions';
import moment from 'moment';

const SinglePostScreen = props => {
    const {id} = props.route.params
    const navigation = useNavigation()
    const clubs = useSelector(state => state.club.clubs);
    const [likeText, setLikeText] = useState('Like')

    let clubId = ''
    let clubName = ''
    let clubAvatar = ''
    let content = ''
    let created = ''
    let likes = []
    let userId = ''

    for(const key in clubs){
        if(clubs[key].posts.find(post => post.id == id)){
            clubId = clubs[key].id
            clubName = clubs[key].name
            clubAvatar = clubs[key].image
            for(const key1 in clubs[key].posts){
                content = clubs[key].posts[key1].content
                likes = clubs[key].posts[key1].likes
                created = moment(clubs[key].posts[key1].created).format('MMM DD, YYYY')

                for(const key2 in clubs[key].posts[key1].likes){
                    userId = clubs[key].posts[key1].likes[key2].id
                }
            }
        }
    }

    const dispatch = useDispatch()
    const loggedInUser = useSelector(state => state.user.loggedInUser)
    const handleLike = () => {
             dispatch(likePost(loggedInUser,clubId, id))
             setLikeText('Liked')
     }
 

 return (
    <View style={styles.container}>
        <ScrollView>
            <Text style={styles.title}>{props.route.params.name}</Text>
            <View style={styles.containerClub}>
                <View style={styles.club}>
                    <Avatar rounded source={{uri: clubAvatar}} />
                    <Text style={styles.clubName}>{clubName}</Text>
                </View>
                <TouchableOpacity onPress={() =>  navigation.navigate('Chat')}><Ionicons style={styles.chatIcon} name={'ios-chatbubbles'} size={25} color={'white'} /></TouchableOpacity>
            </View>
            <Text style={styles.time}>{created}</Text>
            <Text style={styles.content}>{content}</Text>
            <View style={styles.likeContainer}>
                <Text style={styles.likes}>{likes.length} liked this</Text>
                <TouchableOpacity disabled={!loggedInUser.id == userId ? false : true} style={!loggedInUser.id == userId ? styles.likeButton : styles.pressLikeButton} onPress={handleLike}>
                    <Ionicons  name={'ios-heart'} size={25} color={!loggedInUser.id == userId ? Purple : 'white'} />
                    <Text style={!loggedInUser.id == userId ? styles.likeText : styles.likedText}>{likeText}</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    </View>
 );
}

const styles = StyleSheet.create({
 container: {
     backgroundColor: 'white',
     height: '100%',
     padding: 20,
 },
 title: {
     fontSize: 22,
     fontWeight: 'bold',
 },
 clubName: {
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
containerClub: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderRadius: 7,
    borderColor: LightGrey,
    padding: 10,
},
time: {
    marginTop: 20,
    fontSize: 12,
    color: LightGrey,
},
content: {
    marginTop: 20,
},
likeContainer: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomColor: '#eeeeee',
    borderBottomWidth: 1,
    borderTopColor: '#eeeeee',
    borderTopWidth: 1,
    padding: 10,
},
likes: {
    fontWeight: 'bold',
    color: DarkPurple,
    fontSize: 15,

},
likeButton: {
    borderWidth: 1,
    borderColor: Purple,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
    borderRadius: 5,
    width: 100,
},
pressLikeButton: {
    backgroundColor: Purple,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
    borderRadius: 5,
    width: 100,
},
likeText: {
    color: Purple,
    marginLeft: 5,
    fontWeight: 'bold',
},
likedText: {
    color: 'white',
    marginLeft: 5,
    fontWeight: 'bold',
}
});

export default SinglePostScreen;