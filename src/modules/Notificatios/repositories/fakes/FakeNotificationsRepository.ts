import { ObjectID } from "mongodb";

import { ICreateNotificationDTO } from "@modules/Notificatios/dtos/ICreateNotificationDTO";
import { Notification } from "@modules/Notificatios/infra/typeorm/schemas/Notification";
import { INotificationRepository } from "@modules/Notificatios/repositories/INotificationRepository";

class FakeNotificationsRepository implements INotificationRepository {
  private notifications: Notification[] = [];

  public async create({
    content,
    recipient_id,
  }: ICreateNotificationDTO): Promise<Notification> {
    const notifications = new Notification();

    Object.assign(notifications, { id: new ObjectID(), content, recipient_id });

    this.notifications.push(notifications);

    return notifications;
  }
}

export { FakeNotificationsRepository };
