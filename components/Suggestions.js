import React from 'react';
import { View, Text, Button, StyleSheet, } from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';

const Suggestions = props => {
 return (
    <View>
        <Text style={styles.club}>{props.chatroom.name}</Text>
    </View>
 );
}

const styles = StyleSheet.create({
    club: {
        fontWeight: 'bold',
        padding: 20, 
    }
});

export default Suggestions;