import { randomUUID } from 'crypto'

import { Entity } from '@/core/entities/entity'

interface InstructorProps {
	name: string
	email: string
}

export class Instructor extends Entity {
	public id: string
	public name: string
	public email: string

	constructor(props: InstructorProps, id?: string) {
		super()

		this.name = props.name
		this.email = props.email

		this.id = id || randomUUID()
	}
}
