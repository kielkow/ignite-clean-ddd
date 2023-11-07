import { makeQuestion } from '@/test/factories/make-question'
import { InMemoryQuestionsRepository } from '@/test/repositories/in-memory-questions-repository'
import { InMemoryQuestionsCommentsRepository } from '@/test/repositories/in-memory-questions-comments-repository'

import { ListQuestionCommentsUseCase } from '.'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { makeQuestionComment } from '@/test/factories/make-question-comment'

describe('CommentOnQuestionUseCase', () => {
	let inMemoryQuestionsCommentsRepository: InMemoryQuestionsCommentsRepository,
		inMemoryQuestionsRepository: InMemoryQuestionsRepository

	let sut: ListQuestionCommentsUseCase

	beforeEach(() => {
		inMemoryQuestionsCommentsRepository =
			new InMemoryQuestionsCommentsRepository()
		inMemoryQuestionsRepository = new InMemoryQuestionsRepository()

		sut = new ListQuestionCommentsUseCase(
			inMemoryQuestionsRepository,
			inMemoryQuestionsCommentsRepository,
		)
	})

	it('should be able to list comments from question', async () => {
		const question = await inMemoryQuestionsRepository.createQuestion(
			makeQuestion(),
		)

		await inMemoryQuestionsCommentsRepository.create(
			makeQuestionComment({
				questionId: new UniqueEntityID(question.id),
			}),
		)

		const questionComments = await sut.execute(question.id, {
			page: 1,
			perPage: 10,
		})

		expect(questionComments).toEqual([
			{
				_uniqueEnityId: {
					_id: expect.any(String),
				},
				_props: {
					authorId: {
						_id: expect.any(String),
					},
					content: expect.any(String),
					questionId: {
						_id: question.id,
					},
				},
				_createdAt: expect.any(Date),
				_updatedAt: undefined,
			},
		])
	})

	it('should not be able to list comments from question if question does not exists', async () => {
		await expect(
			sut.execute('non-existing-question-id', {
				page: 1,
				perPage: 10,
			}),
		).rejects.toThrow('Question not found')
	})

	it('should be able to list comments from question with pagination', async () => {
		const question = await inMemoryQuestionsRepository.createQuestion(
			makeQuestion(),
		)

		const firstComment = await inMemoryQuestionsCommentsRepository.create(
			makeQuestionComment({
				questionId: new UniqueEntityID(question.id),
			}),
		)

		const secondComment = await inMemoryQuestionsCommentsRepository.create(
			makeQuestionComment({
				questionId: new UniqueEntityID(question.id),
			}),
		)

		const firstPageQuestionComments = await sut.execute(question.id, {
			page: 1,
			perPage: 1,
		})

		const secondPageQuestionComments = await sut.execute(question.id, {
			page: 2,
			perPage: 1,
		})

		expect(firstPageQuestionComments).toEqual([
			{
				_uniqueEnityId: {
					_id: firstComment.id,
				},
				_props: {
					authorId: {
						_id: expect.any(String),
					},
					content: expect.any(String),
					questionId: {
						_id: question.id,
					},
				},
				_createdAt: expect.any(Date),
				_updatedAt: undefined,
			},
		])

		expect(secondPageQuestionComments).toEqual([
			{
				_uniqueEnityId: {
					_id: secondComment.id,
				},
				_props: {
					authorId: {
						_id: expect.any(String),
					},
					content: expect.any(String),
					questionId: {
						_id: question.id,
					},
				},
				_createdAt: expect.any(Date),
				_updatedAt: undefined,
			},
		])
	})
})