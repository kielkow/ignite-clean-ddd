import { makeAnswer } from '@/test/factories/make-answer'
import { InMemoryAnswersRepository } from '@/test/repositories/in-memory-answers-repository'

import { ListQuestionAnswersUseCase } from '.'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

describe('ListQuestionAnswersUseCase', () => {
	let inMemoryAnswersRepository: InMemoryAnswersRepository
	let sut: ListQuestionAnswersUseCase

	beforeEach(() => {
		inMemoryAnswersRepository = new InMemoryAnswersRepository()
		sut = new ListQuestionAnswersUseCase(inMemoryAnswersRepository)
	})

	it('should be able to list question answers', async () => {
		const questionId = new UniqueEntityID()

		await inMemoryAnswersRepository.createAnswer(
			makeAnswer({
				questionId,
			}),
		)
		await inMemoryAnswersRepository.createAnswer(
			makeAnswer({
				questionId,
			}),
		)
		await inMemoryAnswersRepository.createAnswer(
			makeAnswer({
				questionId,
			}),
		)
		await inMemoryAnswersRepository.createAnswer(makeAnswer())

		const answers = await sut.execute(questionId.id, { page: 1, perPage: 10 })

		expect(answers).toHaveLength(3)
	})

	it('should be able to list question answers by pagination', async () => {
		const questionId = new UniqueEntityID()

		await inMemoryAnswersRepository.createAnswer(
			makeAnswer({
				questionId,
			}),
		)
		await inMemoryAnswersRepository.createAnswer(
			makeAnswer({
				questionId,
			}),
		)
		await inMemoryAnswersRepository.createAnswer(
			makeAnswer({
				questionId,
			}),
		)
		await inMemoryAnswersRepository.createAnswer(
			makeAnswer({
				questionId,
			}),
		)

		const answersFirstPage = await sut.execute(questionId.id, {
			page: 1,
			perPage: 2,
		})
		const answersSecondPage = await sut.execute(questionId.id, {
			page: 2,
			perPage: 2,
		})

		expect(answersFirstPage).toHaveLength(2)
		expect(answersSecondPage).toHaveLength(2)
	})
})
