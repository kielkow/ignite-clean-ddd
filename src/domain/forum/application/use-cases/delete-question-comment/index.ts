import { QuestionsCommentsRepository } from '../../repositories/questions-comments-repository'

export class DeleteQuestionCommentUseCase {
	constructor(
		private readonly questionCommentRepository: QuestionsCommentsRepository,
	) {}

	async execute(id: string): Promise<void> {
		await this.questionCommentRepository.delete(id)
	}
}
