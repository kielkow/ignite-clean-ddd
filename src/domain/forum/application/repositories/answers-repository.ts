import { Answer } from '../../enterprise/entities/answer'

export interface AnswersRepository {
	createAnswer(answer: Answer): Promise<Answer>

	findById(id: string): Promise<Answer | undefined>

	findByQuestionID(questionId: string): Promise<Answer[]>

	deleteAnswer(id: string): Promise<void>
}
