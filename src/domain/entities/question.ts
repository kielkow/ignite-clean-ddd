import dayjs from 'dayjs'

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
	get title() {
		return this.props.title
	}

	get slug() {
		return this.props.slug
	}

	get content() {
		return this.props.content
	}

	get difficulty() {
		return this.props.difficulty
	}

	get authorId() {
		return this.props.authorId
	}

	get bestAnswerId() {
		return this.props.bestAnswerId
	}

	get isNew(): boolean {
		return dayjs().diff(this.createdAt, 'day') <= 3
	}

	get except() {
		return this.props.content.substring(0, 120).trimEnd().concat('...')
	}

	set title(value: string) {
		this.props.title = value
		this.touch()
	}

	set content(value: string) {
		this.props.content = value
		this.touch()
	}

	private touch() {
		this.updatedAt = new Date()
	}

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
