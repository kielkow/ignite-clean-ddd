import { randomUUID } from "crypto";

export class Question {
    public id: string;
    public title: string;
    public content: string;
    public category: string;
    public difficulty: 'easy' | 'medium' | 'hard';

    constructor (title: string, content: string, id?: string,) {
        this.title = title;
        this.content = content;
        this.category = '';
        this.difficulty = 'medium';

        this.id = id ? id : randomUUID();
    }
}
