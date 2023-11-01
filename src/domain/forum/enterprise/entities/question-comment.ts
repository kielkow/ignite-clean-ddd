import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

export interface QuestionCommentProps {
	content: string
	questionId: UniqueEntityID
	authorId: UniqueEntityID
}

export class QuestionComment extends Entity<QuestionCommentProps> {
	get content() {
		return this.props.content
	}

	get questionId() {
		return this.props.questionId
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

	static create(props: QuestionCommentProps, id?: UniqueEntityID) {
		const questionComment = new QuestionComment(props, id)
		return questionComment
	}
}
