import { InMemoryQuestionsRepository } from '@/test/repositories/in-memory-questions-repository'
import { InMemoryQuestionsCommentsRepository } from '@/test/repositories/in-memory-questions-comments-repository'

import { CommentOnQuestionUseCase } from '.'
import { makeQuestion } from '@/test/factories/make-question'

describe('CommentOnQuestionUseCase', () => {
	let inMemoryQuestionsCommentsRepository: InMemoryQuestionsCommentsRepository,
		inMemoryQuestionsRepository: InMemoryQuestionsRepository

	let sut: CommentOnQuestionUseCase

	beforeEach(() => {
		inMemoryQuestionsCommentsRepository =
			new InMemoryQuestionsCommentsRepository()
		inMemoryQuestionsRepository = new InMemoryQuestionsRepository()

		sut = new CommentOnQuestionUseCase(
			inMemoryQuestionsRepository,
			inMemoryQuestionsCommentsRepository,
		)
	})

	it('should be able to create an question comment', async () => {
		const question = await inMemoryQuestionsRepository.createQuestion(
			makeQuestion(),
		)

		const questionComment = await sut.execute({
			questionId: question.id,
			authorId: '1',
			content: 'This is the comment',
		})

		expect(questionComment).toEqual({
			_uniqueEnityId: {
				_id: questionComment.id,
			},
			_props: {
				authorId: {
					_id: '1',
				},
				content: 'This is the comment',
				questionId: {
					_id: question.id,
				},
			},
			_createdAt: expect.any(Date),
			_updatedAt: undefined,
		})
	})

	it('should not be able to create an question comment if question does not exists', async () => {
		await expect(
			sut.execute({
				questionId: '1',
				authorId: '1',
				content: 'This is the comment',
			}),
		).rejects.toThrow('Question not found')
	})
})
