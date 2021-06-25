import { getMongoRepository, MongoRepository } from "typeorm";

import { INotificationRepository } from "@modules/Notificatios/repositories/INotificationRepository";
import { Notification } from "../schemas/Notification";
import { ICreateNotificationDTO } from "@modules/Notificatios/dtos/ICreateNotificationDTO";

class NotificationsRepository implements INotificationRepository {
  private ormRepository: MongoRepository<Notification>;

  constructor() {
    this.ormRepository = getMongoRepository(Notification, "mongo");
  }

  public async create({
    content,
    recipient_id,
  }: ICreateNotificationDTO): Promise<Notification> {
    const notification = this.ormRepository.create({
      content,
      recipient_id,
    });

    await this.ormRepository.save(notification);

    return notification;
  }
}

export { NotificationsRepository };
