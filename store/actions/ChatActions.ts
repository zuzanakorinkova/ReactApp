import User from '../../models/User';
import ChatMessages from '../../models/ChatMessages';
import ChatRoom from '../../models/ChatRoom';


export const NEW_CHATMESSAGE = 'NEW_CHATMESSAGE';
export const NEW_CHATROOM = 'NEW_CHATROOM';
export const FETCHED_CHATROOMS = 'FETCHED_CHATROOMS';
export const FETCHED_CHATMESSAGES = 'FETCHED_CHATMESSAGES';

export const fetchChatrooms = () => {
    return async (dispatch: any, getState: any) => {
        const token = getState().user.idToken;

        const response = await fetch(
            'https://cbsstudents-9a50e-default-rtdb.firebaseio.com/chatrooms.json?auth=' + token, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();
        console.log(data);

        if (!response.ok) {
            //There was a problem..
        } else {
            let chatrooms: ChatRoom[] = [];
            for (const key in data) {
                chatrooms.push(new ChatRoom(key, data[key].name, new Date(data[key].created), []))
            }
            console.log(chatrooms)

            dispatch({ type: FETCHED_CHATROOMS, payload: chatrooms });
        }
    };
};

export const createChatroom = (chatroomName: any) => {
    return async (dispatch: any, getState: any) => {
        let chatroom = new ChatRoom('', chatroomName, new Date() , [])
        const token = getState().user.idToken;
        console.log(token);

        const response = await fetch(
            // to save a chat message in a chat room:
            //https://cbsstudents-38267-default-rtdb.firebaseio.com/chatrooms/<chatroom_id>/chatMessages.json?auth=' + token, {
            'https://cbsstudents-9a50e-default-rtdb.firebaseio.com/chatrooms.json?auth=' + token, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: chatroom.name,
                created: chatroom.created,
                chatMessages: chatroom.chatMessages
            })
        });

        const data = await response.json();
        console.log(data);

        if (!response.ok) {

        } else {
            chatroom.id = data.name;
            dispatch({ type: NEW_CHATROOM, payload: chatroom })
        }

    }
};

export const createChatMessage = (message: any) => {
    return async (dispatch: any, getState: any) => {
        const token = getState().user.idToken
        let chatMessages = new ChatMessages('', message, new Date(), token);
        console.log(token);
        let chatroomId = '-MZUL2WfOppbkq_kNkh6';

        const response = await fetch(
            'https://cbsstudents-9a50e-default-rtdb.firebaseio.com/chatrooms/' + chatroomId + '/chatMessages.json?auth=' + token, {

            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                message: chatMessages.message,
                created: chatMessages.created,
                user: chatMessages.user,
            })

        });
        const data = await response.json();
        console.log(data);
        if (!response.ok) {
            console.log('There was a problem')
        } else {
            chatMessages.id = data.name;
            dispatch({ type: NEW_CHATMESSAGE, payload: chatMessages })
        }
    }
};

// export fetchChatMessage !!

export const fetchChatMessage = () => {
    return async (dispatch: any, getState: any) => {
        const token = getState().user.idToken;
        const chatroomId = '-MZI7c95qGX2cmWAxBlk';

        const response = await fetch(
            'https://cbsstudents-9a50e-default-rtdb.firebaseio.com/chatrooms/' +  chatroomId + '/chatMessages.json?auth=' + token, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();
        console.log(data);

        if (!response.ok) {
            console.log(data.error)
            //There was a problem..
        } else {
            let chatMessages: ChatMessages[] = [];
            for (const key in data) {
                chatMessages.push(new ChatMessages(key, data[key].message, new Date(data[key].created), data[key].user))
            }
            console.log(chatMessages)

            dispatch({ type: FETCHED_CHATMESSAGES, payload: chatMessages });
        }
    };
};