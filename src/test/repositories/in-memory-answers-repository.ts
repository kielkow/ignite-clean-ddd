import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { AnswersRepository } from '@/domain/forum/application/repositories/answers-repository'
import { Answer } from '@/domain/forum/enterprise/entities/answer'

export class InMemoryAnswersRepository implements AnswersRepository {
	private answers: Answer[] = []

	async createAnswer(answer: Answer): Promise<Answer> {
		this.answers.push(answer)
		return answer
	}

	async findByQuestionID(questionId: string): Promise<Answer[]> {
		return this.answers.filter(
			(answer) => answer.questionId.id === new UniqueEntityID(questionId).id,
		)
	}
}
