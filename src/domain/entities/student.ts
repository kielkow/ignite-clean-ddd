import { Entity } from '@/core/entities/entity'

interface StudentProps {
	name: string
	email: string
}

export class Student extends Entity<StudentProps> {}
