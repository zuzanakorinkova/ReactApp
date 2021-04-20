class User {
    constructor(id, name, email, image, title, chatNotification) {
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