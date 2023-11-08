import { ResponseHandling, fail, success } from '@/core/response-handling'
import { AnswersCommentsRepository } from '../../repositories/answers-comments-repository'

interface Input {
	id: string
	authorId: string
}

type Output = ResponseHandling<string, void>

export class DeleteAnswerCommentUseCase {
	constructor(
		private readonly answerCommentRepository: AnswersCommentsRepository,
	) {}

	async execute({ id, authorId }: Input): Promise<Output> {
		const answerComment = await this.answerCommentRepository.findById(id)

		if (!answerComment) return fail('Answer comment not found')

		if (answerComment.authorId.id !== authorId) {
			return fail('You are not allowed to delete this answer comment')
		}

		await this.answerCommentRepository.delete(id)

		return success()
	}
}
