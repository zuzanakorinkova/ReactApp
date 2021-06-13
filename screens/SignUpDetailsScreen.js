import React, { useState } from "react";
import { View, Text, Button, StyleSheet, Image, Pressable } from "react-native";
import { DarkPurple, Pink, Purple } from "../assets/colors";
import { useDispatch, useSelector } from "react-redux";
import Input from "../components/common/Input";
import { signupDetails } from "../store/actions/UserActions";
import { updateUser } from "../store/actions/UserActions";
import { useNavigation } from "@react-navigation/native";
import { parseTwoDigitYear } from "moment";

const SignUpDetailsScreen = () => {
	const [userName, setName] = useState("");
	const [userTitle, setTitle] = useState("");
	const [nameValid, setNameValid] = useState(false);
	const [titleValid, setTitleValid] = useState(false);

	const dispatch = useDispatch();
	const navigation = useNavigation();

	const handleSave = () => {
		dispatch(signupDetails(userName, userTitle));
	};

	return (
		<View style={styles.container}>
			<View style={styles.logoHolder}>
				<Image style={styles.logo} source={require("../assets/images/3.png")} />
			</View>
			<Text style={styles.sectionTitle}>Before we start...</Text>
			<View style={styles.editImage}>
				<View style={styles.imageUpload}>
					<Text style={styles.uploadText}>Profile Picture</Text>
					<Pressable style={styles.btnTheme}>
						<Text style={styles.btnText}>Upload</Text>
					</Pressable>
				</View>
				<Image
					style={styles.userImage}
					source={require("../assets/images/profileImage_placeholder.jpg")}
				/>
			</View>
			<View>
				<Input
					label="What is your name?"
					text={userName}
					setContent={(content) => setName(content)}
					textValid={nameValid}
					onValid={(valid) => setNameValid(valid)}
					error="Please fill out your name"
					placeholder="Full name"
				/>
				<Input
					label="Study Programme"
					text={userTitle}
					setContent={(content) => setTitle(content)}
					textValid={titleValid}
					onValid={(valid) => setTitleValid(valid)}
					error="Please fill out your study programme"
					placeholder="Study programme"
				/>
			</View>

			<Pressable style={styles.btnSave} onPress={handleSave}>
				<Text style={styles.btnText}>Save details</Text>
			</Pressable>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		marginHorizontal: 20,
	},
	logoHolder: {
		alignItems: "center",
		marginVertical: 30,
	},
	logo: {
		height: 120,
		width: 120,
		borderRadius: 70,
		borderWidth: 7,
		borderColor: "#fff",
	},
	sectionTitle: {
		fontSize: 18,
		lineHeight: 21,
		fontWeight: "bold",
		color: DarkPurple,
		marginBottom: 15,
	},
	editImage: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginVertical: 40,
	},
	imageUpload: {
		flexDirection: "column",
	},
	uploadText: {
		fontSize: 13,
		lineHeight: 21,
		fontWeight: "bold",
		letterSpacing: 0.25,
		textTransform: "uppercase",
		color: DarkPurple,
	},
	userImage: {
		backgroundColor: "green",
		height: 80,
		width: 80,
		borderRadius: 50,
		borderColor: "#fff",
		borderWidth: 3,
		marginRight: 10,
	},
	btnTheme: {
		alignItems: "center",
		justifyContent: "center",
		paddingVertical: 8,
		paddingHorizontal: 60,
		marginVertical: 10,
		borderRadius: 5,
		shadowColor: "#222",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.2,
		shadowRadius: 2,
		elevation: 2,
		backgroundColor: "#5050a5",
	},
	btnSave: {
		alignItems: "flex-start",
		paddingVertical: 20,
		paddingHorizontal: 20,
		marginVertical: 20,
		borderRadius: 5,
		shadowColor: "#222",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.2,
		shadowRadius: 2,
		elevation: 2,
		backgroundColor: "#5050a5",
	},
	btnText: {
		fontSize: 16,
		lineHeight: 21,
		fontWeight: "bold",
		letterSpacing: 0.25,
		color: "white",
	},
});

export default SignUpDetailsScreen;
