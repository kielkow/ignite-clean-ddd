import { QuestionsRepository } from '@/domain/forum/application/repositories/questions-repository'
import { Question } from '@/domain/forum/enterprise/entities/question'

export class InMemoryQuestionsRepository implements QuestionsRepository {
	private questions: Question[] = []

	async createQuestion(question: Question): Promise<Question> {
		this.questions.push(question)
		return question
	}

	async findBySlug(slug: string): Promise<Question | undefined> {
		return this.questions.find((question) => question.slug.value === slug)
	}

	async findById(id: string): Promise<Question | undefined> {
		return this.questions.find((question) => question.id === id)
	}

	async deleteQuestion(id: string): Promise<void> {
		this.questions = this.questions.filter((question) => question.id !== id)
	}
}
