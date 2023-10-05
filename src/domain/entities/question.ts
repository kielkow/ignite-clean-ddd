import { randomUUID } from "crypto";

interface QuestionProps {
    title: string,
    content: string,
    authorId: string,
}
export class Question {
    public id: string;
    public title: string;
    public content: string;
    public category: string;
    public difficulty: 'easy' | 'medium' | 'hard';
    public authorId: string;

    constructor (props: QuestionProps, id?: string) {
        this.title = props.title;
        this.content = props.content;
        this.category = '';
        this.difficulty = 'medium';
        this.authorId = props.authorId;
        this.id = id ? id : randomUUID();
    }
}
