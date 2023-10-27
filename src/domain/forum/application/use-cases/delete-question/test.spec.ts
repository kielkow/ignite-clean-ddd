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

		await sut.execute(question.id)

		const questionExists = await inMemoryQuestionsRepository.findById(
			question.id,
		)

		expect(questionExists).toBeUndefined()
	})
})
