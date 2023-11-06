import { AnswerComment } from '../../enterprise/entities/answer-comment'

export interface AnswersCommentsRepository {
	create(answerComment: AnswerComment): Promise<AnswerComment>

	findById(id: string): Promise<AnswerComment | undefined>

	findAll(answerId: string): Promise<AnswerComment[]>

	delete(id: string): Promise<void>
}
