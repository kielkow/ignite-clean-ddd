import { QuestionComment } from '@/domain/forum/enterprise/entities/question-comment'
import { QuestionsCommentsRepository } from '@/domain/forum/application/repositories/questions-comments-repository'

export class InMemoryQuestionsCommentsRepository
	implements QuestionsCommentsRepository
{
	private questionsComments: QuestionComment[] = []

	async create(questionComment: QuestionComment): Promise<QuestionComment> {
		this.questionsComments.push(questionComment)
		return questionComment
	}

	async findById(id: string): Promise<QuestionComment | undefined> {
		return this.questionsComments.find(
			(questionComment) => questionComment.id === id,
		)
	}

	async findAll(questionId: string): Promise<QuestionComment[]> {
		return this.questionsComments.filter(
			(questionComment) => questionComment.questionId.id === questionId,
		)
	}

	async delete(id: string): Promise<void> {
		this.questionsComments = this.questionsComments.filter(
			(questionComment) => questionComment.id !== id,
		)
	}
}
