import User from '../../models/User';
import ChatMessages from '../../models/ChatMessages';
import Clubs from '../../models/Clubs';
import Events from '../../models/Events';
import Posts from '../../models/Posts';


export const NEW_CHATMESSAGE = 'NEW_CHATMESSAGE';
export const NEW_CLUB = 'NEW_CLUB';
export const FETCHED_CLUBS = 'FETCHED_CLUBS';

export const NEW_EVENT = 'NEW_EVENT';
export const FETCHED_EVENTS = 'FETCH_EVENTS';
export const PUSH_USER = 'PUSH_USER';
export const NEW_POST = 'NEW_POST';
export const LIKE_POST = 'LIKE_POST';

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
                const loadedPosts = [];
                const loadedEventUsers = [];
                const loadedLikes = [];
                
                for (const key2 in data[key].chatMessages) {
                    let msg = new ChatMessages(key2,data[key].chatMessages[key2].message, new Date(data[key].chatMessages[key2].created), data[key].chatMessages[key2].user);
 
                    loadedMessages.push(msg);
                    }
                for (const key2 in data[key].events) {
                    for (const key3 in data[key].events[key2].users) {
                        let user = new User(key3, data[key].events[key2].users[key3].name, data[key].events[key2].users[key3].email, data[key].events[key2].users[key3].image, data[key].events[key2].users[key3].title, data[key].events[key2].users[key3].chatNotification)
                        loadedEventUsers.push(user)
                    }
                    let event = new Events(key2, data[key].events[key2].title, data[key].events[key2].description, data[key].events[key2].startDate, data[key].events[key2].endDate, data[key].events[key2].location, loadedEventUsers, data[key].events[key2].thumbnail)
                    loadedEvents.push(event)
                }
                for (const key2 in data[key].posts) {
                    for (const key3 in data[key].posts[key2].likes){
                        let like = new User(key3, data[key].posts[key2].likes[key3].name, data[key].posts[key2].likes[key3].email, data[key].posts[key2].likes[key3].image, data[key].posts[key2].likes[key3].title, data[key].posts[key2].likes[key3].chatNotification)
                        loadedLikes.push(like)
                    }
                    let post = new Posts(key2, data[key].posts[key2].title, data[key].posts[key2].content, loadedLikes, [], new Date(data[key].posts[key2].created))
                    loadedPosts.push(post)
                  
                } 

                clubs.push(new Clubs(key, data[key].name, data[key].image, new Date(data[key].created), loadedMessages, loadedEvents, loadedPosts))
            }
            
            dispatch({ type: FETCHED_CLUBS, payload: clubs });
        }
    };
};

export const createClub = (clubName: any, image: any) => {
    return async (dispatch: any, getState: any) => {
        let club = new Clubs('', clubName, image, new Date() , [], [], [])
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


export const createEvent = (title: any, description: any, startDate: any, endDate: any, location: any, thumbnail: any, clubId: any) => {
    return async (dispatch: any, getState: any) => {
        const token = getState().user.idToken

        let event = new Events('', title, description, startDate, endDate, location, [], thumbnail);
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
        //console.log(data);
       if (!response.ok) {
           console.log('There was a problem')
       } else {
           user.id = data.name;
           dispatch({ type: PUSH_USER, payload: {user, club, event}}) // chatMessages
           dispatch(fetchClubs())
       }
    }
    
};

export const createPost = (title: any, content: any, clubId: any) => {
    return async (dispatch: any, getState: any) => {
        const token = getState().user.idToken
        let club = clubId
        let post = new Posts('', title, content, [], [], new Date());
        const response = await fetch(
            'https://cbsstudents-9a50e-default-rtdb.firebaseio.com/clubs/' + club + '/posts.json?auth=' + token, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title: post.title,
                    content: post.content,
                    created: post.created
                })
            });
            const data = await response.json();
            console.log(data)
            if(!response.ok) {
                console.log('something went wrong')
            } else {
                post.id = data.name
                dispatch({type: NEW_POST, payload: {post, club}})
                dispatch(fetchClubs());
            }
    }
};

export const likePost = (loggedInUser: any, clubId:any, postId: any) => {
    return async (dispatch: any, getState: any) => {
        const token = getState().user.idToken
        let like = loggedInUser
        let post = postId
        let club = clubId
        const response = await fetch(
            'https://cbsstudents-9a50e-default-rtdb.firebaseio.com/clubs/' + club + '/posts/' + post + '/likes.json?auth=' + token, {

            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                likes: like
            })

        });
        const data = await response.json();
        //console.log(data);
       if (!response.ok) {
           console.log('There was a problem')
       } else {
           like.id = data.name;
           dispatch({ type: LIKE_POST, payload: {like, club, post}}) 
           dispatch(fetchClubs())
       }
    }
    
};



