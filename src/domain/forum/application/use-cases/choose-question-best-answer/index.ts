import { UniqueEntityID } from '@/core/entities/unique-entity-id'

import { AnswersRepository } from '../../repositories/answers-repository'
import { QuestionsRepository } from '../../repositories/questions-repository'

interface ChooseQuestionBestAnswerRequest {
	authorId: string
	answerId: string
	questionId: string
}

export class ChooseQuestionBestAnswerUseCase {
	constructor(
		private readonly answersRepository: AnswersRepository,
		private readonly questionsRepository: QuestionsRepository,
	) {}

	async execute({
		authorId,
		answerId,
		questionId,
	}: ChooseQuestionBestAnswerRequest): Promise<void> {
		const question = await this.questionsRepository.findById(questionId)
		if (!question) throw new Error('Question not found')

		const answer = await this.answersRepository.findById(answerId)
		if (!answer) throw new Error('Question not found')

		if (answer.questionId.id !== questionId) {
			throw new Error('Answer does not belong to the question')
		}

		if (question.authorId.id !== authorId) {
			throw new Error('Only the author can choose the question best answer')
		}

		question.bestAnswerId = new UniqueEntityID(answerId)

		return await this.questionsRepository.editQuestion(question)
	}
}
