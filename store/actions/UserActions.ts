import User from "../../models/User";
import {fetchClubs} from "./ClubActions";

//export const UPDATE_USER = 'UPDATE_USER';
export const SIGNUP = 'SIGNUP';
export const SIGNIN = 'SIGNIN';
export const SAVE_USER = 'SAVE_USER';
export const UPDATE_USER = 'UPDATE_USER'

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
            dispatch(fetchClubs());
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
        //console.log(data)
        if (!response.ok) {
            console.log(data.error.message)
        } else {
            dispatch({ type: SIGNUP, payload: data });
            dispatch(fetchClubs());
            //console.log(email);
        }
    }
}

export const updateUser = (userName: any, userEmail: any) => {
    return async (dispatch: any, getState: any) => { 
        const token = getState().idToken;
        let user = new User('', userName, userEmail, '', '', false) 
        const response = await fetch('https://cbsstudents-9a50e-default-rtdb.firebaseio.com/users.json?auth=' + token, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            
            body: JSON.stringify({
                name: user.name,
                email: user.email,
               // title: user.title
            }),
        });
        const data = await response.json();
        console.log(data)
        if(!response.ok){
            //console.log(data.error.message)
        }else {
            dispatch({type: UPDATE_USER, payload: data})
        }
    }
}
//, email: any, title: any

