import React, { useState } from "react";
import { View, Text, Button, StyleSheet, Image, Pressable } from "react-native";
import { DarkPurple, Pink, Purple } from "../assets/colors";
import { useDispatch, useSelector } from "react-redux";
import Input from "../components/common/Input";
import { updateUser } from "../store/actions/UserActions";
import { useNavigation } from "@react-navigation/native";

const EditProfileScreen = () => {
	const profileInfo = useSelector((state) => state.user.loggedInUser);
	const [userName, setName] = useState(profileInfo.name);
	const [userTitle, setTitle] = useState(profileInfo.title);
	const [nameValid, setNameValid] = useState(false);
	const [titleValid, setTitleValid] = useState(false);

	const dispatch = useDispatch();
	const navigation = useNavigation();

	const handleSave = () => {
		let user = { ...profileInfo };
		user.name = userName;
		user.title = userTitle;
		dispatch(updateUser(user));
		navigation.goBack();
	};

	return (
		<View style={styles.container}>
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
					placeholder="Name"
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
				<Text style={styles.btnText}>Save changes</Text>
			</Pressable>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		marginHorizontal: 20,
	},
	editImage: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginVertical: 50,
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
		paddingHorizontal: 60,
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

export default EditProfileScreen;
