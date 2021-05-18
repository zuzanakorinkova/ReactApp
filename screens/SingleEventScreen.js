import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, Text, Button, StyleSheet, FlatList, TextInput } from 'react-native';

import Clubs from '../components/Clubs';
import { useNavigation } from '@react-navigation/native';


const SingleEventScreen = props => {

    let title = ''
    const { id } = props.route.params
    const clubs = useSelector(state => state.club.clubs);
    for(const key in clubs){
       if(clubs[key].events.find(event => event.id == id)) {
           for(const key1 in clubs[key].events){
               title = clubs[key].events[key1].title
           }
       }
    }

    const dispatch = useDispatch()

    const navigation = useNavigation();
 
    return (
        <View>
          
            <Text>{title}</Text>

        
        </View>
    );
}

const styles = StyleSheet.create({

});

export default SingleEventScreen;