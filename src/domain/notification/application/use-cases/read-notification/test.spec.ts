import { Fail, Success } from '@/core/response-handling'

import {
	NotAllowedError,
	ResourceNotFoundError,
} from '@/domain/forum/application/errors'

import { makeNotification } from '@/test/factories/make-notification'
import { InMemoryNotificationsRepository } from '@/test/repositories/in-memory-notifications-repository'

import { ReadNotificationUseCase } from '.'

describe('SendNotificationUseCase', () => {
	let inMemoryNotificationsRepository: InMemoryNotificationsRepository
	let sut: ReadNotificationUseCase

	beforeEach(() => {
		inMemoryNotificationsRepository = new InMemoryNotificationsRepository()
		sut = new ReadNotificationUseCase(inMemoryNotificationsRepository)
	})

	it('should be able to read an notification', async () => {
		const notification = makeNotification()

		await inMemoryNotificationsRepository.sendNotification(notification)

		const result = await sut.execute({
			id: notification.id,
			recipientId: notification.recipientId.id,
		})

		expect(Success.is(result)).toBe(true)
		expect(result).toBeInstanceOf(Success)
	})

	it('should not be able to read an notification that does not exist', async () => {
		const result = await sut.execute({
			id: 'non-existing-notification-id',
			recipientId: 'non-existing-recipient-id',
		})

		expect(Fail.is(result)).toBe(true)
		expect(result).toBeInstanceOf(Fail)
		expect(result).toEqual({ error: expect.any(ResourceNotFoundError) })
	})

	it('should not be able to read an notification that does not belong to the recipient', async () => {
		const notification = makeNotification()

		await inMemoryNotificationsRepository.sendNotification(notification)

		const result = await sut.execute({
			id: notification.id,
			recipientId: 'non-existing-recipient-id',
		})

		expect(Fail.is(result)).toBe(true)
		expect(result).toBeInstanceOf(Fail)
		expect(result).toEqual({ error: expect.any(NotAllowedError) })
	})
})
