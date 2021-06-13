import User from '../../models/User';
import { SIGNUP, SIGNUP_DETAIL, SIGNIN, UPDATE_USER, RESET_STORE} from '../actions/UserActions';
import {tassign} from 'tassign';
import { useRoute } from '@react-navigation/core';
import { State } from 'react-native-gesture-handler';

export interface UserState {
    chatNotifications: User | undefined;
    loggedInUser: User | undefined;
    idToken: string | undefined;
    signupComplete: boolean | undefined;
}

export interface Action {
    type: string;
    payload: any | undefined;
}

const initialState: UserState = {
    chatNotifications: undefined,
    loggedInUser: undefined,
    idToken: undefined,
    signupComplete: undefined
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
        case SIGNUP_DETAIL: {
                const loggedInUser = state.loggedInUser
                const userInfo: User = {...loggedInUser}
                userInfo.name = action.payload.name;
                userInfo.title = action.payload.title;
                
                return tassign(state, { loggedInUser: userInfo, signupComplete: true});
        }

        case SIGNIN:
            return {
                ...state,
                loggedInUser: new User(action.payload.localId, '', action.payload.email, '', '', false),
                idToken: action.payload.idToken,
            };

        case UPDATE_USER:
            {
                return tassign(state, { loggedInUser: action.payload});
            };
        case RESET_STORE: 
            return {
                loggedInUser: new User('', '', '', '', '', false),
                idToken: '',
                signupComplete: false
            }
        
        default:
            return state;
    }
}

export default UserReducer;