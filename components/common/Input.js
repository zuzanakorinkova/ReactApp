import React, { useState } from 'react';
import {DarkPurple} from '../../assets/colors';
import { View, Text, Button, StyleSheet, TextInput } from 'react-native';



const Input = (props) => {

    const [touched, setTouched] = useState(false);

    const handleNewInput = (enteredText) => {
        setTouched(true);
        enteredText === '' ? props.onValid(false) : props.onValid(true);
        props.setContent(enteredText);
    }

    return (
        <View>
            <Text style={styles.label}>{props.label}</Text>
            <TextInput
                style={styles.input}
                value={props.text}
                placeholder={props.placeholder}
                onChangeText={handleNewInput}
                onBlur={() => setTouched(true)}
                secureTextEntry={props.label == 'Password' ? true : false}
            />{!props.textValid && touched && <Text>{props.error}</Text>}
        </View>
    );
}//{!nameValid && <Text>{props.error}</Text>}

const styles = StyleSheet.create({
    label: {
        color: DarkPurple,
    },
    input: {
        padding: 10,
    }
});

export default Input;