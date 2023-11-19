import { Answer } from '@/domain/forum/enterprise/entities/answer'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { ResponseHandling, success } from '@/core/response-handling'

import { AnswerAttachment } from '@/domain/forum/enterprise/entities/answer-attachment'

import { AnswersRepository } from '../../repositories/answers-repository'

interface Input {
	authorId: string
	questionId: string
	content: string
	attachmentsIds?: string[]
}

type Output = ResponseHandling<void, Answer>

export class AnswerQuestionUseCase {
	constructor(private readonly answersRepository: AnswersRepository) {}

	async execute({
		authorId,
		questionId,
		content,
		attachmentsIds,
	}: Input): Promise<Output> {
		const answerId = new UniqueEntityID()

		const answer = Answer.create(
			{
				content,
				questionId: new UniqueEntityID(questionId),
				authorId: new UniqueEntityID(authorId),
			},
			answerId,
		)

		if (attachmentsIds) {
			const answerAttachments = attachmentsIds.map((attachmentId) => {
				return AnswerAttachment.create({
					attachmentId: new UniqueEntityID(attachmentId),
					answerId,
				})
			})

			answer.attachments = answerAttachments
		}

		const result = await this.answersRepository.createAnswer(answer)

		return success(result)
	}
}
