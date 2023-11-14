import { ResponseHandling, success, fail } from '@/core/response-handling'

import { ResourceNotFoundError, NotAllowedError } from '../../errors'

import { AnswersRepository } from '../../repositories/answers-repository'

interface Input {
	id: string
	authorId: string
	content: string
}

type Output = ResponseHandling<ResourceNotFoundError | NotAllowedError, void>

export class EditAnswerUseCase {
	constructor(private readonly answersRepository: AnswersRepository) {}

	async execute({ id, authorId, content }: Input): Promise<Output> {
		const answer = await this.answersRepository.findById(id)

		if (!answer) return fail(new ResourceNotFoundError())

		if (answer.authorId.id !== authorId) return fail(new NotAllowedError())

		answer.content = content

		await this.answersRepository.editAnswer(answer)

		return success()
	}
}
