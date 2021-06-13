import User from '../../models/User';
import { SIGNUP, SIGNUP_DETAIL_NAME, SIGNUP_DETAIL_TITLE, SIGNIN, UPDATE_USER, RESET_STORE} from '../actions/UserActions';
import {tassign} from 'tassign';
import { useRoute } from '@react-navigation/core';
import { State } from 'react-native-gesture-handler';

export interface UserState {
    chatNotifications: User | undefined;
    loggedInUser: User | undefined;
    idToken: string | undefined;
}

export interface Action {
    type: string;
    payload: any | undefined;
}

const initialState: UserState = {
    chatNotifications: undefined,
    loggedInUser: undefined,
    idToken: undefined,
}


const UserReducer = (state: UserState = initialState, action: Action) => {
    switch (action.type) {
        case SIGNUP:
            {
                return {
                    ...state,
                    loggedInUser: new User(action.payload.localId, '', action.payload.email, '', '', false),
                    idToken: action.payload.idToken,
                }
            };
        case SIGNUP_DETAIL_NAME:
            {
                console.log("Reducer name: " + action.payload)

                const loggedInUser = state.loggedInUser
                const userInfo: User = {...loggedInUser}
                userInfo.name = action.payload;
                console.log("UserInfo name: " + userInfo.name)

                // return {...state, loggedInUser: userInfo };
                return tassign(state, { loggedInUser: userInfo});
            };

        case SIGNUP_DETAIL_TITLE:
            {
                console.log("Reducer title: " + action.payload)

                const loggedInUser = state.loggedInUser
                const userInfo: User = {...loggedInUser}
                userInfo.title = action.payload;
                console.log("UserInfo title: " + userInfo.title)

                // return {...state, loggedInUser: userInfo };
                return tassign(state, { loggedInUser: userInfo});
            };

        case SIGNIN:
            return {
                ...state,
                loggedInUser: new User(action.payload.localId, '', action.payload.email, '', '', false),
                idToken: action.payload.idToken,
            };

        case UPDATE_USER:
            {
                // console.log("Reducer update  name: " + action.payload)

                return tassign(state, { loggedInUser: action.payload});
                
                // const loggedInUser = state.loggedInUser
                // const userInfo: User = {...loggedInUser}
                // userInfo.name = action.payload;
                // console.log("UserInfo name: " + userInfo.name)
                
                // return {...state, loggedInUser: action.payload };
            };
        case RESET_STORE: 
            return {
                // loggedInUser: new User('', '', '', '', '', false),
                // idToken: '',
            }
        
        default:
            return state;
    }
}

export default UserReducer;