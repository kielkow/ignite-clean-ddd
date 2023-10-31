import { UniqueEntityID } from '@/core/entities/unique-entity-id'

import { makeAnswer } from '@/test/factories/make-answer'
import { makeQuestion } from '@/test/factories/make-question'

import { InMemoryAnswersRepository } from '@/test/repositories/in-memory-answers-repository'
import { InMemoryQuestionsRepository } from '@/test/repositories/in-memory-questions-repository'

import { ChooseQuestionBestAnswerUseCase } from '.'

describe('ChooseQuestionBestAnswerUseCase', () => {
	let inMemoryAnswersRepository: InMemoryAnswersRepository
	let inMemoryQuestionsRepository: InMemoryQuestionsRepository
	let sut: ChooseQuestionBestAnswerUseCase

	beforeEach(() => {
		inMemoryAnswersRepository = new InMemoryAnswersRepository()
		inMemoryQuestionsRepository = new InMemoryQuestionsRepository()

		sut = new ChooseQuestionBestAnswerUseCase(
			inMemoryAnswersRepository,
			inMemoryQuestionsRepository,
		)
	})

	it('should be able to choose question best answer', async () => {
		const question = await inMemoryQuestionsRepository.createQuestion(
			makeQuestion(),
		)

		const answer = await inMemoryAnswersRepository.createAnswer(
			makeAnswer({
				questionId: new UniqueEntityID(question.id),
			}),
		)

		await sut.execute({
			authorId: question.authorId.id,
			answerId: answer.id,
			questionId: question.id,
		})

		const questionEdited = await inMemoryQuestionsRepository.findById(
			question.id,
		)

		expect(questionEdited).toBeTruthy()
		expect(questionEdited?.bestAnswerId).toBeTruthy()
		expect(questionEdited?.bestAnswerId?.id).toEqual(answer.id)
	})
})
