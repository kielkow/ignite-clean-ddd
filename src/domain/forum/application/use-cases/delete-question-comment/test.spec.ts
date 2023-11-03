import { makeQuestionComment } from '@/test/factories/make-question-comment'
import { InMemoryQuestionsCommentsRepository } from '@/test/repositories/in-memory-questions-comments-repository'

import { DeleteQuestionCommentUseCase } from '.'

describe('DeleteQuestionCommentByIdUseCase', () => {
	let inMemoryQuestionsRepository: InMemoryQuestionsCommentsRepository
	let sut: DeleteQuestionCommentUseCase

	beforeEach(() => {
		inMemoryQuestionsRepository = new InMemoryQuestionsCommentsRepository()
		sut = new DeleteQuestionCommentUseCase(inMemoryQuestionsRepository)
	})

	it('should be able to delete question comment by ID', async () => {
		const comment = makeQuestionComment()

		await inMemoryQuestionsRepository.create(comment)

		await sut.execute({
			id: comment.id,
			authorId: comment.authorId.id,
		})

		const questionComment = await inMemoryQuestionsRepository.findById(
			comment.id,
		)

		expect(questionComment).toBeUndefined()
	})

	it('should not be able to delete question comment by ID if it does not exist', async () => {
		await expect(
			sut.execute({
				id: 'invalid_id',
				authorId: 'any_author_id',
			}),
		).rejects.toThrow('Question comment not found')
	})

	it('should not be able to delete question comment by ID if user is not the author', async () => {
		const comment = makeQuestionComment()

		await inMemoryQuestionsRepository.create(comment)

		await expect(
			sut.execute({
				id: comment.id,
				authorId: 'invalid_author_id',
			}),
		).rejects.toThrow('You are not allowed to delete this question comment')
	})
})
