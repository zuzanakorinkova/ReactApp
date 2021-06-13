import React, {useState} from 'react';
import { View, Text, Button, StyleSheet,  } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Input from '../components/common/Input';
import {updateUser} from '../store/actions/UserActions';
import {useNavigation} from '@react-navigation/native';

const EditProfileScreen = () => {
    const profileInfo = useSelector(state => state.user.loggedInUser);
    const [userName, setName] = useState(profileInfo.name);
    const [nameValid, setNameValid] = useState(false);
    const dispatch = useDispatch();
    const navigation = useNavigation();

    const handleSave = () => {
        dispatch(updateUser(userName));
        navigation.goBack();
    }



 return (
    <View>
        <Input label="What is your name" text={userName} setContent={content => setName(content)} textValid={nameValid} onValid={valid => setNameValid(valid)}
        error="Please fill out your name" placeholder="Name" />
        <Button title="Save" onPress={handleSave}></Button>
    </View>
 );
}

const styles = StyleSheet.create({
 
});

export default EditProfileScreen;