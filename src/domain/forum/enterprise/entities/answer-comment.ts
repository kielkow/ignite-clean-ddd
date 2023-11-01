import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

export interface AnswerCommentProps {
	content: string
	answerId: UniqueEntityID
	authorId: UniqueEntityID
}

export class AnswerComment extends Entity<AnswerCommentProps> {
	get content() {
		return this.props.content
	}

	get answerId() {
		return this.props.answerId
	}

	get authorId() {
		return this.props.authorId
	}

	set content(value: string) {
		this.props.content = value
		this.touch()
	}

	private touch() {
		this.updatedAt = new Date()
	}

	static create(props: AnswerCommentProps, id?: UniqueEntityID) {
		const answerComment = new AnswerComment(props, id)
		return answerComment
	}
}
