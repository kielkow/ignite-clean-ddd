import { makeQuestion } from '@/test/factories/make-question'
import { InMemoryQuestionsRepository } from '@/test/repositories/in-memory-questions-repository'

import { EditQuestionUseCase } from '.'

describe('EditQuestionUseCase', () => {
	let inMemoryQuestionsRepository: InMemoryQuestionsRepository
	let sut: EditQuestionUseCase

	beforeEach(() => {
		inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
		sut = new EditQuestionUseCase(inMemoryQuestionsRepository)
	})

	it('should be able to edit an question', async () => {
		const question = await inMemoryQuestionsRepository.createQuestion(
			makeQuestion(),
		)

		await sut.execute({
			id: question.id,
			authorId: question.authorId.id,
			title: 'Edit Title',
			content: 'Edit Content',
		})

		const questionEdited = await inMemoryQuestionsRepository.findById(
			question.id,
		)

		expect(questionEdited).toBeTruthy()
		expect(questionEdited?.title).toBe('Edit Title')
		expect(questionEdited?.content).toBe('Edit Content')
	})

	it('should not be able to edit an question if is not the author', async () => {
		const question = await inMemoryQuestionsRepository.createQuestion(
			makeQuestion(),
		)

		await expect(
			sut.execute({
				id: question.id,
				authorId: 'non-author-id',
				title: 'Edit Title',
				content: 'Edit Content',
			}),
		).rejects.toThrow('Only the author can edit the question')
	})
})
