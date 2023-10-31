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

	it('should not be able to choose question best answer if question does not exist', async () => {
		await expect(
			sut.execute({
				authorId: 'any_author_id',
				answerId: 'any_answer_id',
				questionId: 'any_question_id',
			}),
		).rejects.toThrow('Question not found')
	})

	it('should not be able to choose question best answer if answer does not exist', async () => {
		const question = await inMemoryQuestionsRepository.createQuestion(
			makeQuestion(),
		)

		await expect(
			sut.execute({
				authorId: question.authorId.id,
				answerId: 'any_answer_id',
				questionId: question.id,
			}),
		).rejects.toThrow('Question not found')
	})

	it('should not be able to choose question best answer if answer does not belong to the question', async () => {
		const question = await inMemoryQuestionsRepository.createQuestion(
			makeQuestion(),
		)

		const answer = await inMemoryAnswersRepository.createAnswer(makeAnswer())

		await expect(
			sut.execute({
				authorId: question.authorId.id,
				answerId: answer.id,
				questionId: question.id,
			}),
		).rejects.toThrow('Answer does not belong to the question')
	})

	it('should not be able to choose question best answer if author is not the question author', async () => {
		const question = await inMemoryQuestionsRepository.createQuestion(
			makeQuestion(),
		)

		const answer = await inMemoryAnswersRepository.createAnswer(
			makeAnswer({
				questionId: new UniqueEntityID(question.id),
			}),
		)

		await expect(
			sut.execute({
				authorId: 'any_author_id',
				answerId: answer.id,
				questionId: question.id,
			}),
		).rejects.toThrow('Only the author can choose the question best answer')
	})
})
