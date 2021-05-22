import React, { useState } from 'react';
import ChatRoom from '../components/ChatRoom';
import { View, Text, Button, StyleSheet, } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import Input from "../components/common/Input";
import { signupDetails } from "../store/actions/UserActions";

const HomeScreen = props => {
    const navigation = useNavigation();

    const dispatch = useDispatch();
	const [title, setTitle] = useState("");
	const [titleValid, setTitleValid] = useState("");
	const [name, setName] = useState("");
	const [nameValid, setNameValid] = useState("");

	const handleSignUp = () => {
		//console.log('signing up')
		dispatch(signupDetails(name));
	};

    const clubs = useSelector(state => state.club.clubs)
    //console.log(events)
  // FETCH ALL EVENTS
    return (
        <View>
            <Button title="Add event" onPress={() => navigation.navigate('All Clubs')}/>
            <Text>Menu</Text>
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
    );
}

const styles = StyleSheet.create({

});

export default HomeScreen;