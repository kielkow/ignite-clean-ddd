import { AnswersRepository } from '@/domain/forum/application/repositories/answers-repository'
import { Answer } from '@/domain/forum/enterprise/entities/answer'

export class InMemoryAnswersRepository implements AnswersRepository {
	private answers: Answer[] = []

	async createAnswer(answer: Answer): Promise<Answer> {
		this.answers.push(answer)
		return answer
	}
}
