import { PaginationParams } from '@/core/repositories/pagination-params'

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

	async editQuestion(question: Question): Promise<void> {
		const index = this.questions.findIndex((q) => q.id === question.id)
		this.questions[index] = question
	}

	async listRecentQuestions(params: PaginationParams): Promise<Question[]> {
		const page = params.page || 1
		const perPage = params.perPage || 10

		return this.questions
			.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
			.slice((page - 1) * perPage, page * perPage)
	}
}
