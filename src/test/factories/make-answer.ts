import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Answer, AnswerProps } from '@/domain/forum/enterprise/entities/answer'

export function makeAnswer(props: Partial<AnswerProps> = {}): Answer {
	return Answer.create({
		authorId: new UniqueEntityID('1'),
		questionId: new UniqueEntityID('1'),
		content: 'This is the first answer',
		...props,
	})
}
