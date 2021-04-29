import { NEW_CHATMESSAGE, FETCHED_CHATROOMS } from '../actions/ChatActions';
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
            
        default:
            return state
    }
}

export default ChatReducer;