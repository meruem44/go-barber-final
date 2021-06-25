import { ICreateNotificationDTO } from "@modules/Notificatios/dtos/ICreateNotificationDTO";
import { Notification } from "../infra/typeorm/schemas/Notification";

interface INotificationRepository {
  create(date: ICreateNotificationDTO): Promise<Notification>;
}

export { INotificationRepository };
