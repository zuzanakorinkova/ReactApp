import React, { useState } from 'react';
import ChatRoom from '../components/ChatRoom';
import Events from '../components/Events';
import Posts from '../components/Posts';
import EventsAndPosts from '../components/EventsAndPosts';
import { View, Text, Button, StyleSheet, ScrollView, SectionList, TouchableOpacity, Image, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import Input from "../components/common/Input";
import { signupDetails } from "../store/actions/UserActions";
import Ionicons from '@expo/vector-icons/Ionicons';


const HomeScreen = props => {
    const navigation = useNavigation();
    // select clubs id and pass it through Flatlist
    const allData = useSelector(state => state.club.clubs)

   const clubs = []
   const events = []
   const posts = []
   for (const key in allData){
      clubs.push(allData[key])
      for (const key1 in allData[key].events){
          events.push(allData[key].events[key1])
      }
      for (const key2 in allData[key].posts){
        posts.push(allData[key].posts[key2])
    }
   }
  // console.log(clubs.id)


//profile
  const dispatch = useDispatch();
	const [name, setName] = useState("");
	const [nameValid, setNameValid] = useState("");

	const handleSignUp = () => {
	console.log('signing up')
		dispatch(signupDetails(name));
	};


  // FETCH ALL EVENTS

  // Create a flatlist with club data and new components
    return (
        <View>
    <View>
            <Text>----------------------</Text>
             <Input
                label="Name"
                 text={name}
                 setContent={(content) => setName(content)}
                 textValid={nameValid}
                 onValid={(valid) => setNameValid(valid)}
                 error="Please fill out your name"
                 placeholder="Write your name"
                 secureTextEntry={true}
             />
             <Button title="Add name" onPress={handleSignUp}></Button>
            </View>
        <FlatList
            data={clubs}
            renderItem={(itemData) => (
                <EventsAndPosts home={itemData.item}
                    keyExtractor={item => item.id} 
                />
            )}

        />

        
        </View>
    );
}

const styles = StyleSheet.create({
   
     });

export default HomeScreen;