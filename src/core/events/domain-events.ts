import { DomainEvent } from './domain-event'
import { AggregateRoot } from '../entities/aggregate-root'
import { UniqueEntityID } from '../entities/unique-entity-id'

type DomainEventCallback = (event: any) => void

export class DomainEvents {
	private static subscribers: Record<string, DomainEventCallback[]> = {}
	private static publishers: AggregateRoot<any>[] = []

	public static registerPublisher(aggregate: AggregateRoot<any>) {
		const aggregateFound = !!this.findPublisherByID(
			new UniqueEntityID(aggregate.id),
		)

		if (!aggregateFound) {
			this.publishers.push(aggregate)
		}
	}

	private static dispatchPublisherEvents(aggregate: AggregateRoot<any>) {
		aggregate.domainEvents.forEach((event: DomainEvent) =>
			this.dispatchEvent(event),
		)
	}

	private static removePublisher(aggregate: AggregateRoot<any>) {
		const index = this.publishers.findIndex((a) => a.equals(aggregate))

		this.publishers.splice(index, 1)
	}

	private static findPublisherByID(
		entityId: UniqueEntityID,
	): AggregateRoot<any> | undefined {
		return this.publishers.find((aggregate) => aggregate.id === entityId.id)
	}

	public static dispatchPublisherEventsForAggregate(id: UniqueEntityID) {
		const publisher = this.findPublisherByID(id)

		if (publisher) {
			this.dispatchPublisherEvents(publisher)
			publisher.clearEvents()
			this.removePublisher(publisher)
		}
	}

	public static registerSubscriber(
		callback: DomainEventCallback,
		eventClassName: string,
	) {
		const wasEventRegisteredBefore = eventClassName in this.subscribers

		if (!wasEventRegisteredBefore) {
			this.subscribers[eventClassName] = []
		}

		this.subscribers[eventClassName].push(callback)
	}

	public static clearSubscribers() {
		this.subscribers = {}
	}

	public static clearPublishers() {
		this.publishers = []
	}

	private static dispatchEvent(event: DomainEvent) {
		const eventClassName: string = event.constructor.name

		const isEventRegistered = eventClassName in this.subscribers

		if (isEventRegistered) {
			const handlers = this.subscribers[eventClassName]

			for (const handler of handlers) {
				handler(event)
			}
		}
	}
}
