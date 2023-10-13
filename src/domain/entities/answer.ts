import { randomUUID } from 'crypto'

import { Entity } from '@/core/entities/entity'

interface AnswerProps {
	content: string
	questionId: string
	authorId: string
}
export class Answer extends Entity {
	public id: string
	public content: string
	public questionId: string
	public authorId: string

	constructor(props: AnswerProps, id?: string) {
		super()

		this.content = props.content
		this.questionId = props.questionId
		this.authorId = props.authorId
		this.id = id || randomUUID()
	}
}
