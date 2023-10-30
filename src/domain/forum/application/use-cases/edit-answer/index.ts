import { AnswersRepository } from '../../repositories/answers-repository'

interface EditAnswerRequest {
	id: string
	authorId: string
	content: string
}

export class EditAnswerUseCase {
	constructor(private readonly answersRepository: AnswersRepository) {}

	async execute({ id, authorId, content }: EditAnswerRequest): Promise<void> {
		const answer = await this.answersRepository.findById(id)

		if (!answer) throw new Error('Answer not found')

		if (answer.authorId.id !== authorId) {
			throw new Error('Only the author can edit the answer')
		}

		answer.content = content

		return await this.answersRepository.editAnswer(answer)
	}
}
