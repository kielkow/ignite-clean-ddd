import { QuestionsCommentsRepository } from '../../repositories/questions-comments-repository'

interface Input {
	id: string
	authorId: string
}

export class DeleteQuestionCommentUseCase {
	constructor(
		private readonly questionCommentRepository: QuestionsCommentsRepository,
	) {}

	async execute({ id, authorId }: Input): Promise<void> {
		const questionComment = await this.questionCommentRepository.findById(id)

		if (!questionComment) {
			throw new Error('Question comment not found')
		}

		if (questionComment.authorId.id !== authorId) {
			throw new Error('You are not allowed to delete this question comment')
		}

		await this.questionCommentRepository.delete(id)
	}
}
