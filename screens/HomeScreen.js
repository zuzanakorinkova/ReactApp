import React, { useState } from 'react';
import ChatRoom from '../components/ChatRoom';
import Events from '../components/Events';
import { View, Text, Button, StyleSheet, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LightGrey, LightPurple, DarkPurple } from '../assets/colors';
import { useSelector, useDispatch } from 'react-redux';
import Input from "../components/common/Input";
import { signupDetails } from "../store/actions/UserActions";


const HomeScreen = props => {
    const navigation = useNavigation();
    // select clubs id and pass it through Flatlist
    const allData = useSelector(state => state.club.clubs)

   const clubs = []
   const events = []
   for (const key in allData){
      clubs.push(allData[key])
      for (const key1 in allData[key].events){
          events.push(allData[key].events[key1])
      }
   }
  // console.log(clubs.id)


//profile
//   const dispatch = useDispatch();
// 	const [title, setTitle] = useState("");
// 	const [titleValid, setTitleValid] = useState("");
// 	const [name, setName] = useState("");
// 	const [nameValid, setNameValid] = useState("");

// 	const handleSignUp = () => {
// 		//console.log('signing up')
// 		dispatch(signupDetails(name));
// 	};

//     const clubs = useSelector(state => state.club.clubs)
//     //console.log(events)
//   // FETCH ALL EVENTS
//     return (
//         <View>
//             <Button title="Add event" onPress={() => navigation.navigate('All Clubs')}/>
//             <Text>Menu</Text>
//             <Text>----------------------</Text>
//             <Input
//                 label="Name"
//                 text={name}
//                 setContent={(content) => setName(content)}
//                 textValid={nameValid}
//                 onValid={(valid) => setNameValid(valid)}
//                 error="Please fill out your name"
//                 placeholder="Write your name"
//                 secureTextEntry={true}
//             />
//             <Button title="Add name" onPress={handleSignUp}></Button>

  // FETCH ALL EVENTS
    return (
        <View style={styles.container}>
            <View>
            <View>
                <FlatList data={events} renderItem={itemData => (
                    <Events event={itemData.item}></Events>
                )}
                keyExtractor={item => item.id} />
            </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
container: {
    backgroundColor: "#f2f2f2",
    height: '100%',
}
});

export default HomeScreen;