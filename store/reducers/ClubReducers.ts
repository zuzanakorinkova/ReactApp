
import { NEW_CHATMESSAGE, FETCHED_CLUBS, NEW_EVENT, NEW_POST, LIKE_POST, USER_GOING, USER_NOT_GOING, READ_MESSAGE, RESET_STORE } from '../actions/ClubActions';

import Clubs from '../../models/Clubs';
import Events from '../../models/Events';
import User from '../../models/User'
import ChatMessages from '../../models/ChatMessages';
import Posts from '../../models/Posts';
import {Action} from './UserReducers';
import { tassign } from 'tassign';

export interface ClubState {
    clubs: Clubs[];
    chatMessages: ChatMessages[];
    events: Events[];
    posts: Posts[];
    user: User[];
}

const initialState: ClubState = {
    clubs: [],
    chatMessages: [],
    events: [],
    posts: [],
    user: [],
}

const ClubReducer = (state = initialState, action: Action) => {
    const clubId = state.clubs.find(room => room.id === action.payload.club) as Clubs;
    const newClub: Clubs = {...clubId}
    switch (action.type) {
        case FETCHED_CLUBS:
            return tassign(state, {clubs: action.payload});
        
        case NEW_CHATMESSAGE:
            const message: ChatMessages[] = [...clubId.chatMessages, action.payload.chatMessages]

            newClub.chatMessages = message;

            const index: number = state.clubs.findIndex(room => room.id === action.payload.club)
            const chatroomArray: Clubs[] = [...state.clubs];
            return tassign(state, {clubs: chatroomArray});
            
        case READ_MESSAGE:
            // const messageId = clubId.chatMessages.find(message => message.id === action.payload.chatMessage) as ChatMessages

            // const newMessage: ChatMessages = {...messageId}

            return tassign(state, {clubs: action.payload})
     
        case NEW_EVENT:
            const event: Events[] = [...clubId.events, action.payload.event]

            newClub.events = event;

            const clubIndex: number = state.clubs.findIndex(room => room.id === action.payload.club)
            const clubArray: Clubs[] = [...state.clubs];
            return tassign(state, {clubs: clubArray});    

        case USER_GOING:
            const eventId = clubId.events.find(e => e.id === action.payload.event) as Events

            const users: User[] = [...eventId.users, action.payload.users]
            const newEvent: Events = {...eventId}
            newEvent.users = users
            const eventArray: Events[] = [...state.events]
            return tassign(state, {events: eventArray});
        
        case NEW_POST:
            const post: Posts[] = [...clubId.posts, action.payload.event]

            newClub.posts = post;

            const newArray: Clubs[] = [...state.clubs];
            return tassign(state, {clubs: newArray});   

        
        case LIKE_POST:
            const postId = clubId.posts.find(p => p.id === action.payload.post) as Posts

            const likes: User[] = [...postId.likes, action.payload.likes]
            const newPost: Posts = {...postId}
            newPost.likes = likes
            const newPostArray: Posts[] = [...state.posts]
            return tassign(state, {posts: newPostArray});
        
        case USER_NOT_GOING:
            const eventInfo = clubId.events.find(e => e.id === action.payload.event) as Events
            const userIndex = eventInfo.users.findIndex(s => s.id === action.payload.user)

            eventInfo.users.splice(userIndex, 1)
            const eventArrayCopy: Events[] = [...state.events]
            return tassign(state, {events: eventArrayCopy});

        case RESET_STORE: 
            return {
                user: new User('', '', '', '', '', false),
            }
        default:
            return state
    }
}

export default ClubReducer;