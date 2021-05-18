import React from 'react';
import ChatRoom from '../components/ChatRoom';
import { View, Text, Button, StyleSheet, } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';

const HomeScreen = props => {
    const navigation = useNavigation();

    const clubs = useSelector(state => state.club.clubs)
    //console.log(events)
  // FETCH ALL EVENTS
    return (
        <View>
            <Button title="Add event" onPress={() => navigation.navigate('All Clubs')}/>
            <Text>Menu</Text>
        </View>
    );
}

const styles = StyleSheet.create({

});

export default HomeScreen;