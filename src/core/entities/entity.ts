import { UniqueEntityID } from './unique-entity-id'

export class Entity<Props> {
	private _uniqueEnityId: UniqueEntityID

	protected _props: Props

	private _createdAt: Date

	private _updatedAt?: Date

	get id(): string {
		const { id } = this._uniqueEnityId
		return id
	}

	get props(): Props {
		return this._props
	}

	get createdAt(): Date {
		return this._createdAt
	}

	get updatedAt(): Date | undefined {
		return this._updatedAt
	}

	set props(value: Props) {
		this._props = value
	}

	protected constructor(props: Props, id?: UniqueEntityID) {
		this._uniqueEnityId = id ?? new UniqueEntityID()

		this._props = props

		this._createdAt = new Date()

		this._updatedAt = undefined
	}
}
