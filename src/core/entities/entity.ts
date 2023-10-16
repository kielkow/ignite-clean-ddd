import { UniqueEntityID } from './unique-entity-id'

export class Entity<Props> {
	protected _props: Props
	private _uniqueEnityId: UniqueEntityID

	get props(): Props {
		return this._props
	}

	get id(): string {
		const { id } = this._uniqueEnityId
		return id
	}

	set props(value: Props) {
		this._props = value
	}

	constructor(props: Props, id?: string) {
		this._props = props
		this._uniqueEnityId = new UniqueEntityID(id)
	}
}
