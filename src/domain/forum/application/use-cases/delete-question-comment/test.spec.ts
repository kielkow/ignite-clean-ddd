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

	it('should be able to delete question commet by ID', async () => {
		const comment = makeQuestionComment()

		await inMemoryQuestionsRepository.create(comment)

		await sut.execute(comment.id)

		const questionComment = await inMemoryQuestionsRepository.findById(
			comment.id,
		)

		expect(questionComment).toBeUndefined()
	})
})
