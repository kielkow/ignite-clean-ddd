import { Answer } from '../entities/answer'

import { AnswersRepository } from '../repositories/answers-repository'

interface AnswerQuestionUseCaseRequest {
	authorId: string
	questionId: string
	content: string
}

export class AnswerQuestionUseCase {
	constructor(private readonly answersRepository: AnswersRepository) {}

	async execute({
		authorId,
		questionId,
		content,
	}: AnswerQuestionUseCaseRequest): Promise<Answer> {
		const answer = new Answer({
			content,
			questionId,
			authorId,
		})

		return await this.answersRepository.createAnswer(answer)
	}
}
