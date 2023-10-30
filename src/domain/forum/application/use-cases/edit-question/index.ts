import { QuestionsRepository } from '../../repositories/questions-repository'

interface EditQuestionRequest {
	id: string
	authorId: string
	title: string
	content: string
}

export class EditQuestionUseCase {
	constructor(private readonly questionsRepository: QuestionsRepository) {}

	async execute({
		id,
		authorId,
		title,
		content,
	}: EditQuestionRequest): Promise<void> {
		const question = await this.questionsRepository.findById(id)

		if (!question) throw new Error('Question not found')

		if (question.authorId.id !== authorId) {
			throw new Error('Only the author can edit the question')
		}

		question.title = title
		question.content = content

		return await this.questionsRepository.editQuestion(question)
	}
}
