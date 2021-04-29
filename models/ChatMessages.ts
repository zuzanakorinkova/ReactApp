import User from './User';

class ChatMessages {
    id: string;
    message: string;
    created: Date;
    user: User;
    
    constructor(id: string, message: string, created: Date, user: User) {
        this.id = id;
        this.message = message;
        this.created = created;
        this.user = user;
    }
}
// there is no password because we dont want to save users' data

export default ChatMessages;