import { NEW_CHATMESSAGE, FETCHED_CHATROOMS, FETCHED_CHATMESSAGES } from '../actions/ChatActions';
import ChatRoom from '../../models/ChatRoom';
import ChatMessages from '../../models/ChatMessages';
import {Action} from '../reducers/UserReducers';
import { tassign } from 'tassign';
//import {tassign} from 'tassign';

export interface ChatState {
    chatrooms: ChatRoom[];
    chatMessages: ChatMessages[];
}

const initialState: ChatState = {
    chatrooms: [],
    chatMessages: [],
}

const ChatReducer = (state = initialState, action: Action) => {
    switch (action.type) {
        case FETCHED_CHATROOMS:
            return tassign(state, {chatrooms: action.payload});
        
        case NEW_CHATMESSAGE:
            const chatroom = state.chatrooms.find(room => room.id === action.payload.chatroom) as ChatRoom;
            const message: ChatMessages[] = [...chatroom.chatMessages, action.payload.chatMessages]

            const newChatRoom: ChatRoom = {...chatroom};
            newChatRoom.chatMessages = message;

            const index: number = state.chatrooms.findIndex(room => room.id === action.payload.chatroom)
            const chatroomArray: ChatRoom[] = [...state.chatrooms];
            return tassign(state, {chatrooms: chatroomArray})
        
        case FETCHED_CHATMESSAGES:
            return tassign(state, {chatMessages: action.payload});
            
        default:
            return state
    }
}

export default ChatReducer;