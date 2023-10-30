import { AnswersRepository } from '../../repositories/answers-repository'

interface DeleteAnswerRequest {
	id: string
	authorId: string
}

export class DeleteAnswerUseCase {
	constructor(private readonly answersRepository: AnswersRepository) {}

	async execute({ id, authorId }: DeleteAnswerRequest): Promise<void> {
		const answer = await this.answersRepository.findById(id)

		if (!answer) {
			throw new Error('Answer not found')
		}

		if (answer.authorId.id !== authorId) {
			throw new Error('Only the author can delete the answer')
		}

		return await this.answersRepository.deleteAnswer(id)
	}
}
