import { QuestionComment } from '@/domain/forum/enterprise/entities/question-comment'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'

import { QuestionsRepository } from '../../repositories/questions-repository'
import { QuestionsCommentsRepository } from '../../repositories/questions-comments-repository'

interface Input {
	questionId: string
	authorId: string
	content: string
}

export class CommentOnQuestionUseCase {
	constructor(
		private questionsRepository: QuestionsRepository,
		private questionsCommentsRepository: QuestionsCommentsRepository,
	) {}

	async execute(input: Input): Promise<QuestionComment> {
		const { questionId, authorId, content } = input

		const question = await this.questionsRepository.findById(questionId)

		if (!question) throw new Error('Question not found')

		const comment = QuestionComment.create({
			questionId: new UniqueEntityID(questionId),
			authorId: new UniqueEntityID(authorId),
			content,
		})

		return await this.questionsCommentsRepository.create(comment)
	}
}
