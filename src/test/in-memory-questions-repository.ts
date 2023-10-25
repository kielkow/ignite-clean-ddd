import { QuestionsRepository } from '@/domain/forum/application/repositories/questions-repository'
import { Question } from '@/domain/forum/enterprise/entities/question'

export class InMemoryQuestionsRepository implements QuestionsRepository {
	private questions: Question[] = []

	async createQuestion(question: Question): Promise<Question> {
		this.questions.push(question)
		return question
	}
}
