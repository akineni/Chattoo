import { Client } from "./Client";
import { Status } from "./Status";

export class User implements Client {

    sId: string
    status?: Status | undefined = Status.Online
    newIncomingMessageCount: number = 0
    username: string

    constructor(username: string, sId: string) {
        this.username = username
        this.sId = sId
    }

    toString(): string {
        return this.username
    }
}