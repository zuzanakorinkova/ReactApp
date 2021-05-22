import User from './User';

class Event {
    id: string;
    title: string;
    description: string;
    startDate: Date;
    endDate: Date;
    fromTime: Date;
    untilTime: Date;
    location: string;
    users: User[];
    thumbnail: string;

    constructor(id: string, title: string, desctiption: string, startDate: Date, endDate: Date, fromTime: Date, untilTime: Date, location: string, users: User[], thumbnail: string) {
        this.id = id;
        this.title = title;
        this.description = desctiption;
        this.startDate = startDate;
        this.endDate = endDate;
        this.fromTime = fromTime;
        this.untilTime = untilTime;
        this.location = location;
        this.users = users;
        this.thumbnail = thumbnail;
    }
}

export default Event

