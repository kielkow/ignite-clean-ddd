import { QuestionComment } from '../../enterprise/entities/question-comment'

export interface QuestionsCommentsRepository {
	create(questionComment: QuestionComment): Promise<QuestionComment>

	findById(id: string): Promise<QuestionComment | undefined>

	findAll(questionId: string): Promise<QuestionComment[]>

	delete(id: string): Promise<void>
}
