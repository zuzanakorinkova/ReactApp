import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ChatRoom from '../components/ChatRoom';
import { View, Text, Button, StyleSheet, FlatList, TextInput } from 'react-native';

import {createChatMessage} from '../store/actions/ClubActions';
import Input from '../components/common/Input';
import Clubs from '../components/Clubs';
import ChatMessages from '../components/ChatMessages';
import { useNavigation } from '@react-navigation/native';


const AllClubsScreen = props => {
    const clubs = useSelector(state => state.club.clubs);
    // DISPLAY ALL CHATROOMS *CLUB* FOR WHICH THEN CREATE AN EVENT
    const dispatch = useDispatch()

    const navigation = useNavigation();
 
    return (
        <View>
          
              <FlatList
                data={clubs}
                renderItem={itemData => (
                    <Clubs club={itemData.item} />
                )}
                keyExtractor={item => item.id}
            />

        
        </View>
    );
}

const styles = StyleSheet.create({

});

export default AllClubsScreen;