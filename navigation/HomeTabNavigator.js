import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, Button, StyleSheet, } from 'react-native';
import ChatScreen from '../screens/ChatScreen';
import ProfileScreen from '../screens/ProfileScreen';
import HomeScreen from '../screens/HomeScreen';
import Ionicons from '@expo/vector-icons/Ionicons';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function ChatStackNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Chat" component={ChatScreen} />
        </Stack.Navigator>
    )
}
function ProfileStackNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Profile" component={ProfileScreen} />
        </Stack.Navigator>
    )
}
function HomeStackNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeScreen} />
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
                    }

                    // You can return any component that you like here!
                    return <Ionicons name={iconName} size={size} color={color} />;
                },
            })}
            tabBarOptions={{
                activeTintColor: '#4f52a0',
                inactiveTintColor: 'gray',
                labelStyle: {
                    fontSize: 15,
                    textTransform: 'uppercase',
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