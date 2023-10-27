import { makeQuestion } from '@/test/factories/make-question'
import { InMemoryQuestionsRepository } from '@/test/repositories/in-memory-questions-repository'

import { DeleteQuestionUseCase } from '.'

describe('DeleteQuestionUseCase', () => {
	let inMemoryQuestionsRepository: InMemoryQuestionsRepository
	let sut: DeleteQuestionUseCase

	beforeEach(() => {
		inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
		sut = new DeleteQuestionUseCase(inMemoryQuestionsRepository)
	})

	it('should be able to delete an question', async () => {
		const question = await inMemoryQuestionsRepository.createQuestion(
			makeQuestion(),
		)

		await sut.execute({ id: question.id, authorId: question.authorId.id })

		const questionExists = await inMemoryQuestionsRepository.findById(
			question.id,
		)

		expect(questionExists).toBeUndefined()
	})

	it('should not be able to delete an question if is not the author', async () => {
		const question = await inMemoryQuestionsRepository.createQuestion(
			makeQuestion(),
		)

		await expect(
			sut.execute({ id: question.id, authorId: 'non-author-id' }),
		).rejects.toThrow('Only the author can delete the question')
	})
})
