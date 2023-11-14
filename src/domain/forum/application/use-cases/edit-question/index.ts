import { ResponseHandling, success, fail } from '@/core/response-handling'

import { ResourceNotFoundError, NotAllowedError } from '../../errors'

import { QuestionsRepository } from '../../repositories/questions-repository'

interface Input {
	id: string
	authorId: string
	title: string
	content: string
}

type Output = ResponseHandling<ResourceNotFoundError | NotAllowedError, void>

export class EditQuestionUseCase {
	constructor(private readonly questionsRepository: QuestionsRepository) {}

	async execute({ id, authorId, title, content }: Input): Promise<Output> {
		const question = await this.questionsRepository.findById(id)

		if (!question) return fail(new ResourceNotFoundError())

		if (question.authorId.id !== authorId) {
			return fail(new NotAllowedError())
		}

		question.title = title
		question.content = content

		await this.questionsRepository.editQuestion(question)

		return success()
	}
}
