import { QuestionsRepository } from '../../repositories/questions-repository'

interface DeleteQuestionRequest {
	id: string
	authorId: string
}

export class DeleteQuestionUseCase {
	constructor(private readonly questionsRepository: QuestionsRepository) {}

	async execute({ id, authorId }: DeleteQuestionRequest): Promise<void> {
		const question = await this.questionsRepository.findById(id)

		if (!question) {
			throw new Error('Question not found')
		}

		if (question.authorId.id !== authorId) {
			throw new Error('Only the author can delete the question')
		}

		return await this.questionsRepository.deleteQuestion(id)
	}
}
