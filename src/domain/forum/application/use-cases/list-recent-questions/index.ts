import { Question } from '@/domain/forum/enterprise/entities/question'
import { PaginationParams } from '@/core/repositories/pagination-params'

import { QuestionsRepository } from '../../repositories/questions-repository'

export class ListRecentQuestionsUseCase {
	constructor(private readonly questionsRepository: QuestionsRepository) {}

	async execute({
		page = 1,
		perPage = 10,
	}: PaginationParams): Promise<Question[]> {
		const questions = await this.questionsRepository.listRecentQuestions({
			page,
			perPage,
		})

		return questions
	}
}
