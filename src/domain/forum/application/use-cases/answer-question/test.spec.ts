import { InMemoryAnswersRepository } from '@/test/in-memory-answers-repository'

import { AnswerQuestionUseCase } from '.'

describe('AnswerQuestionUseCase', () => {
	let inMemoryAnswersRepository: InMemoryAnswersRepository
	let sut: AnswerQuestionUseCase

	beforeEach(() => {
		inMemoryAnswersRepository = new InMemoryAnswersRepository()
		sut = new AnswerQuestionUseCase(inMemoryAnswersRepository)
	})

	it('should be able to create an answer', async () => {
		const answer = await sut.execute({
			authorId: '1',
			questionId: '1',
			content: 'This is the answer',
		})

		expect(answer).toEqual({
			_uniqueEnityId: {
				_id: answer.id,
			},
			_props: {
				authorId: {
					_id: '1',
				},
				questionId: {
					_id: '1',
				},
				content: 'This is the answer',
			},
			_createdAt: expect.any(Date),
			_updatedAt: undefined,
		})
	})
})
