import { makeAnswer } from '@/test/factories/make-answer'
import { InMemoryAnswersRepository } from '@/test/repositories/in-memory-answers-repository'
import { InMemoryAnswersCommentsRepository } from '@/test/repositories/in-memory-answers-comments-repository'

import { ListAnswerCommentsUseCase } from '.'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { makeAnswerComment } from '@/test/factories/make-answer-comment'

describe('CommentOnAnswerUseCase', () => {
	let inMemoryAnswersCommentsRepository: InMemoryAnswersCommentsRepository,
		inMemoryAnswersRepository: InMemoryAnswersRepository

	let sut: ListAnswerCommentsUseCase

	beforeEach(() => {
		inMemoryAnswersCommentsRepository = new InMemoryAnswersCommentsRepository()
		inMemoryAnswersRepository = new InMemoryAnswersRepository()

		sut = new ListAnswerCommentsUseCase(
			inMemoryAnswersRepository,
			inMemoryAnswersCommentsRepository,
		)
	})

	it('should be able to list comments from answer', async () => {
		const answer = await inMemoryAnswersRepository.createAnswer(makeAnswer())

		await inMemoryAnswersCommentsRepository.create(
			makeAnswerComment({
				answerId: new UniqueEntityID(answer.id),
			}),
		)

		const answerComments = await sut.execute(answer.id, {
			page: 1,
			perPage: 10,
		})

		expect(answerComments).toEqual([
			{
				_uniqueEnityId: {
					_id: expect.any(String),
				},
				_props: {
					authorId: {
						_id: expect.any(String),
					},
					content: expect.any(String),
					answerId: {
						_id: answer.id,
					},
				},
				_createdAt: expect.any(Date),
				_updatedAt: undefined,
			},
		])
	})

	it('should not be able to list comments from answer if answer does not exists', async () => {
		await expect(
			sut.execute('non-existing-answer-id', {
				page: 1,
				perPage: 10,
			}),
		).rejects.toThrow('Answer not found')
	})

	it('should be able to list comments from answer with pagination', async () => {
		const answer = await inMemoryAnswersRepository.createAnswer(makeAnswer())

		const firstComment = await inMemoryAnswersCommentsRepository.create(
			makeAnswerComment({
				answerId: new UniqueEntityID(answer.id),
			}),
		)

		const secondComment = await inMemoryAnswersCommentsRepository.create(
			makeAnswerComment({
				answerId: new UniqueEntityID(answer.id),
			}),
		)

		const firstPageAnswerComments = await sut.execute(answer.id, {
			page: 1,
			perPage: 1,
		})

		const secondPageAnswerComments = await sut.execute(answer.id, {
			page: 2,
			perPage: 1,
		})

		expect(firstPageAnswerComments).toEqual([
			{
				_uniqueEnityId: {
					_id: firstComment.id,
				},
				_props: {
					authorId: {
						_id: expect.any(String),
					},
					content: expect.any(String),
					answerId: {
						_id: answer.id,
					},
				},
				_createdAt: expect.any(Date),
				_updatedAt: undefined,
			},
		])

		expect(secondPageAnswerComments).toEqual([
			{
				_uniqueEnityId: {
					_id: secondComment.id,
				},
				_props: {
					authorId: {
						_id: expect.any(String),
					},
					content: expect.any(String),
					answerId: {
						_id: answer.id,
					},
				},
				_createdAt: expect.any(Date),
				_updatedAt: undefined,
			},
		])
	})
})
