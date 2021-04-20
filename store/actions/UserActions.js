export const SIGNUP = 'SIGNUP';
export const SIGNIN = 'SIGNIN';

export const signup = (email, password) => {
    return async dispatch => {
        const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDkqcoE5i9cGbZlW2u4YLXcKsZWPpITHR8', {
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
            console.log('there was a problem')
        } else {
            dispatch({ type: SIGNUP, payload: data });
            console.log(email);
        }
    }
}

export const signin = (email, password) => {
    return async dispatch => {
        const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDkqcoE5i9cGbZlW2u4YLXcKsZWPpITHR8', {
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
            console.log('there was a problem')
        } else {
            dispatch({ type: SIGNUP, payload: data });
            console.log(email);
        }
    }
}