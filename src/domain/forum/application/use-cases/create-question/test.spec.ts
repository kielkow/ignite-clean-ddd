import { InMemoryQuestionsRepository } from '@/test/in-memory-questions-repository'

import { CreateQuestionUseCase } from '.'

describe('CreateQuestionUseCase', () => {
	let inMemoryQuestionsRepository: InMemoryQuestionsRepository
	let sut: CreateQuestionUseCase

	beforeEach(() => {
		inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
		sut = new CreateQuestionUseCase(inMemoryQuestionsRepository)
	})

	it('should be able to create an question', async () => {
		const question = await sut.execute({
			title: 'This is the title',
			content: 'This is the question',
			authorId: '1',
		})

		expect(question).toEqual({
			_uniqueEnityId: {
				_id: question.id,
			},
			_props: {
				authorId: {
					_id: '1',
				},
				content: 'This is the question',
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
