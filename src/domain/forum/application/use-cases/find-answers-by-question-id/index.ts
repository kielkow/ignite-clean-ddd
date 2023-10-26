import { Answer } from '@/domain/forum/enterprise/entities/answer'

import { AnswersRepository } from '../../repositories/answers-repository'

export class FindAnswersByQuestionIDUseCase {
	constructor(private readonly answersRepository: AnswersRepository) {}

	async execute(questionId: string): Promise<Answer[]> {
		return await this.answersRepository.findByQuestionID(questionId)
	}
}
