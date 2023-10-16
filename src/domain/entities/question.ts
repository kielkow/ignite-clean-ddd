import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

import { Slug } from './value-objects/slug'

interface QuestionProps {
	title: string
	slug: Slug
	content: string
	authorId: UniqueEntityID
	bestAnswerId?: UniqueEntityID
}

export class Question extends Entity<QuestionProps> {}
