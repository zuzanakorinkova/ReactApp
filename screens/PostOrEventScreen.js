import React from 'react';
import { View, Text, Button, StyleSheet  } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {TouchableOpacity} from 'react-native-gesture-handler';

const PostOrEventScreen = props => {
    const navigation = useNavigation()
 return (
    <View>
        <TouchableOpacity onPress={navigation.navigate('All Clubs')}>
            <View>
                <Text>Create Event</Text>
            </View>
        </TouchableOpacity>
    </View>
 );
}

const styles = StyleSheet.create({
 
});

export default PostOrEventScreen;