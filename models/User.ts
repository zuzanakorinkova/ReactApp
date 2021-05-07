class User {
    id: string;
    name: string;
    email: string;
    image: string;
    title: string;
    chatNotification: boolean;

    constructor(id: string, name: string, email: string, image: string, title: string, chatNotification: boolean) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.image = image;
        this.title = title;
        this.chatNotification = chatNotification; // true / false
    }
}
// there is no password because we dont want to save users' data

export default User;