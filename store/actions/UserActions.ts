import User from "../../models/User";
import {fetchClubs} from "./ClubActions";

export const SIGNUP = 'SIGNUP';
export const SIGNUP_DETAIL_NAME = 'SIGNUP_DETAIL_NAME';
export const SIGNUP_DETAIL_TITLE = 'SIGNUP_DETAIL_TITLE';
export const SIGNIN = 'SIGNIN';
export const UPDATE_USER = 'UPDATE_USER'
export const RESET_STORE = 'RESET_STORE'

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
            dispatch({ type: SIGNUP, payload: data});
            //console.log(email);
            dispatch(fetchClubs());
        }
    }
}

export const signupDetailName = (name: any) => {
    // console.log("Action name: " + name);
    return {type: SIGNUP_DETAIL_NAME, payload: name};
}

export const signupDetailTitle = (title: any) => {
    // console.log("Action name: " + name);
    return {type: SIGNUP_DETAIL_TITLE, payload: title};
}

// Firebase 
// export const signupDetails = (name: any) => {
//     console.log("Action name: " + name);

//     return async (dispatch: any, getState: any) => { 
//         const token = getState().user.idToken;
//         const userId = getState().user.loggedInUser.id;

//         const response = await fetch('https://cbsstudents-9a50e-default-rtdb.firebaseio.com/users.json/?auth=' + token, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
            
//             body: JSON.stringify({
//                 name: name,
                // title: user.title
//             }),
//         });
//         const data = await response.json();
//         console.log(data);
//         if(!response.ok){
             //console.log(data.error.message)
//         }else {
//             dispatch({type: SIGNUP_DETAILS, payload: data})
//         }
//     }
// }

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
            // Breytti, type var SIGNUP
            dispatch({ type: SIGNIN, payload: data });
            // console.log("Log in: " + data.email)
            dispatch(fetchClubs());
            //console.log(email);
        }
    }
}

export const updateUser = (user: any) => {
    console.log("Action update user: " + user.name); // Response is the name.
    return {type: UPDATE_USER, payload: user};
}

// export const updateUser = (userName: any, userEmail: any) => {
//     return async (dispatch: any, getState: any) => { 
//         const token = getState().user.idToken;
//         let user = new User('', userName, userEmail, '', '', false) 
//         const response = await fetch('https://cbsstudents-9a50e-default-rtdb.firebaseio.com/users.json?auth=' + token, {
//             method: 'PUT',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
            
//             body: JSON.stringify({
//                 name: user.name,
//                 email: user.email,
                // title: user.title
//             }),
//         });
//         const data = await response.json();
//         console.log(data);
//         if(!response.ok){
            //console.log(data.error.message)
//         }else {
//             dispatch({type: UPDATE_USER, payload: data})
//         }
//     }
// }

export const logout = () => {
    return {type: RESET_STORE, payload: "" };
}