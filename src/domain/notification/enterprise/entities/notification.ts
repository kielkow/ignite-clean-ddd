import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

interface NotificationProps {
	recipientId: UniqueEntityID
	title: string
	content: string
	read: boolean
}

export class Notification extends Entity<NotificationProps> {
	get recipientId(): UniqueEntityID {
		return this.props.recipientId
	}

	get title(): string {
		return this.props.title
	}

	get content(): string {
		return this.props.content
	}

	get read(): boolean {
		return this.props.read
	}

	public static create(
		props: NotificationProps,
		id?: UniqueEntityID,
	): Notification {
		const notification = new Notification(props, id)
		return notification
	}
}
