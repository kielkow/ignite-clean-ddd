import { Answer } from '../../enterprise/entities/answer'

export interface AnswersRepository {
	createAnswer(answer: Answer): Promise<Answer>

	findByQuestionID(questionId: string): Promise<Answer[]>
}
