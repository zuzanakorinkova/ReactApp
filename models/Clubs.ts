import ChatMessages from './ChatMessages'
import Events from './Events'

class Clubs {
    id: string;
    name: string;
    image: string;
    created: Date;
    chatMessages: ChatMessages[];
    events: Events[];


    constructor(id: string, name: string, image: string, created: Date, chatMessages: ChatMessages[], events: Events[]) {
        this.id = id;
        this.name = name;
        this.image = image;
        this.created = created;
        this.chatMessages = chatMessages;
        this.events = events
    }
}
// there is no password because we dont want to save users' data

export default Clubs;