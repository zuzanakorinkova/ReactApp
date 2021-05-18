import { NEW_CHATMESSAGE, FETCHED_CLUBS, NEW_EVENT, FETCHED_EVENTS } from '../actions/ClubActions';
import Clubs from '../../models/Clubs';
import Events from '../../models/Events';
import ChatMessages from '../../models/ChatMessages';
import {Action} from './UserReducers';
import { tassign } from 'tassign';
//import {tassign} from 'tassign';

export interface ClubState {
    clubs: Clubs[];
    chatMessages: ChatMessages[];
    events: Events[];
}

const initialState: ClubState = {
    clubs: [],
    chatMessages: [],
    events: [],
}

const ChatReducer = (state = initialState, action: Action) => {
    switch (action.type) {
        case FETCHED_CLUBS:
            return tassign(state, {clubs: action.payload});
        
        case NEW_CHATMESSAGE:
            const chatroom = state.clubs.find(room => room.id === action.payload.club) as Clubs;
            const message: ChatMessages[] = [...chatroom.chatMessages, action.payload.chatMessages]

            const newChatRoom: Clubs = {...chatroom};
            newChatRoom.chatMessages = message;

            const index: number = state.clubs.findIndex(room => room.id === action.payload.club)
            const chatroomArray: Clubs[] = [...state.clubs];
            return tassign(state, {clubs: chatroomArray});
            
        case FETCHED_EVENTS:
            return tassign(state, {events: action.payload});
            
        case NEW_EVENT:
            const club = state.clubs.find(room => room.id === action.payload.club) as Clubs;
            const event: Events[] = [...club.events, action.payload.event]

            const newClub: Clubs = {...club};
            newClub.events = event;

            const clubIndex: number = state.clubs.findIndex(room => room.id === action.payload.club)
            const clubArray: Clubs[] = [...state.clubs];
            return tassign(state, {clubs: clubArray});    
    
        default:
            return state
    }
}

export default ChatReducer;