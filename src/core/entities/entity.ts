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

	set props(value: Props) {
		this._props = value
	}

	constructor(props: Props, id?: string) {
		this._uniqueEnityId = new UniqueEntityID(id)

		this._props = props

		this._createdAt = new Date()

		this._updatedAt = undefined
	}
}
