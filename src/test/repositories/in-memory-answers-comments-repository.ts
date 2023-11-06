import { AnswerComment } from '@/domain/forum/enterprise/entities/answer-comment'
import { AnswersCommentsRepository } from '@/domain/forum/application/repositories/answers-comments-repository'

export class InMemoryAnswersCommentsRepository
	implements AnswersCommentsRepository
{
	private answersComments: AnswerComment[] = []

	async create(answerComment: AnswerComment): Promise<AnswerComment> {
		this.answersComments.push(answerComment)
		return answerComment
	}

	async findById(id: string): Promise<AnswerComment | undefined> {
		return this.answersComments.find((answerComment) => answerComment.id === id)
	}

	async findAll(answerId: string): Promise<AnswerComment[]> {
		return this.answersComments.filter(
			(answerComment) => answerComment.answerId.id === answerId,
		)
	}

	async delete(id: string): Promise<void> {
		this.answersComments = this.answersComments.filter(
			(answerComment) => answerComment.id !== id,
		)
	}
}
