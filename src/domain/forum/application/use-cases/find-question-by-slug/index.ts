import { Question } from '@/domain/forum/enterprise/entities/question'

import { QuestionsRepository } from '../../repositories/questions-repository'

export class FindQuestionBySlugUseCase {
	constructor(private readonly questionsRepository: QuestionsRepository) {}

	async execute(slug: string): Promise<Question> {
		const question = await this.questionsRepository.findBySlug(slug)

		if (!question) {
			throw new Error('Question not found')
		}

		return question
	}
}
