import { PaginationParams } from '@/core/repositories/pagination-params'

import { AnswerComment } from '@/domain/forum/enterprise/entities/answer-comment'

import { AnswersRepository } from '../../repositories/answers-repository'
import { AnswersCommentsRepository } from '../../repositories/answers-comments-repository'

export class ListAnswerCommentsUseCase {
	constructor(
		private answersRepository: AnswersRepository,
		private readonly answerCommentRepository: AnswersCommentsRepository,
	) {}

	async execute(
		answerId: string,
		{ page = 1, perPage = 10 }: PaginationParams,
	): Promise<AnswerComment[]> {
		const answer = await this.answersRepository.findById(answerId)
		if (!answer) throw new Error('Answer not found')

		const answerComments = await this.answerCommentRepository.findAll({
			answerId,
			page,
			perPage,
		})

		return answerComments
	}
}
