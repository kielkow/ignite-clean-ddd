import { Notification } from '@/domain/notification/enterprise/entities/notification'
import { NotificationsRepository } from '@/domain/notification/application/repositories/notifications-repository'

export class InMemoryNotificationsRepository
	implements NotificationsRepository
{
	private notifications: Notification[] = []

	async sendNotification(notification: Notification): Promise<void> {
		this.notifications.push(notification)
	}
}
