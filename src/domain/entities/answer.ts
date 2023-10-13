import { randomUUID } from 'crypto'

interface AnswerProps {
	content: string
	questionId: string
	authorId: string
}
export class Answer {
	public id: string
	public content: string
	public questionId: string
	public authorId: string

	constructor(props: AnswerProps, id?: string) {
		this.content = props.content
		this.questionId = props.questionId
		this.authorId = props.authorId
		this.id = id || randomUUID()
	}
}
