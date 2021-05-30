import User from '../../models/User';
import ChatMessages from '../../models/ChatMessages';
import Clubs from '../../models/Clubs';
import Events from '../../models/Events'


export const NEW_CHATMESSAGE = 'NEW_CHATMESSAGE';
export const NEW_CLUB = 'NEW_CLUB';
export const FETCHED_CLUBS = 'FETCHED_CLUBS';

export const NEW_EVENT = 'NEW_EVENT';
export const FETCHED_EVENTS = 'FETCH_EVENTS'
export const PUSH_USER = 'PUSH_USER'

export const fetchClubs = () => {
    return async (dispatch: any, getState: any) => {
        const token = getState().user.idToken;

        const response = await fetch(
            'https://cbsstudents-9a50e-default-rtdb.firebaseio.com/clubs.json?auth=' + token, {
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
            let clubs: Clubs[] = [];
            
            for (const key in data) {
                const loadedMessages = [];
                const loadedEvents = [];
                const loadedEventUsers = [];
                for (const key2 in data[key].chatMessages) {
                    let msg = new ChatMessages(key2,data[key].chatMessages[key2].message, new Date(data[key].chatMessages[key2].created), data[key].chatMessages[key2].user);
 
                    loadedMessages.push(msg);
                    }
                for (const key3 in data[key].events) {
                    for (const key4 in data[key].events[key3].users) {
                        let user = new User(key4, data[key].events[key3].users[key4].name, data[key].events[key3].users[key4].email, data[key].events[key3].users[key4].image, data[key].events[key3].users[key4].title, data[key].events[key3].users[key4].chatNotification)
                        loadedEventUsers.push(user)
                    }
                    let event = new Events(key3, data[key].events[key3].title, data[key].events[key3].description, data[key].events[key3].startDate, data[key].events[key3].endDate, data[key].events[key3].fromTime, data[key].events[key3].untilTime, data[key].events[key3].location, loadedEventUsers, data[key].events[key3].thumbnail)
                    loadedEvents.push(event)
                }

                clubs.push(new Clubs(key, data[key].name, data[key].image, new Date(data[key].created), loadedMessages, loadedEvents))
            }
            
            dispatch({ type: FETCHED_CLUBS, payload: clubs });
        }
    };
};

export const createClub = (clubName: any, image: any) => {
    return async (dispatch: any, getState: any) => {
        let club = new Clubs('', clubName, image, new Date() , [], [])
        const token = getState().user.idToken;

        const response = await fetch(
            'https://cbsstudents-9a50e-default-rtdb.firebaseio.com/clubs.json?auth=' + token, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: club.name,
                image: club.image,
                created: club.created,
                chatMessages: club.chatMessages
            })
        });

        const data = await response.json();
        //console.log(data);

        if (!response.ok) {

        } else {
            club.id = data.name;
            dispatch({ type: NEW_CLUB, payload: club })
            dispatch(fetchClubs());
        }

    }
};

export const createChatMessage = (message: any, clubId: any) => {
    return async (dispatch: any, getState: any) => {
        const token = getState().user.idToken
        const user = getState().user
         console.log(user)

        let chatMessages = new ChatMessages('', message, new Date(), user);
        let club = clubId;

        const response = await fetch(
            'https://cbsstudents-9a50e-default-rtdb.firebaseio.com/clubs/' + club + '/chatMessages.json?auth=' + token, {

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
            dispatch({ type: NEW_CHATMESSAGE, payload: {chatMessages, club}}) // chatMessages
            dispatch(fetchClubs());
        }
    }
};


export const createEvent = (title: any, description: any, startDate: any, endDate: any, fromTime: any, untilTime: any, location: any, thumbnail: any, clubId: any) => {
    return async (dispatch: any, getState: any) => {
        const token = getState().user.idToken

        let event = new Events('', title, description, startDate, endDate, fromTime, untilTime, location, [], thumbnail);
        let club = clubId;

        const response = await fetch(
            'https://cbsstudents-9a50e-default-rtdb.firebaseio.com/clubs/' + club + '/events.json?auth=' + token, {

            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: event.title,
                description: event.description,
                startDate: event.startDate,
                endDate: event.endDate,
                fromTime: event.fromTime,
                untilTime: event.untilTime,
                location: event.location,
                thumbnail: event.thumbnail
            })

        });
        const data = await response.json();
         //console.log(data);
        if (!response.ok) {
            console.log('There was a problem')
        } else {
            event.id = data.name;
            dispatch({ type: NEW_EVENT, payload: {event, club}}) // chatMessages
            dispatch(fetchClubs())
        }
    }
};

export const pushUser = (loggedInUser: any, clubId:any, eventId: any) => {
    return async (dispatch: any, getState: any) => {
        const token = getState().user.idToken
        let user = loggedInUser
        let event = eventId
        let club = clubId
        const response = await fetch(
            'https://cbsstudents-9a50e-default-rtdb.firebaseio.com/clubs/' + club + '/events/' + event + '/users.json?auth=' + token, {

            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                users: user
            })

        });
        const data = await response.json();
        console.log(data);
       if (!response.ok) {
           console.log('There was a problem')
       } else {
           user.id = data.name;
           dispatch({ type: PUSH_USER, payload: {user, club, event}}) // chatMessages
           dispatch(fetchClubs())
       }
    }
    
}


