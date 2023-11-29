import { DomainEvents } from '@/core/events/domain-events'
import { EventHandler } from '@/core/events/event-handler'

import { AnswerCreatedEvent } from '@/domain/forum/enterprise/events/answer-created-event'

export class OnAnswerCreated implements EventHandler {
	constructor() {
		this.setupSubscriptions()
	}

	setupSubscriptions(): void {
		DomainEvents.registerSubscriber(
			this.sendNewAnswerNotification.bind(this),
			AnswerCreatedEvent.name,
		)
	}

	private async sendNewAnswerNotification(
		event: AnswerCreatedEvent,
	): Promise<void> {
		const { answer } = event
		console.log('Answer Created Notification:', answer)
	}
}
