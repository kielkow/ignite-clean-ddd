import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

import { Slug } from './value-objects/slug'
import { Optional } from '@/core/types/optional'

interface QuestionProps {
	title: string
	slug: Slug
	content: string
	difficulty: 'easy' | 'medium' | 'hard'
	authorId: UniqueEntityID
	bestAnswerId?: UniqueEntityID
}

export class Question extends Entity<QuestionProps> {
	static create(
		props: Optional<QuestionProps, 'difficulty'>,
		id?: UniqueEntityID,
	) {
		const question = new Question(
			{
				...props,
				difficulty: props.difficulty ?? 'medium',
			},
			id,
		)

		return question
	}
}
