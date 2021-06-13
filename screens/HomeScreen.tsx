import React from "react";
import EventsAndPosts from "../components/EventsAndPosts";
import {
	View,
	Text,
	StyleSheet,
	ScrollView,
	SectionList,
	TouchableOpacity,
	Image,
	FlatList,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import Ionicons from "@expo/vector-icons/Ionicons";

const HomeScreen = (props) => {
	const navigation = useNavigation();
	// select clubs id and pass it through Flatlist
	const allData = useSelector((state: any) => state.club.clubs);

	const clubs = [];
	const events = [];
	const posts = [];
	for (const key in allData) {
		clubs.push(allData[key]);
		for (const key1 in allData[key].events) {
			events.push(allData[key].events[key1]);
		}
		for (const key2 in allData[key].posts) {
			posts.push(allData[key].posts[key2]);
		}
	}

	// FETCH ALL EVENTS

	// Create a flatlist with club data and new components
	return (
		<View>
			<View>
				<FlatList
					data={clubs}
					renderItem={(itemData) => <EventsAndPosts home={itemData.item} />}
					keyExtractor={(item) => {
						return item.id;
					}}
				/>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({});

export default HomeScreen;
