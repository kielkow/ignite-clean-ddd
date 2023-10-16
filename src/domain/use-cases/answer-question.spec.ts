import { expect, test } from 'vitest'

import { Answer } from '../entities/answer'
import { AnswerQuestionUseCase } from './answer-question'

const fakeAnswersRepository = {
	createAnswer: async (answer: Answer) => answer,
}

test('create an answer', async () => {
	const answerQuestion = new AnswerQuestionUseCase(fakeAnswersRepository)

	const answer = await answerQuestion.execute({
		authorId: '1',
		questionId: '1',
		content: 'This is the answer',
	})

	expect(answer).toEqual({
		_uniqueEnityId: {
			_id: answer.id,
		},
		_props: {
			authorId: {
				_id: '1',
			},
			questionId: {
				_id: '1',
			},
			content: 'This is the answer',
		},
		_createdAt: expect.any(Date),
		_updatedAt: undefined,
	})
})
