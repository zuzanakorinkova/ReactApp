import React, { useState } from "react";
import { View, Text, Button, StyleSheet, TextInput } from "react-native";
import {DarkPurple} from '../../assets/colors';

const Input = (props) => {
	const [touched, setTouched] = useState(false);

	const handleNewInput = (enteredText) => {
		setTouched(true);
		enteredText === "" ? props.onValid(false) : props.onValid(true);
		props.setContent(enteredText);
	};

	return (
		<View style={styles.inputHolder}>
			<Text style={styles.label}>{props.label}</Text>
			<TextInput
				style={styles.input}
				value={props.text}
				placeholder={props.placeholder}
				onChangeText={handleNewInput}
				onBlur={() => setTouched(true)}
				secureTextEntry={props.label == 'Password' || props.label == 'Confirm password' ? true : false}
			/>
			{!props.textValid && touched && <Text>{props.error}</Text>}
		</View>
	);
}; //{!nameValid && <Text>{props.error}</Text>}

const styles = StyleSheet.create({
	inputHolder: {
		backgroundColor: "#fff",
		borderRadius: 5,
		padding: 10,
		shadowColor: "#222",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.2,
		shadowRadius: 2,
		elevation: 2,
		marginVertical: 10,
	},
	label: {
		fontSize: 14,
		lineHeight: 21,
		fontWeight: "bold",
		color: DarkPurple,
		textTransform: "uppercase",
	},
	input: {
		paddingVertical: 6,
		fontSize: 16,
	},

});

export default Input;
