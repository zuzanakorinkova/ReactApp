import { NEW_CHATMESSAGE, FETCHED_CLUBS, NEW_EVENT, FETCHED_EVENTS, PUSH_USER } from '../actions/ClubActions';
import Clubs from '../../models/Clubs';
import Events from '../../models/Events';
import User from '../../models/User'
import ChatMessages from '../../models/ChatMessages';
import {Action} from './UserReducers';
import { tassign } from 'tassign';
//import {tassign} from 'tassign';

export interface ClubState {
    clubs: Clubs[];
    chatMessages: ChatMessages[];
    events: Events[];
    user: User[]
}

const initialState: ClubState = {
    clubs: [],
    chatMessages: [],
    events: [],
    user: [],
}

const ClubReducer = (state = initialState, action: Action) => {
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

        case PUSH_USER:
            const clubs = state.clubs.find(c => c.id === action.payload.club) as Clubs;
            // find event id inside the club id
            const eventId = clubs.events.find(e => e.id === action.payload.event) as Events;
            // get the user array
            const users: User[] = [...eventId.users, action.payload.users]
            const newEvent: Events = {...eventId}
            newEvent.users = users
            const eventArray: Events[] = [...state.events]
            return tassign(state, {events: eventArray})

        default:
            return state
    }
}

export default ClubReducer;