import { NEW_EVENT } from '../actions/EventActions';
import ChatRoom from '../../models/ChatRoom';
import Events from '../../models/Events';
import {Action} from '../reducers/UserReducers';
import { tassign } from 'tassign';
//import {tassign} from 'tassign';

export interface ChatState {
    chatrooms: ChatRoom[];
    events: Events[];
}

const initialState: ChatState = {
    chatrooms: [],
    events: [],
}

const EventReducer = (state = initialState, action: Action) => {
    switch (action.type) {
        
        case NEW_EVENT:
            const chatroom = state.chatrooms.find(room => room.id === action.payload.chatroom) as ChatRoom;
            const event: Events[] = [...chatroom.events, action.payload.event]

            const newChatRoom: ChatRoom = {...chatroom};
            newChatRoom.events = event;

            const index: number = state.chatrooms.findIndex(room => room.id === action.payload.chatroom)
            const chatroomArray: ChatRoom[] = [...state.chatrooms];
            return tassign(state, {chatrooms: chatroomArray});
            
        default:
            return state
    }
}

export default EventReducer;