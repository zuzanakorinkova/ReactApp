import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { DarkPurple } from '../assets/colors';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import Input from '../components/common/Input';
import { signup } from '../store/actions/UserActions';

const SignUpScreen = props => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [title, setTitle] = useState('');
    const [titleValid, setTitleValid] = useState('');
    const [name, setName] = useState('');
    const [nameValid, setNameValid] = useState('');
    const [email, setEmail] = useState('');
    const [emailValid, setEmailValid] = useState(false);
    const [password, setPassword] = useState('');
    const [passwordValid, setPasswordValid] = useState(false);

    const handleSignUp = () => {
        //console.log('signing up')
        dispatch(signup(email, password))
    }

    return (
        <View style={styles.container}>
            <View style={styles.logoContainer}>
                <Image source={require('../assets/logo.png')} />
                <Text style={styles.heading}>Signup to get access</Text>
            </View>
            <View style={styles.formContainer}>
                <View style={styles.inputContainer}>
                    <Input label="Email" text={email} setContent={content => setEmail(content)} textValid={emailValid} onValid={valid => setEmailValid(valid)}
                        error="Please fill out your email" placeholder="Write your email" />
                    <Input label="Password" text={password} setContent={content => setPassword(content)} textValid={passwordValid} onValid={valid => setPasswordValid(valid)}
                        error="Please fill out your password" placeholder="Write your password" secureTextEntry={true} />

                    {/* <Input label="Confirm password" newName={newName} nameValid={nameValid} handleNewInput={handleNewInput}
                    error="Passwords dont match" placeholder="Confirm your password" secureTextEntry={true} /> */}
                </View>
                <Button title="Sign up" onPress={handleSignUp}></Button>
                <TouchableOpacity onPress={() => navigation.navigate('Signin')}><Text>Already have an account? Login</Text></TouchableOpacity>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
    },
    logoContainer: {
        alignItems: 'center',
    },
    heading: {
        color: DarkPurple,
        fontWeight: '700',
        fontSize: 17,
    },
    formContainer: {
        margin: 15,

    },
    inputContainer: {
        borderWidth: 1,
        marginBottom: 10,
    },
});

export default SignUpScreen; 