import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

interface AnswerProps {
	content: string
	questionId: UniqueEntityID
	authorId: UniqueEntityID
}

export class Answer extends Entity<AnswerProps> {
	get content() {
		return this.props.content
	}

	get questionId() {
		return this.props.questionId
	}

	get authorId() {
		return this.props.authorId
	}

	static create(props: AnswerProps, id?: UniqueEntityID) {
		const answer = new Answer(props, id)
		return answer
	}
}
