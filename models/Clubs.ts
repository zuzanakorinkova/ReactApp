import ChatMessages from './ChatMessages';
import Events from './Events';
import Posts from './Posts';

class Clubs {
    id: string;
    name: string;
    image: string;
    created: Date;
    chatMessages: ChatMessages[];
    events: Events[];
    posts: Posts[];
    


    constructor(id: string, name: string, image: string, created: Date, chatMessages: ChatMessages[], events: Events[], posts: Posts[]) {
        this.id = id;
        this.name = name;
        this.image = image;
        this.created = created;
        this.chatMessages = chatMessages;
        this.events = events;
        this.posts = posts;
    }
}
// there is no password because we dont want to save users' data

export default Clubs;