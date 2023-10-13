import { randomUUID } from 'crypto'

import { Entity } from '@/core/entities/entity'

interface StudentProps {
	name: string
	email: string
}

export class Student extends Entity {
	public id: string
	public name: string
	public email: string

	constructor(props: StudentProps, id?: string) {
		super()

		this.name = props.name
		this.email = props.email

		this.id = id || randomUUID()
	}
}
