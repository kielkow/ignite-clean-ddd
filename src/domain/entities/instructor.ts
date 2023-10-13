import { Entity } from '@/core/entities/entity'

interface InstructorProps {
	name: string
	email: string
}

export class Instructor extends Entity<InstructorProps> {}
