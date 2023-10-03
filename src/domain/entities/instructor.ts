import { randomUUID } from "crypto";

export class Instructor {
    public id: string;
    public name: string;
    public email: string;

    constructor(name: string, email: string, id?: string,) {
        this.name = name;
        this.email = email;

        this.id = id ? id : randomUUID();
    }
}
