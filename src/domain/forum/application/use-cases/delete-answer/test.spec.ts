import { makeAnswer } from '@/test/factories/make-answer'
import { InMemoryAnswersRepository } from '@/test/repositories/in-memory-answers-repository'

import { DeleteAnswerUseCase } from '.'

describe('DeleteAnswerUseCase', () => {
	let inMemoryAnswersRepository: InMemoryAnswersRepository
	let sut: DeleteAnswerUseCase

	beforeEach(() => {
		inMemoryAnswersRepository = new InMemoryAnswersRepository()
		sut = new DeleteAnswerUseCase(inMemoryAnswersRepository)
	})

	it('should be able to delete an answer', async () => {
		const answer = await inMemoryAnswersRepository.createAnswer(makeAnswer())

		await sut.execute({ id: answer.id, authorId: answer.authorId.id })

		const answerExists = await inMemoryAnswersRepository.findById(answer.id)

		expect(answerExists).toBeUndefined()
	})

	it('should not be able to delete an answer if is not the author', async () => {
		const answer = await inMemoryAnswersRepository.createAnswer(makeAnswer())

		await expect(
			sut.execute({ id: answer.id, authorId: 'non-author-id' }),
		).rejects.toThrow('Only the author can delete the answer')
	})
})
