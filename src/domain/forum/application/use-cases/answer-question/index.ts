import { Answer } from '@/domain/forum/enterprise/entities/answer'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { ResponseHandling, success } from '@/core/response-handling'

import { AnswersRepository } from '../../repositories/answers-repository'

interface Input {
	authorId: string
	questionId: string
	content: string
}

type Output = ResponseHandling<void, Answer>

export class AnswerQuestionUseCase {
	constructor(private readonly answersRepository: AnswersRepository) {}

	async execute({ authorId, questionId, content }: Input): Promise<Output> {
		const answer = Answer.create({
			content,
			questionId: new UniqueEntityID(questionId),
			authorId: new UniqueEntityID(authorId),
		})

		const result = await this.answersRepository.createAnswer(answer)

		return success(result)
	}
}
