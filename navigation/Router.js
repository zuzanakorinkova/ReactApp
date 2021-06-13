import React, { useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";

import { useSelector } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeTabNavigator from "../navigation/HomeTabNavigator";
import ChatScreen from "../screens/ChatScreen";
import SignUpScreen from "../screens/SignUpScreen";
import SignUpDetailsScreen from "../screens/SignUpDetailsScreen";
import SignInScreen from "../screens/SignInScreen";
import Loading from "../screens/LoadingScreen";

const Stack = createStackNavigator();

const Router = (props) => {
	React.useEffect(() => {
		setTimeout(() => {
			setIsLoading(!isLoading);
		}, 500);
	}, []);
	const [isLoading, setIsLoading] = useState(true);

	const options = {
		headerStyle: {
			backgroundColor: "#fff",
		},
		headerTintColor: "#4f52a0",
		headerTitleStyle: {
			textTransform: "uppercase",
		},
		cardStyle: { backgroundColor: "#FFFFFF" },
	};

	const idToken = useSelector((state) => state.user.idToken);

	return (
		<NavigationContainer>
			{isLoading ? <Loading /> : <Stack.Screen />}
			<Stack.Navigator>
				{idToken == null ? (
					<>
						<Stack.Screen
							name={"Signup"}
							component={SignUpScreen}
							options={options}
						/>
						<Stack.Screen
							name={"Signin"}
							component={SignInScreen}
							options={options}
						/>
						<Stack.Screen
							name={"Signup Details"}
							component={SignUpDetailsScreen}
							options={options}
						/>
					</>
				) : (
					<Stack.Screen
						name={"Home"}
						component={HomeTabNavigator}
						options={(options, { headerShown: false })}
					/>
				)}
			</Stack.Navigator>
		</NavigationContainer>
	);
};

const styles = StyleSheet.create({});

export default Router;
