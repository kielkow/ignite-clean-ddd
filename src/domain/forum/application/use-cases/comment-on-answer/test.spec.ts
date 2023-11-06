import { InMemoryAnswersRepository } from '@/test/repositories/in-memory-answers-repository'
import { InMemoryAnswersCommentsRepository } from '@/test/repositories/in-memory-answers-comments-repository'

import { CommentOnAnswerUseCase } from '.'
import { makeAnswer } from '@/test/factories/make-answer'

describe('CommentOnAnswerUseCase', () => {
	let inMemoryAnswersCommentsRepository: InMemoryAnswersCommentsRepository,
		inMemoryAnswersRepository: InMemoryAnswersRepository

	let sut: CommentOnAnswerUseCase

	beforeEach(() => {
		inMemoryAnswersCommentsRepository = new InMemoryAnswersCommentsRepository()
		inMemoryAnswersRepository = new InMemoryAnswersRepository()

		sut = new CommentOnAnswerUseCase(
			inMemoryAnswersRepository,
			inMemoryAnswersCommentsRepository,
		)
	})

	it('should be able to create an answer comment', async () => {
		const answer = await inMemoryAnswersRepository.createAnswer(makeAnswer())

		const answerComment = await sut.execute({
			answerId: answer.id,
			authorId: '1',
			content: 'This is the comment',
		})

		expect(answerComment).toEqual({
			_uniqueEnityId: {
				_id: answerComment.id,
			},
			_props: {
				authorId: {
					_id: '1',
				},
				content: 'This is the comment',
				answerId: {
					_id: answer.id,
				},
			},
			_createdAt: expect.any(Date),
			_updatedAt: undefined,
		})
	})

	it('should not be able to create an answer comment if answer does not exists', async () => {
		await expect(
			sut.execute({
				answerId: '1',
				authorId: '1',
				content: 'This is the comment',
			}),
		).rejects.toThrow('Answer not found')
	})
})
