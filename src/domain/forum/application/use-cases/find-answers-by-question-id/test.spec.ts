import { Success } from '@/core/response-handling'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'

import { InMemoryAnswersRepository } from '@/test/repositories/in-memory-answers-repository'

import { FindAnswersByQuestionIDUseCase } from '.'
import { makeAnswer } from '@/test/factories/make-answer'

describe('FindAnswersByQuestionIDUseCase', () => {
	let inMemoryAnswersRepository: InMemoryAnswersRepository
	let sut: FindAnswersByQuestionIDUseCase

	beforeEach(() => {
		inMemoryAnswersRepository = new InMemoryAnswersRepository()
		sut = new FindAnswersByQuestionIDUseCase(inMemoryAnswersRepository)
	})

	it('should be able to find answers by question ID', async () => {
		const firstAnswerPayload = makeAnswer({
			authorId: new UniqueEntityID('1'),
			questionId: new UniqueEntityID('1'),
			content: 'This is the first answer',
		})
		await inMemoryAnswersRepository.createAnswer(firstAnswerPayload)

		const secondAnswerPayload = makeAnswer({
			authorId: new UniqueEntityID('2'),
			questionId: new UniqueEntityID('1'),
			content: 'This is the second answer',
		})
		await inMemoryAnswersRepository.createAnswer(secondAnswerPayload)

		const result = await sut.execute('1')
		const answers = result.getValue()

		expect(Success.is(result)).toBe(true)
		expect(result).toBeInstanceOf(Success)

		expect(answers).toEqual([
			{
				_uniqueEnityId: {
					_id: firstAnswerPayload.id,
				},
				_props: {
					authorId: {
						_id: firstAnswerPayload.authorId.id,
					},
					questionId: {
						_id: '1',
					},
					content: firstAnswerPayload.content,
				},
				_createdAt: expect.any(Date),
				_updatedAt: undefined,
			},
			{
				_uniqueEnityId: {
					_id: secondAnswerPayload.id,
				},
				_props: {
					authorId: {
						_id: secondAnswerPayload.authorId.id,
					},
					questionId: {
						_id: '1',
					},
					content: secondAnswerPayload.content,
				},
				_createdAt: expect.any(Date),
				_updatedAt: undefined,
			},
		])
	})

	it('should return an empty array if no answers are found', async () => {
		const result = await sut.execute('1')
		const answers = result.getValue()

		expect(Success.is(result)).toBe(true)
		expect(result).toBeInstanceOf(Success)

		expect(answers).toEqual([])
	})
})
