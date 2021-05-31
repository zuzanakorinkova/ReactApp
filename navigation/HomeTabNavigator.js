import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import ChatScreen from '../screens/ChatScreen';
import ChatMessagesScreen from '../screens/ChatMessageScreen';
import NewClub from '../screens/NewClub';
import ProfileScreen from '../screens/ProfileScreen';
import EditProfileScreen from '../screens/EditProfileScreen';
import SearchChatScreen from '../screens/SearchChatScreen';
import AllClubsScreen from '../screens/AllClubsScreen';
import CreateEventScreen from '../screens/CreateEventScreen';
import SingleEventScreen from '../screens/SingleEventScreen';
import HomeScreen from '../screens/HomeScreen';
import DiscoverScreen from '../screens/DiscoverScreen';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { Button } from 'react-native-elements';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();


const options = {
    
    headerStyle: {
        backgroundColor: '#fff',
    },
    headerTintColor: '#4f52a0',
    headerTitleStyle: {
        textTransform: 'uppercase',
    },
    cardStyle: { backgroundColor: '#f2f2f2' },
    
};

function ChatStackNavigator() {
    const navigation = useNavigation();
    return (
        <Stack.Navigator>
            <Stack.Screen name="Chat" 
            options={
            { headerRight: () => (
                <Button onPress={() =>  navigation.navigate('Search Chat')} type="clear" icon={
                    <Ionicons
                      name="ios-create-outline"
                      size={25}
                      color="#4f52a0"/>}
                      />),
            headerStyle: {backgroundColor: '#fff'},
            headerTintColor: '#4f52a0',
            headerTitleStyle: {textTransform: 'uppercase',},
            cardStyle: { backgroundColor: '#f2f2f2' },
            
            }}
            component={ChatScreen} />
            <Stack.Screen name="ChatMessages" component={ChatMessagesScreen} options={options} />
            <Stack.Screen name="New Club" component={NewClub} options={options} />
            <Stack.Screen name="Search Chat" component={SearchChatScreen} options={options}/>
        </Stack.Navigator>
    )
}
function ProfileStackNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Profile" component={ProfileScreen}  options={options} />
            <Stack.Screen name="Edit Profile" component={EditProfileScreen} options={options} />
        </Stack.Navigator>
    )
}
function HomeStackNavigator() {
    const navigation = useNavigation();
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeScreen}   options={{ headerRight: () => (
                <Button onPress={() =>  navigation.navigate('All Clubs')} type="clear" icon={
                    <Ionicons
                      name="ios-add-outline"
                      size={25}
                      color="#4f52a0"/>}
                      />),
                        headerStyle: {backgroundColor: '#fff',},
                        headerTintColor: '#4f52a0',
                        headerTitleStyle: {textTransform: 'uppercase',},
                        cardStyle: { backgroundColor: '#f2f2f2' },
                        }} />
            <Stack.Screen name="All Clubs" component={AllClubsScreen} options={options} />
            <Stack.Screen name="Create Event" component={CreateEventScreen} options={options} />
            <Stack.Screen name="Single Event" component={SingleEventScreen} options={({ route }) => ({ title: route.params.name,  headerTintColor: '#4f52a0',  headerTitleStyle: {textTransform: 'uppercase',},cardStyle: { backgroundColor: '#f2f2f2' },})} />
        </Stack.Navigator>
    )
}

function DiscoverStackNavigator() {
    const navigation = useNavigation();
    return (
        <Stack.Navigator>
            <Stack.Screen name="Discover" component={DiscoverScreen} options={options} />
        </Stack.Navigator>
    )
}

const HomeTabNavigator = props => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'Home') {
                        iconName = focused
                            ? 'ios-home'
                            : 'ios-home-outline';
                    } else if (route.name === 'Chat') {
                        iconName = focused ? 'ios-chatbox-ellipses-outline' : 'ios-chatbox-outline';
                    } else if (route.name === 'Profile') {
                        iconName = focused ? 'ios-list' : 'ios-menu-outline';
                    } else if (route.name === 'Discover'){
                        iconName = focused ? 'ios-search' : 'ios-search-outline';
                    }

                    // You can return any component that you like here!
                    return <Ionicons name={iconName} size={size} color={color} />;
                },
            })}
            tabBarOptions={{
                activeTintColor: '#4f52a0',
                inactiveTintColor: 'gray',
                labelStyle: {
                    fontSize: 14,
                    textTransform: 'uppercase',
                    padding: 5,
                },
                style: {
                    height: 70,
                    alignItems: 'center',
                }
            }}
        >
            <Tab.Screen
                name={'Home'}
                component={HomeStackNavigator}
            />
            <Tab.Screen
                name={'Discover'}
                component={DiscoverStackNavigator}
            />
            <Tab.Screen
                name={'Chat'}
                component={ChatStackNavigator}
            />
            <Tab.Screen
                name={'Profile'}
                component={ProfileStackNavigator}
            />
      
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({

});

export default HomeTabNavigator;