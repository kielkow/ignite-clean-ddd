import { Fail, Success } from '@/core/response-handling'

import { makeQuestion } from '@/test/factories/make-question'
import { InMemoryQuestionsRepository } from '@/test/repositories/in-memory-questions-repository'

import { FindQuestionBySlugUseCase } from '.'

import { ResourceNotFoundError } from '../../errors'

describe('FindQuestionBySlugUseCase', () => {
	let inMemoryQuestionsRepository: InMemoryQuestionsRepository
	let sut: FindQuestionBySlugUseCase

	beforeEach(() => {
		inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
		sut = new FindQuestionBySlugUseCase(inMemoryQuestionsRepository)
	})

	it('should be able to find question by slug', async () => {
		const payloadQuestion = makeQuestion({
			title: 'This is the title',
		})

		await inMemoryQuestionsRepository.createQuestion(payloadQuestion)

		const result = await sut.execute({ slug: 'this-is-the-title' })
		const question = result.getValue()

		expect(question).toEqual({
			_uniqueEnityId: {
				_id: payloadQuestion.id,
			},
			_props: {
				authorId: {
					_id: expect.any(String),
				},
				content: expect.any(String),
				title: 'This is the title',
				difficulty: expect.any(String),
				slug: {
					value: 'this-is-the-title',
				},
			},
			_createdAt: expect.any(Date),
			_updatedAt: undefined,
		})

		expect(Success.is(result)).toBe(true)
		expect(result).toBeInstanceOf(Success)
	})

	it('should not be able to find question by slug if does not exists', async () => {
		const result = await sut.execute({ slug: 'this-is-the-title' })

		expect(Fail.is(result)).toBe(true)
		expect(result).toBeInstanceOf(Fail)
		expect(result).toEqual({ error: expect.any(ResourceNotFoundError) })
	})
})
