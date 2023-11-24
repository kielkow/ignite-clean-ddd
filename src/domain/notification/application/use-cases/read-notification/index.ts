import { ResponseHandling, fail, success } from '@/core/response-handling'

import { ResourceNotFoundError } from '@/domain/forum/application/errors'

import { NotificationsRepository } from '../../repositories/notifications-repository'

interface Input {
	id: string
}

type Output = ResponseHandling<ResourceNotFoundError, void>

export class ReadNotificationUseCase {
	constructor(
		private readonly notificationsRepository: NotificationsRepository,
	) {}

	async execute({ id }: Input): Promise<Output> {
		const notification = await this.notificationsRepository.findById(id)

		if (!notification) return fail(new ResourceNotFoundError())

		await this.notificationsRepository.markAsRead(id)

		return success()
	}
}
