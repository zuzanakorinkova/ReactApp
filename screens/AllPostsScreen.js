import React from 'react';
import { View, Text, Button, StyleSheet, FlatList } from 'react-native';
import Posts from '../components/Posts';
import { useSelector, useDispatch } from 'react-redux';

const AllPostsScreen = props => {
    const data = useSelector(state => state.club.clubs);

    const clubs = []
    const posts = []
    for ( const key in data) {
       clubs.push(data[key])
       for (const key1 in data[key].posts){
            posts.push(data[key].posts[key1])
       }
    }

 return (
    <View>
        <View>
            <FlatList data={posts} renderItem={itemData => (
                    <Posts post={itemData.item} />
                )}
                keyExtractor={item => item.id} />
        </View>
    </View>
 );
}

const styles = StyleSheet.create({
 
});

export default AllPostsScreen;