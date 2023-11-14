import { Success, Fail } from '@/core/response-handling'
import { makeQuestion } from '@/test/factories/make-question'
import { InMemoryQuestionsRepository } from '@/test/repositories/in-memory-questions-repository'

import { NotAllowedError, ResourceNotFoundError } from '../../errors'

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

		const result = await sut.execute({
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

		expect(Success.is(result)).toBe(true)
		expect(result).toBeInstanceOf(Success)
	})

	it('should not be able to edit an question if is not the author', async () => {
		const question = await inMemoryQuestionsRepository.createQuestion(
			makeQuestion(),
		)

		const result = await sut.execute({
			id: question.id,
			authorId: 'non-author-id',
			title: 'Edit Title',
			content: 'Edit Content',
		})

		expect(Fail.is(result)).toBe(true)
		expect(result).toBeInstanceOf(Fail)
		expect(result).toEqual({ error: expect.any(NotAllowedError) })
	})

	it('should not be able to edit an question if does not exists', async () => {
		const result = await sut.execute({
			id: 'non-existing-question-id',
			authorId: 'any-author-id',
			title: 'Edit Title',
			content: 'Edit Content',
		})

		expect(Fail.is(result)).toBe(true)
		expect(result).toBeInstanceOf(Fail)
		expect(result).toEqual({ error: expect.any(ResourceNotFoundError) })
	})
})
