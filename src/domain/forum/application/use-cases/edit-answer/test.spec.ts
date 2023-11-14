import { Success, Fail } from '@/core/response-handling'

import { makeAnswer } from '@/test/factories/make-answer'
import { InMemoryAnswersRepository } from '@/test/repositories/in-memory-answers-repository'

import { NotAllowedError, ResourceNotFoundError } from '../../errors'

import { EditAnswerUseCase } from '.'

describe('EditAnswerUseCase', () => {
	let inMemoryAnswersRepository: InMemoryAnswersRepository
	let sut: EditAnswerUseCase

	beforeEach(() => {
		inMemoryAnswersRepository = new InMemoryAnswersRepository()
		sut = new EditAnswerUseCase(inMemoryAnswersRepository)
	})

	it('should be able to edit an answer', async () => {
		const answer = await inMemoryAnswersRepository.createAnswer(makeAnswer())

		const result = await sut.execute({
			id: answer.id,
			authorId: answer.authorId.id,
			content: 'Edit Content',
		})

		const answerEdited = await inMemoryAnswersRepository.findById(answer.id)

		expect(answerEdited).toBeTruthy()
		expect(answerEdited?.content).toBe('Edit Content')

		expect(Success.is(result)).toBe(true)
		expect(result).toBeInstanceOf(Success)
	})

	it('should not be able to edit an answer if is not the author', async () => {
		const answer = await inMemoryAnswersRepository.createAnswer(makeAnswer())

		const result = await sut.execute({
			id: answer.id,
			authorId: 'non-author-id',
			content: 'Edit Content',
		})

		expect(Fail.is(result)).toBe(true)
		expect(result).toBeInstanceOf(Fail)
		expect(result).toEqual({ error: expect.any(NotAllowedError) })
	})

	it('should not be able to edit an answer if does not exists', async () => {
		const result = await sut.execute({
			id: 'non-existing-answer-id',
			authorId: 'any-author-id',
			content: 'Edit Content',
		})

		expect(Fail.is(result)).toBe(true)
		expect(result).toBeInstanceOf(Fail)
		expect(result).toEqual({ error: expect.any(ResourceNotFoundError) })
	})
})
