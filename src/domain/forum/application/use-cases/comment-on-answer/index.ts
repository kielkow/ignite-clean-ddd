import { AnswerComment } from '@/domain/forum/enterprise/entities/answer-comment'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'

import { AnswersRepository } from '../../repositories/answers-repository'
import { AnswersCommentsRepository } from '../../repositories/answers-comments-repository'

interface Input {
	answerId: string
	authorId: string
	content: string
}

export class CommentOnAnswerUseCase {
	constructor(
		private answersRepository: AnswersRepository,
		private answersCommentsRepository: AnswersCommentsRepository,
	) {}

	async execute(input: Input): Promise<AnswerComment> {
		const { answerId, authorId, content } = input

		const answer = await this.answersRepository.findById(answerId)

		if (!answer) throw new Error('Answer not found')

		const comment = AnswerComment.create({
			answerId: new UniqueEntityID(answerId),
			authorId: new UniqueEntityID(authorId),
			content,
		})

		return await this.answersCommentsRepository.create(comment)
	}
}
