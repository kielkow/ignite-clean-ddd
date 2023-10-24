import { Question } from '@/domain/forum/enterprise/entities/question'

import { CreateQuestionUseCase } from '.'

const fakeQuestionsRepository = {
	createQuestion: async (question: Question) => question,
}

test('create an question', async () => {
	const createQuestion = new CreateQuestionUseCase(fakeQuestionsRepository)

	const question = await createQuestion.execute({
		title: 'This is the title',
		content: 'This is the question',
		authorId: '1',
	})

	expect(question).toEqual({
		_uniqueEnityId: {
			_id: question.id,
		},
		_props: {
			authorId: {
				_id: '1',
			},
			content: 'This is the question',
			title: 'This is the title',
			difficulty: 'medium',
			slug: {
				value: 'this-is-the-title',
			},
		},
		_createdAt: expect.any(Date),
		_updatedAt: undefined,
	})
})
