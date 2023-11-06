import { QuestionComment } from '@/domain/forum/enterprise/entities/question-comment'

import { QuestionsRepository } from '../../repositories/questions-repository'
import { QuestionsCommentsRepository } from '../../repositories/questions-comments-repository'

export class ListQuestionCommentsUseCase {
	constructor(
		private questionsRepository: QuestionsRepository,
		private readonly questionCommentRepository: QuestionsCommentsRepository,
	) {}

	async execute(questionId: string): Promise<QuestionComment[]> {
		const question = await this.questionsRepository.findById(questionId)
		if (!question) throw new Error('Question not found')

		const questionComments = await this.questionCommentRepository.findAll(
			questionId,
		)

		return questionComments
	}
}
