import React, { useState } from "react";
import { View, Text, StyleSheet, Switch } from "react-native";
import { DarkPurple, Pink, Purple } from "../assets/colors";

const NotificationToggle = ({ title, text }) => {
	const [isEnabled, setIsEnabled] = useState(false);
	const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

	return (
		<View>
			<View style={styles.notificationHolder}>
				<View style={styles.textHolder}>
					<Text style={styles.title}>{title}</Text>
					<Text style={styles.text}>{text}</Text>
				</View>
				<Switch
					trackColor={{ false: "#d4d4d4", true: "#dcdcee" }}
					thumbColor={isEnabled ? "#5050a5" : "#f5f5f5"}
					ios_backgroundColor="#d4d4d4"
					onValueChange={toggleSwitch}
					value={isEnabled}
				/>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	notificationHolder: {
		backgroundColor: "#fff",
		borderRadius: 5,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		marginTop: 30,
		paddingVertical: 20,
		paddingHorizontal: 10,
		shadowColor: "#222",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.2,
		shadowRadius: 2,
		elevation: 2,
	},
	textHolder: {
		flexDirection: "column",
	},
	title: {
		fontSize: 18,
		lineHeight: 21,
		fontWeight: "bold",
		color: "#32305d",
	},
	text: {
		fontSize: 14,
		lineHeight: 24,
		color: "#878787",
	},
});

export default NotificationToggle;
