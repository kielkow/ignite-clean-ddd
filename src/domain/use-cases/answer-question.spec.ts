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
		_id: answer.id,
		_props: {
			authorId: '1',
			questionId: '1',
			content: 'This is the answer',
		},
	})
})
