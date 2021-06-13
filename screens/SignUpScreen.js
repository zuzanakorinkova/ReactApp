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
import {
	NavigationHelpersContext,
	useNavigation,
} from "@react-navigation/native";
import Input from "../components/common/Input";
import { signup } from "../store/actions/UserActions";

const SignUpScreen = (props) => {
	const navigation = useNavigation();
	const dispatch = useDispatch();
	const [email, setEmail] = useState("");
	const [emailValid, setEmailValid] = useState(false);
	const [password, setPassword] = useState("");
	const [passwordValid, setPasswordValid] = useState(false);
	const [signupError, setSignupError] = useState(false);

	const handleSignUp = () => {
		if (email && password) {
			dispatch(signup(email, password));
			navigation.navigate("Signup Details");
		} else {
			console.log("Error, signup not valid!");
			setSignupError(true);
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
						setContent={(content) => setEmail(content)}
						textValid={emailValid}
						onValid={(valid) => setEmailValid(valid)}
						error="Please fill out your email"
						placeholder="Write your email"
					/>
					<Input
						label="Password"
						text={password}
						setContent={(content) => setPassword(content)}
						textValid={passwordValid}
						onValid={(valid) => setPasswordValid(valid)}
						error="Please fill out your password"
						placeholder="Write your password"
						secureTextEntry={true}
					/>
				</View>
				<Pressable style={styles.button} onPress={handleSignUp}>
					<Text style={styles.buttonText}>Sign up</Text>
				</Pressable>
				{signupError && (
					<Text style={styles.error}>Error, signup is not valid</Text>
				)}
				<TouchableOpacity
					style={styles.login}
					onPress={() => navigation.navigate("Signin")}
				>
					<Text style={styles.loginText}>
						Already have an account?{" "}
						<Text style={{ fontWeight: "bold" }}>Login</Text>
					</Text>
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
		elevation: 5,
		shadowColor: "#000",
		shadowOpacity: 0.2,
		shadowRadius: 5,
		padding: 10,
	},
	button: {
		marginTop: 30,
		backgroundColor: Purple,
		padding: 20,
		borderRadius: 5,
	},
	buttonText: {
		color: "white",
		fontSize: 17,
		fontWeight: "bold",
	},
	login: {
		marginTop: 50,
		alignSelf: "center",
	},
	loginText: {
		color: DarkPurple,
	},
	error: {
		color: "#333333",
		fontSize: 12,
		marginVertical: 8,
	},
});

export default SignUpScreen;
