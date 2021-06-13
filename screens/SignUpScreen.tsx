import React, { useState, useEffect } from "react";
import {
	View,
	Text,
	Button,
	StyleSheet,
	Image,
	TouchableOpacity,
	Pressable,
} from "react-native";
import { DarkPurple, LightGrey, LightPurple, Purple } from "../assets/colors";
import { useDispatch } from "react-redux";
import { NavigationHelpersContext, useNavigation } from "@react-navigation/native";
import Input from "../components/common/Input";
import { signup } from "../store/actions/UserActions";
import { signupDetails } from "../store/actions/UserActions";


const SignUpScreen = (props: any) => {

	const navigation = useNavigation();
	const dispatch = useDispatch();
	const [title, setTitle] = useState("");
	const [titleValid, setTitleValid] = useState("");
	const [name, setName] = useState("");
	const [nameValid, setNameValid] = useState("");
	const [email, setEmail] = useState("");
	const [emailValid, setEmailValid] = useState(false);
	const [password, setPassword] = useState("");
	const [passwordValid, setPasswordValid] = useState(false);
	const [confirmPassword, setConfirmPassword] = useState('')
	const [confirmPasswordValid, setConfirmPasswordValid] = useState(false);

	const handleSignUp = () => {
		//console.log('signing up')
		if(password != confirmPassword){
			console.log('passwords dont match')
		}else {
			dispatch(signup(email, password));
			dispatch(signupDetails(name));
		}
	};

	return (
		<View style={styles.container}>
			<View>
				<Image style={styles.logo} source={require("../assets/logo.png")} />
				<Text style={styles.heading}>Signup to get access</Text>
			</View>
			<View style={styles.formContainer}>
				<View style={styles.inputContainer}>
					<Input
						label="Email"
						text={email}
						setContent={(content: string) => setEmail(content)}
						textValid={emailValid}
						onValid={(valid: boolean) => setEmailValid(valid)}
						error="Please fill out your email"
						placeholder="Write your email"
					/>
					<Input
						label="Password"
						text={password}
						setContent={(content: string) => setPassword(content)}
						textValid={passwordValid}
						onValid={(valid: boolean) => setPasswordValid(valid)}
						error="Please fill out your password"
						placeholder="Write your password"
					/>
					{/* <Input
						label="Name"
						text={name}
						setContent={(content) => setName(content)}
						textValid={nameValid}
						onValid={(valid) => setNameValid(valid)}
						error="Please fill out your name"
						placeholder="Write your name"
						secureTextEntry={true}
					/> */}

					{/* <Input label="Confirm password" newName={newName} nameValid={nameValid} handleNewInput={handleNewInput}
                    error="Passwords dont match" placeholder="Confirm your password" secureTextEntry={true} /> */}
					<Input
						label="Confirm password"
						text={confirmPassword}
						setContent={(content: string) => setConfirmPassword(content)}
						textValid={confirmPasswordValid}
						onValid={(valid: boolean) => setConfirmPasswordValid(valid)}
						error="Please confirm your password"
						placeholder="Confirm password"
					/>
					<Text style={ password == confirmPassword ? {display: 'none'} : {display: 'flex'}}>Passwords don't match</Text>
				</View>
				<Pressable style={styles.button} onPress={handleSignUp}><Text style={styles.buttonText}>Sign up</Text></Pressable>
				<TouchableOpacity style={styles.login} onPress={() => navigation.navigate("Signin")}>
					<Text style={styles.loginText}>Already have an account? <Text style={{fontWeight: 'bold'}}>Login</Text></Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};

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
	login: {
		marginTop: 50,
		alignSelf: 'center',
	},
	loginText: {
		color: DarkPurple,
	}

});

export default SignUpScreen;
