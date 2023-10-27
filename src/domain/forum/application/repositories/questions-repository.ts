import { Question } from '../../enterprise/entities/question'

export interface QuestionsRepository {
	createQuestion(question: Question): Promise<Question>

	findBySlug(slug: string): Promise<Question | undefined>

	findById(id: string): Promise<Question | undefined>

	deleteQuestion(id: string): Promise<void>
}
