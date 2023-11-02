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
}
