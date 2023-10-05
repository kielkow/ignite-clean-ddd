import { expect, test } from 'vitest'
import { AnswerQuestionUseCase } from './answer-question'

test('create an answer', async () => {
    const answerQuestion = new AnswerQuestionUseCase()

    const answer = await answerQuestion.execute({
        authorId: '1',
        questionId: '1',
        content: 'This is the answer'
    })

    expect(answer).toEqual({
        id: answer.id,
        authorId: '1',
        questionId: '1',
        content: 'This is the answer'
    })
})
