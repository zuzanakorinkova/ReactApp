import React, { useState } from "react";
import { View, Text, StyleSheet, Image, Pressable, Switch } from "react-native";
import { DarkPurple, Pink, Purple } from "../assets/colors";
import { useSelector, useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { logoutUser } from "../store/actions/UserActions";
import { logoutClub } from "../store/actions/ClubActions";
import NotificationToggle from "../components/NotificationToggle";

const ProfileScreen = (props) => {
	const navigation = useNavigation();
	const dispatch = useDispatch();
	const userInfo = useSelector((state) => state.user.loggedInUser);

	const logoutUserInfo = () => {
		console.log("Log out");
		// dispatch(logoutUser());
		// dispatch(logoutClub());
	};

	return (
		<View style={styles.container}>
			<View style={styles.ProfileHolder}>
				<View style={styles.userProfile}>
					<Image
						style={styles.userImage}
						source={require("../assets/images/profileImage_placeholder.jpg")}
					/>
					<View style={styles.userDetails}>
						<Text style={styles.detailsName}>
							{userInfo.name || "Your full name"}
						</Text>
						<Text style={styles.detailsText}>
							{userInfo.email || "Your email"}
						</Text>
						<Text style={styles.detailsText}>
							{userInfo.title || "Your study title"}
						</Text>
					</View>
				</View>
				<Pressable
					style={styles.btnTheme}
					onPress={() => navigation.navigate("Edit Profile")}
				>
					<Text style={styles.btnText}>Edit profile</Text>
				</Pressable>
			</View>
			<View style={styles.divider} />
			<View style={styles.notifications}>
				<Text style={styles.sectionTitle}>Notifications</Text>
				<NotificationToggle
					title="Chat"
					text="When you receive a new message"
				/>
				<NotificationToggle
					title="Event reminder"
					text="An hour before events you are 'going to"
				/>
			</View>
			<View style={styles.divider} />
			<Pressable style={styles.btnLogout} onPress={logoutUserInfo}>
				<Text style={styles.btnLogoutText}>Log out</Text>
			</Pressable>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		marginHorizontal: 20,
	},
	ProfileHolder: {
		marginVertical: 30,
	},
	userProfile: {
		flexDirection: "row",
		alignItems: "center",
	},
	userImage: {
		backgroundColor: "green",
		height: 60,
		width: 60,
		borderRadius: 50,
		marginRight: 10,
	},
	userDetails: {
		marginHorizontal: 10,
		flexShrink: 1,
	},
	detailsName: {
		color: "#32305d",
		fontSize: 22,
		fontWeight: "bold",
	},
	detailsText: {
		fontSize: 14,
		lineHeight: 18,
		color: "#4e4e4e",
		marginVertical: 3,
		flexShrink: 1,
	},
	btnTheme: {
		alignItems: "center",
		justifyContent: "center",
		paddingVertical: 12,
		paddingHorizontal: 32,
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
	divider: {
		borderBottomColor: "#eaeaea",
		borderBottomWidth: 2,
	},
	notifications: {
		marginBottom: 40,
	},
	sectionTitle: {
		fontSize: 20,
		lineHeight: 21,
		fontWeight: "bold",
		color: "#32305d",
		textTransform: "uppercase",
		marginTop: 40,
	},
	btnLogout: {
		alignItems: "center",
		justifyContent: "center",
		paddingVertical: 20,
		paddingHorizontal: 32,
		marginVertical: 40,
		borderRadius: 5,
		shadowColor: "#222",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.2,
		shadowRadius: 2,
		elevation: 2,
		backgroundColor: "#fff",
	},
	btnLogoutText: {
		fontSize: 16,
		lineHeight: 21,
		fontWeight: "bold",
		textTransform: "uppercase",
		color: "#32305d",
	},
});

export default ProfileScreen;
