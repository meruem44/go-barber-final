import { container } from "tsyringe";

import "@modules/Users/provider";
import "./providers";

import { IAppointmentRepository } from "@modules/Appointments/repositories/IApointmentsRepository";
import { AppointmentRepository } from "@modules/Appointments/infra/typeorm/repositories/AppointmentsRepository";

import { IUserRepository } from "@modules/Users/repositories/IUsersRepository";
import { UserRepository } from "@modules/Users/infra/typeorm/repositories/UserRepositoy";

import { IUsersTokenRepository } from "@modules/Users/repositories/IUsersTokenRepository";
import { UserTokensRepository } from "@modules/Users/infra/typeorm/repositories/UserTokensRepository";

import { INotificationRepository } from "@modules/Notificatios/repositories/INotificationRepository";
import { NotificationsRepository } from "@modules/Notificatios/infra/typeorm/repositories/NotificationRepository";

container.registerSingleton<IAppointmentRepository>(
  "AppointmentRepository",
  AppointmentRepository
);

container.registerSingleton<IUserRepository>("UserRepository", UserRepository);

container.registerSingleton<IUsersTokenRepository>(
  "UsersTokenRepository",
  UserTokensRepository
);

container.registerSingleton<INotificationRepository>(
  "NotificationsRepository",
  NotificationsRepository
);
