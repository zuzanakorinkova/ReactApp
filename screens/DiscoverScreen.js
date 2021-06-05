import React, { useState, useEffect } from 'react';
import ChatRoom from '../components/ChatRoom';
import Events from '../components/Events';
import { View, Text, Button, StyleSheet, FlatList, ScrollView, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LightGrey, LightPurple, DarkPurple, Purple, Pink, Green } from '../assets/colors';
import { useSelector, useDispatch } from 'react-redux';
import { signupDetails } from "../store/actions/UserActions";
import SearchInput from '../components/common/SearchInput';
import ImageOverlay from "react-native-image-overlay";
import { TouchableOpacity } from 'react-native-gesture-handler';

const DiscoverScreen = props => {
    const navigation = useNavigation();
    const data = useSelector(state => state.club.clubs);

    const clubs = []
    for ( const key in data) {
       clubs.push(data[key]) 
    }

    const [search, setSearch] = useState(null)

    useEffect(() => {
        (() => {
        setSearch(clubs)
        })();
    }, [])

    const handleSearch = (text) => {
        const find = clubs.find(c => c.name).includes(text)
        //console.log(searchClubs)
       setSearch(find)
   }
   

  // Search input on touch --> View with images display none and search items --> display block
    return (
        <View>
            <SearchInput icon="ios-search" placeholder="Search for events, posts and more" onChangeText={(text) => handleSearch(text)}/>

            <TouchableOpacity style={styles.container} onPress={() => navigation.navigate('All Events')}>
                <ImageOverlay containerStyle={styles.events} title="All events" titleStyle={styles.title} overlayColor={Pink} overlayAlpha={0.8}  source={{uri: 'https://images.pexels.com/photos/1157557/pexels-photo-1157557.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'}} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.container} onPress={() => navigation.navigate('All Posts')}>
                <ImageOverlay containerStyle={styles.events} title="All posts" titleStyle={styles.title} overlayColor={Green} overlayAlpha={0.7}  source={{uri: 'https://images.pexels.com/photos/5010877/pexels-photo-5010877.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'}} />
            </TouchableOpacity>
           
    
        </View>
    );
}

const styles = StyleSheet.create({

events: {
    margin: 10,
    height: 140,
    width: '90%',
    alignSelf: 'center',
    borderRadius: 5,
},
title: {
    fontWeight: 'bold',
    fontSize: 20,
    textTransform: 'uppercase',
}

});

export default DiscoverScreen;