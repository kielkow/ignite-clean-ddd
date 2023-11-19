import dayjs from 'dayjs'

import { Optional } from '@/core/types/optional'
import { AggregateRoot } from '@/core/entities/aggregate-root'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

import { Slug } from './value-objects/slug'
import { QuestionAttachment } from './question-attachment'

export interface QuestionProps {
	title: string
	slug: Slug
	content: string
	difficulty: 'easy' | 'medium' | 'hard'
	authorId: UniqueEntityID
	bestAnswerId?: UniqueEntityID
	attachments: QuestionAttachment[]
}

export class Question extends AggregateRoot<QuestionProps> {
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

	get attachments() {
		return this.props.attachments
	}

	get isNew(): boolean {
		return dayjs().diff(this.createdAt, 'day') <= 3
	}

	get except() {
		return this.props.content.substring(0, 120).trimEnd().concat('...')
	}

	set title(value: string) {
		this.props.title = value
		this.props.slug = Slug.createFromText(value)

		this.touch()
	}

	set content(value: string) {
		this.props.content = value
		this.touch()
	}

	set bestAnswerId(value: UniqueEntityID | undefined) {
		this.props.bestAnswerId = value
		this.touch()
	}

	private touch() {
		this.updatedAt = new Date()
	}

	static create(
		props: Optional<QuestionProps, 'difficulty' | 'slug' | 'attachments'>,
		id?: UniqueEntityID,
		createdAt?: Date,
	) {
		const question = new Question(
			{
				...props,
				difficulty: props.difficulty ?? 'medium',
				slug: props.slug ?? Slug.createFromText(props.title),
				attachments: props.attachments ?? [],
			},
			id,
			createdAt,
		)

		return question
	}
}
