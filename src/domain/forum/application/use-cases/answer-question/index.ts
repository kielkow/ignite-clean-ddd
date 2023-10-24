import { Answer } from '@/domain/forum/enterprise/entities/answer'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'

import { AnswersRepository } from '../../repositories/answers-repository'

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
		const answer = Answer.create({
			content,
			questionId: new UniqueEntityID(questionId),
			authorId: new UniqueEntityID(authorId),
		})

		return await this.answersRepository.createAnswer(answer)
	}
}
