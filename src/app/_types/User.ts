import { Client } from "./Client";
import { Status } from "./Status";

export class User implements Client {

    /*
        * SOCKET ID: Every user is a socket and has a unique ID 
        * for communication between client and server. It varies on
        * every page reload.
    */
   
    sId: string
    status?: Status | undefined = Status.Online
    newIncomingMessageCount: number = 0

    username: string
    avatar: string

    constructor(username: string, sId: string, avatar: string) {
        this.username = username
        this.sId = sId
        this.avatar = avatar
    }

    toString(): string {
        return this.username
    }
}