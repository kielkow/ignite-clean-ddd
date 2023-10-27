import { makeQuestion } from '@/test/factories/make-question'
import { InMemoryQuestionsRepository } from '@/test/repositories/in-memory-questions-repository'

import { FindQuestionBySlugUseCase } from '.'

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

		const question = await sut.execute('this-is-the-title')

		expect(question).toEqual({
			_uniqueEnityId: {
				_id: question?.id,
			},
			_props: {
				authorId: {
					_id: expect.any(String),
				},
				content: expect.any(String),
				title: 'This is the title',
				difficulty: 'medium',
				slug: {
					value: 'this-is-the-title',
				},
			},
			_createdAt: expect.any(Date),
			_updatedAt: undefined,
		})
	})
})
