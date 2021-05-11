import User from '../../models/User';
import { SIGNUP, SIGNIN, SAVE_USER} from '../actions/UserActions';
import {tassign} from 'tassign';
import { useRoute } from '@react-navigation/core';
;
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

        case SAVE_USER:
            {
                return tassign(state, {loggedInUser: action.payload, idToken: action.payload.idToken})
            }
            
        case SIGNIN:
            return {
                ...state,
                loggedInUser: action.payload.email,
                idToken: action.payload.idToken,
            };
              
        
        default:
            return state;
    }
}

export default UserReducer;