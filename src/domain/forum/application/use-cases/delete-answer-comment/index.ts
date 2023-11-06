import { AnswersCommentsRepository } from '../../repositories/answers-comments-repository'

interface Input {
	id: string
	authorId: string
}

export class DeleteAnswerCommentUseCase {
	constructor(
		private readonly answerCommentRepository: AnswersCommentsRepository,
	) {}

	async execute({ id, authorId }: Input): Promise<void> {
		const answerComment = await this.answerCommentRepository.findById(id)

		if (!answerComment) {
			throw new Error('Answer comment not found')
		}

		if (answerComment.authorId.id !== authorId) {
			throw new Error('You are not allowed to delete this answer comment')
		}

		await this.answerCommentRepository.delete(id)
	}
}
