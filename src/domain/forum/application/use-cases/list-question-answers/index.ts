import { Answer } from '@/domain/forum/enterprise/entities/answer'
import { PaginationParams } from '@/core/repositories/pagination-params'

import { AnswersRepository } from '../../repositories/answers-repository'

export class ListQuestionAnswersUseCase {
	constructor(private readonly answersRepository: AnswersRepository) {}

	async execute(
		questionId: string,
		{ page = 1, perPage = 10 }: PaginationParams,
	): Promise<Answer[]> {
		const answers = await this.answersRepository.listQuetionAnswers({
			questionId,
			page,
			perPage,
		})

		return answers
	}
}
