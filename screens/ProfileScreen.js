import React from "react";
import { View, Text, Button, StyleSheet, Image } from "react-native";
import { DarkPurple, Pink, Purple } from "../assets/colors";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

const ProfileScreen = (props) => {
	const navigation = useNavigation();
	const userInfo = useSelector((state) => state.user.loggedInUser);
	console.log("Profile name: " + userInfo.name);

	// <Text style={styles.text}>{userInfo.name || "Your name"}</Text>
	// <Text style={styles.text}>{userInfo.email || "Your email"}</Text>

	return (
		<View>
			<View style={styles.userProfile}>
				<Image
					style={styles.userImage}
					source={require("../assets/adaptive-icon.png")}
				/>
				<View style={styles.userDetails}>
					<Text style={styles.detailsName}>Name</Text>
					<Text style={styles.detailsText}>Email</Text>
					<Text style={styles.detailsText}>Title</Text>
				</View>
			</View>
			<Button
				title="Edit profile"
				onPress={() => navigation.navigate("Edit Profile")}
			></Button>
		</View>
	);
};

const styles = StyleSheet.create({
	userProfile: {
		flexDirection: "row",
		marginVertical: 20,
		marginHorizontal: 10,
	},
	userImage: {
		backgroundColor: Pink,
		height: 60,
		width: 60,
		borderRadius: 50,
		margin: 10,
	},
	userDetails: {
		margin: 10,
	},
	detailsName: {
		color: "#5050a5",
		fontSize: 24,
		fontWeight: "bold",
	},
	detailsText: {
		fontSize: 16,
	},
});

export default ProfileScreen;
