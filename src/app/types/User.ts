import { Client } from "./Client";
import { Status } from "./Status";

export class User implements Client {

    sId: string
    status?: Status | undefined = Status.Online

    constructor(sId: string) {
        this.sId = sId
    }

    toString() {
        return this.sId
    }
}