import Events from '../../models/Events'


export const NEW_EVENT = 'NEW_EVENT';



export const createEvent = (title: any, description: any, startDate: any, endDate: any, location: any, chatroomId: any) => {
    return async (dispatch: any, getState: any) => {
        const token = getState().user.idToken

        let event = new Events('', title, description, startDate, endDate, location, [], '');
        let chatroom = chatroomId;

        const response = await fetch(
            'https://cbsstudents-9a50e-default-rtdb.firebaseio.com/chatrooms/' + chatroom + '/events.json?auth=' + token, {

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
            })

        });
        const data = await response.json();
         console.log(data);
        if (!response.ok) {
            console.log('There was a problem')
        } else {
            event.id = data.name;
            dispatch({ type: NEW_EVENT, payload: {event, chatroom}}) // chatMessages
        }
    }
};
