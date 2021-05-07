import User from "../../models/User";
import {fetchChatrooms} from "./ChatActions";

export const UPDATE_USER = 'UPDATE_USER';
export const SIGNUP = 'SIGNUP';
export const SIGNIN = 'SIGNIN';
export const SAVE_USER = 'SAVE_USER';

export const saveUser = (user: any) => {
    return {type: SAVE_USER, payload:user};
}

export const signup = ( email: any, password: any) => {
    return async (dispatch: any) => {
        const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCRRKVYBM8k8vyxWfoKlzutNKcFbic0V3g', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password,
                returnSecureToken: true,
            })
        });
        const data = await response.json();
        console.log(data)
        if (!response.ok) {
            console.log(data.error.message)
        } else {
            dispatch({ type: SIGNUP, payload: data });
            //console.log(email);
            dispatch(fetchChatrooms());
        }
    }
}

export const signin = (email: any, password: any) => {
    return async (dispatch: any) => {
        const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCRRKVYBM8k8vyxWfoKlzutNKcFbic0V3g', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: email,
                password: password,
                returnSecureToken: true,
            })
        });
        const data = await response.json();
        console.log(data)
        if (!response.ok) {
            console.log(data.error.message)
        } else {
            dispatch({ type: SIGNUP, payload: data });
            dispatch(fetchChatrooms());
            //console.log(email);
        }
    }
}

export const updateUserInfo = (name: any, chatNotifications: any) => {
    return async (dispatch: any, getState: any) => {
        const token = getState().user.idToken;
        const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCRRKVYBM8k8vyxWfoKlzutNKcFbic0V3g', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                idToken: token,
                displayName: name,
                chatNotifications: chatNotifications,
            })
        });
        const data = await response.json();
        console.log(data);

        if (!response.ok) {
            console.log(data.error)
            //There was a problem..
        } else {
            dispatch({ type: UPDATE_USER, payload: data}); //{chatMessages, chatroom}
            }
            //console.log(chatMessages)

          
        }

    }


