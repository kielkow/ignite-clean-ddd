import { makeAnswer } from '@/test/factories/make-answer'
import { InMemoryAnswersRepository } from '@/test/repositories/in-memory-answers-repository'

import { EditAnswerUseCase } from '.'

describe('EditAnswerUseCase', () => {
	let inMemoryAnswersRepository: InMemoryAnswersRepository
	let sut: EditAnswerUseCase

	beforeEach(() => {
		inMemoryAnswersRepository = new InMemoryAnswersRepository()
		sut = new EditAnswerUseCase(inMemoryAnswersRepository)
	})

	it('should be able to edit an answer', async () => {
		const answer = await inMemoryAnswersRepository.createAnswer(makeAnswer())

		await sut.execute({
			id: answer.id,
			authorId: answer.authorId.id,
			content: 'Edit Content',
		})

		const answerEdited = await inMemoryAnswersRepository.findById(answer.id)

		expect(answerEdited).toBeTruthy()
		expect(answerEdited?.content).toBe('Edit Content')
	})

	it('should not be able to edit an answer if is not the author', async () => {
		const answer = await inMemoryAnswersRepository.createAnswer(makeAnswer())

		await expect(
			sut.execute({
				id: answer.id,
				authorId: 'non-author-id',
				content: 'Edit Content',
			}),
		).rejects.toThrow('Only the author can edit the answer')
	})
})
