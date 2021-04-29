import ChatMessages from './ChatMessages'

class ChatRoom {
    id: string;
    name: string;
    created: Date;
    chatMessages: ChatMessages[]

    constructor(id: string, name: string, created: Date, chatMessages: ChatMessages[]) {
        this.id = id;
        this.name = name;
        this.created = created;
        this.chatMessages = chatMessages;
    }
}
// there is no password because we dont want to save users' data

export default ChatRoom;