import { QuestionsRepository } from '../../repositories/questions-repository'

export class DeleteQuestionUseCase {
	constructor(private readonly questionsRepository: QuestionsRepository) {}

	async execute(id: string): Promise<void> {
		return await this.questionsRepository.deleteQuestion(id)
	}
}
