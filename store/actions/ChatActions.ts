import User from '../../models/User';
import ChatMessages from '../../models/ChatMessages';
import ChatRoom from '../../models/ChatRoom';


export const NEW_CHATMESSAGE = 'NEW_CHATMESSAGE';
export const NEW_CHATROOM = 'NEW_CHATROOM';
export const FETCHED_CHATROOMS = 'FETCHED_CHATROOMS';

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
       //console.log(data);

        if (!response.ok) {
            //There was a problem..
        } else {
            let chatrooms: ChatRoom[] = [];

            
            for (const key in data) {
                const loadedMessages = [];
 
                for (const key2 in data[key].chatMessages) {
                    let msg = new ChatMessages(key2,data[key].chatMessages[key2].message, new Date(data[key].chatMessages[key2].created), data[key].chatMessages[key2].user);
 
                    loadedMessages.push(msg);
 
                    }
                chatrooms.push(new ChatRoom(key, data[key].name, new Date(data[key].created), loadedMessages))
                // chatrooms.forEach(chatroom => console.log(chatroom.id))
            }
            
            dispatch({ type: FETCHED_CHATROOMS, payload: chatrooms });
        }
    };
};

export const createChatroom = (chatroomName: any) => {
    return async (dispatch: any, getState: any) => {
        let chatroom = new ChatRoom('', chatroomName, new Date() , [])
        const token = getState().user.idToken;

        const response = await fetch(
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
        //console.log(data);

        if (!response.ok) {

        } else {
            chatroom.id = data.name;
            dispatch({ type: NEW_CHATROOM, payload: chatroom })
            dispatch(fetchChatrooms());
        }

    }
};

export const createChatMessage = (message: any, chatroomId: any) => {
    return async (dispatch: any, getState: any) => {
        const token = getState().user.idToken
        const user = getState().user
         console.log(user)

        let chatMessages = new ChatMessages('', message, new Date(), user);
        let chatroom = chatroomId;

        const response = await fetch(
            'https://cbsstudents-9a50e-default-rtdb.firebaseio.com/chatrooms/' + chatroom + '/chatMessages.json?auth=' + token, {

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
        // console.log(data);
        if (!response.ok) {
            console.log('There was a problem')
        } else {
            chatMessages.id = data.name;
            dispatch({ type: NEW_CHATMESSAGE, payload: {chatMessages, chatroom}}) // chatMessages
            dispatch(fetchChatrooms());
        }
    }
};
