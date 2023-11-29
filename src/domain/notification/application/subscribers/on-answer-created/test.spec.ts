import { makeAnswer } from '@/test/factories/make-answer'
import { InMemoryAnswersRepository } from '@/test/repositories/in-memory-answers-repository'

import { OnAnswerCreated } from '.'

describe('OnAnswerCreated', () => {
	let inMemoryAnswersRepository: InMemoryAnswersRepository
	let sut: OnAnswerCreated

	beforeEach(() => {
		inMemoryAnswersRepository = new InMemoryAnswersRepository()
		sut = new OnAnswerCreated()
		console.info('Subscriber Created:', sut)
	})

	it('should be able send notification when answer is created', async () => {
		const answer = makeAnswer()

		await inMemoryAnswersRepository.createAnswer(answer)
	})
})
