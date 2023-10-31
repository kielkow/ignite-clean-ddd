import { makeQuestion } from '@/test/factories/make-question'
import { InMemoryQuestionsRepository } from '@/test/repositories/in-memory-questions-repository'

import { ListRecentQuestionsUseCase } from '.'

describe('ListRecentQuestionsUseCase', () => {
	let inMemoryQuestionsRepository: InMemoryQuestionsRepository
	let sut: ListRecentQuestionsUseCase

	beforeEach(() => {
		inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
		sut = new ListRecentQuestionsUseCase(inMemoryQuestionsRepository)
	})

	it('should be able to list recent questions', async () => {
		await inMemoryQuestionsRepository.createQuestion(
			makeQuestion({}, undefined, new Date('2021-01-01')),
		)
		await inMemoryQuestionsRepository.createQuestion(
			makeQuestion({}, undefined, new Date('2021-01-02')),
		)
		await inMemoryQuestionsRepository.createQuestion(
			makeQuestion({}, undefined, new Date('2021-01-03')),
		)

		const questions = await sut.execute({ page: 1, perPage: 10 })

		expect(questions).toHaveLength(3)
		expect(questions[0].createdAt).toEqual(new Date('2021-01-03'))
		expect(questions[1].createdAt).toEqual(new Date('2021-01-02'))
		expect(questions[2].createdAt).toEqual(new Date('2021-01-01'))
	})

	it('should be able to list recent questions by pagination', async () => {
		await inMemoryQuestionsRepository.createQuestion(
			makeQuestion({}, undefined, new Date('2021-01-01')),
		)
		await inMemoryQuestionsRepository.createQuestion(
			makeQuestion({}, undefined, new Date('2021-01-02')),
		)
		await inMemoryQuestionsRepository.createQuestion(
			makeQuestion({}, undefined, new Date('2021-01-03')),
		)
		await inMemoryQuestionsRepository.createQuestion(
			makeQuestion({}, undefined, new Date('2021-01-04')),
		)

		const questionsFirstPage = await sut.execute({ page: 1, perPage: 2 })
		const questionsSecondPage = await sut.execute({ page: 2, perPage: 2 })

		expect(questionsFirstPage).toHaveLength(2)
		expect(questionsFirstPage[0].createdAt).toEqual(new Date('2021-01-04'))
		expect(questionsFirstPage[1].createdAt).toEqual(new Date('2021-01-03'))

		expect(questionsSecondPage).toHaveLength(2)
		expect(questionsSecondPage[0].createdAt).toEqual(new Date('2021-01-02'))
		expect(questionsSecondPage[1].createdAt).toEqual(new Date('2021-01-01'))
	})
})
