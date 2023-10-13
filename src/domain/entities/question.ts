import { randomUUID } from 'crypto'

import { Entity } from '@/core/entities/entity'

import { Slug } from './value-objects/slug'

interface QuestionProps {
	title: string
	slug: Slug
	content: string
	authorId: string
}

export class Question extends Entity {
	public id: string
	public title: string
	public slug: Slug
	public content: string
	public category: string
	public difficulty: 'easy' | 'medium' | 'hard'
	public authorId: string

	constructor(props: QuestionProps, id?: string) {
		super()

		this.title = props.title
		this.slug = props.slug
		this.content = props.content
		this.category = ''
		this.difficulty = 'medium'
		this.authorId = props.authorId
		this.id = id || randomUUID()
	}
}
