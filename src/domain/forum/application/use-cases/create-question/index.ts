import { Question } from '@/domain/forum/enterprise/entities/question'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { ResponseHandling, success } from '@/core/response-handling'

import { QuestionsRepository } from '../../repositories/questions-repository'

interface Input {
	title: string
	content: string
	authorId: string
}

type Output = ResponseHandling<void, Question>

export class CreateQuestionUseCase {
	constructor(private readonly questionsRepository: QuestionsRepository) {}

	async execute({ title, content, authorId }: Input): Promise<Output> {
		const question = Question.create({
			title,
			content,
			authorId: new UniqueEntityID(authorId),
		})

		const result = await this.questionsRepository.createQuestion(question)

		return success(result)
	}
}
