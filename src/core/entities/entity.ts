import { randomUUID } from 'crypto'

export class Entity<Props> {
	private _id: string
	protected _props: Props

	get id(): string {
		return this._id
	}

	get props(): Props {
		return this._props
	}

	set props(value: Props) {
		this._props = value
	}

	constructor(props: Props, id?: string) {
		this._props = props
		this._id = id ?? randomUUID()
	}
}
