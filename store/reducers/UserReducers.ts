import User from '../../models/User';
import { SIGNUP, SIGNUP_DETAILS, SIGNIN, UPDATE_USER} from '../actions/UserActions';
import {tassign} from 'tassign';
import { useRoute } from '@react-navigation/core';

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
        case SIGNUP_DETAILS:
            {
                console.log("Reducer name: " + action.payload)

                const loggedInUser = state.loggedInUser
                const userInfo: User = {...loggedInUser}
                userInfo.name = action.payload;
                console.log("UserInfo name: " + userInfo.name)

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
                console.log("Reducer update  name: " + action.payload)

                const loggedInUser = state.loggedInUser
                const userInfo: User = {...loggedInUser}
                userInfo.name = action.payload;
                console.log("UserInfo name: " + userInfo.name)

                // return {...state, loggedInUser: userInfo };
                return tassign(state, { loggedInUser: userInfo});
                // return tassign(state, {loggedInUser: action.payload})
            };
        
        default:
            return state;
    }
}

export default UserReducer;