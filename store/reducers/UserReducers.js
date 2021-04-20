import User from '../../models/User';
import { SIGNUP, SIGNIN } from '../actions/UserActions';

const initialState = {
    loggedInUser: null,
    idToken: null,
}

const UserReducer = (state = initialState, action) => {
    switch (action.type) {
        case SIGNUP:
            {
                return {
                    ...state,
                    loggedInUser: new User(action.payload.localId, '', action.payload.email, '', '', false),
                    idToken: action.payload.idToken,
                }
            };
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