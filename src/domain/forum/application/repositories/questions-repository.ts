import { Question } from '../../enterprise/entities/question'

export interface QuestionsRepository {
	createQuestion(question: Question): Promise<Question>
}
