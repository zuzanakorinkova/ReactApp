import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Image, TouchableOpacity, Pressable, TextInput } from 'react-native';
import { useDispatch } from 'react-redux';
import { DarkPurple, LightGrey, LightPurple, Purple } from "../assets/colors";
import Input from '../components/common/Input';
import { useNavigation } from '@react-navigation/native';
import { signin } from '../store/actions/UserActions';
import { ReloadInstructions } from 'react-native/Libraries/NewAppScreen';

const SignInScreen = props => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [emailValid, setEmailValid] = useState(false);
    const [password, setPassword] = useState('');
    const [passwordValid, setPasswordValid] = useState(false);

    const handleSignIn = () => {
        //console.log('signing in')
            dispatch(signin(email, password))
    }
    return (
        <View style={styles.container}>
            <View style={styles.logoContainer}>
                <Image style={styles.logo} source={require('../assets/logo.png')} />
                <Text style={styles.heading}>Login to get access</Text>
            </View>
            <View style={styles.formContainer}>
                <View style={styles.inputContainer}>
                    <Input label="Email" text={email} setContent={content => setEmail(content)} textValid={emailValid} onValid={valid => setEmailValid(valid)}
                        error="Please fill out your email" placeholder="Write your email" />
                    <Input label="Password" text={password} setContent={content => setPassword(content)} textValid={passwordValid} onValid={valid => setPasswordValid(valid)}
                        error="Please fill out your password" placeholder="Write your password" />
                  
                </View>
                <Pressable style={styles.button} onPress={handleSignIn}><Text style={styles.buttonText}>Login</Text></Pressable>
                <TouchableOpacity style={styles.signup} onPress={() => navigation.navigate('Signup')}>
                <Text style={styles.signupText}>Don't have an account? <Text style={{fontWeight: 'bold'}}>Signup</Text></Text>
                </TouchableOpacity>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
		backgroundColor: "white",
		padding: 20,
	},
	logo: {
		alignSelf: "center",
		height: 100,
		width: 100,
		marginBottom: 20,
	},
	heading: {
		color: DarkPurple,
		fontWeight: "700",
		fontSize: 20,
		marginBottom: 10,
	},
	formContainer: {
		margin: 10,
	},
	inputContainer: {
		marginBottom: 20,
		borderRadius: 5,
		elevation:5,
		shadowColor: '#000',
		shadowOpacity: 0.2,
		backgroundColor: 'white',
		shadowRadius: 5, 
		borderWidth: 1,
		borderColor: LightGrey,
		padding: 10,
	},
	button: {
		marginTop: 30,
		backgroundColor: Purple,
		padding: 20,
		borderRadius: 5,
	},
	buttonText: {
		color: 'white',
		fontSize: 17,
		fontWeight: 'bold',
	},
	signup: {
		marginTop: 50,
		alignSelf: 'center',
	},
	signupText: {
		color: DarkPurple,
	}
});

export default SignInScreen; 