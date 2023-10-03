import { randomUUID } from "crypto";

export class Answer {
    public id: string;
    public content: string;
    public questionId: string;
    public instructorId: string;

    constructor (content: string, questionId: string, instructorId: string, id?: string,) {
        this.content = content;
        this.questionId = questionId;
        this.instructorId = instructorId;

        this.id = id ? id : randomUUID();
    }
}
