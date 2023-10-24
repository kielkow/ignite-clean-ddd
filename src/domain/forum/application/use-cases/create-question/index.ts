import { Question } from '@/domain/forum/enterprise/entities/question'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'

import { QuestionsRepository } from '../../repositories/questions-repository'

interface CreateQuestionUseCaseRequest {
	title: string
	content: string
	authorId: string
}

export class CreateQuestionUseCase {
	constructor(private readonly questionsRepository: QuestionsRepository) {}

	async execute({
		title,
		content,
		authorId,
	}: CreateQuestionUseCaseRequest): Promise<Question> {
		const question = Question.create({
			title,
			content,
			authorId: new UniqueEntityID(authorId),
		})

		return await this.questionsRepository.createQuestion(question)
	}
}
