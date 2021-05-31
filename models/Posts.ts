import User from './User';

class Post {
    id: string;
    title: string;
    content: string;
    likes: User[];
    comments: User[];
    created: Date;

    constructor(id: string, title: string, content: string, likes: User[], comments: User[], created: Date) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.likes = likes;
        this.comments = comments;
        this.created = created;
    }
}