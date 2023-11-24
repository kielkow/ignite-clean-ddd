import { Notification } from '../../enterprise/entities/notification'

export interface NotificationsRepository {
	sendNotification(notification: Notification): Promise<void>
}
