import {
	Question,
	QuestionProps,
} from '@/domain/forum/enterprise/entities/question'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

export function makeQuestion(props: Partial<QuestionProps> = {}): Question {
	return Question.create({
		title: 'This is the title',
		content: 'This is the question',
		authorId: new UniqueEntityID('1'),
		...props,
	})
}
