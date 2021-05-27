import React from 'react';
import { View, Text, Button, StyleSheet,TextInput  } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { LightGrey, LightPurple, Purple } from '../../assets/colors';

const SearchInput = props => {
 return (
    <View style={styles.container}>
        <View style={styles.icon}>
            <Ionicons name={props.icon} size={22} color={Purple} />
        </View>
        <View>
            <TextInput placelholderTextColor={LightGrey} placeholder={props.placeholder} onChangeText={props.onChangeText} />
        </View>
    </View>
 );
}

const styles = StyleSheet.create({
container: {
    flexDirection: 'row',
    margin: 10,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: LightGrey,
},
icon: {
    marginRight: 10,
}
});

export default SearchInput;