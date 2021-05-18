import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, Text, Button, StyleSheet, FlatList, TextInput } from 'react-native';

import Clubs from '../components/Clubs';
import { useNavigation } from '@react-navigation/native';


const SingleEventScreen = props => {
    const clubs = useSelector(state => state.club.clubs);

    const dispatch = useDispatch()

    const navigation = useNavigation();
 
    return (
        <View>
          
            <Text>Single Event</Text>

        
        </View>
    );
}

const styles = StyleSheet.create({

});

export default SingleEventScreen;