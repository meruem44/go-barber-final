import { isBefore, startOfHour, getHours, format } from "date-fns";
import { injectable, inject } from "tsyringe";

import { AppError } from "@shared/errors/AppError";

import { Appointment } from "@modules/Appointments/infra/typeorm/entities/Appointment";
import { IAppointmentRepository } from "@modules/Appointments/repositories/IApointmentsRepository";
import { ICreateAppointmentDTO } from "../dtos/ICreateAppointmentDTO";
import { INotificationRepository } from "@modules/Notificatios/repositories/INotificationRepository";

@injectable()
class CreateAppointmentService {
  constructor(
    @inject("AppointmentRepository")
    private appointmentRepository: IAppointmentRepository,

    @inject("NotificationsRepository")
    private notificationsRepository: INotificationRepository
  ) {}

  public async execute({
    provider_id,
    date,
    user_id,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointmentDate = startOfHour(date);

    if (isBefore(appointmentDate, Date.now())) {
      throw new AppError("You cant create an apointment date past");
    }

    if (user_id === provider_id) {
      throw new AppError("You cant create an apointment with yourself");
    }

    if (getHours(appointmentDate) < 8 || getHours(appointmentDate) > 17) {
      throw new AppError(
        "You cant only create appointment bettwn and 8 and 17"
      );
    }

    const findAppointmentInSameDate = await this.appointmentRepository.findByDate(
      appointmentDate
    );

    if (findAppointmentInSameDate) {
      throw new AppError("this Appointment is already booked");
    }

    const appointment = await this.appointmentRepository.create({
      provider_id,
      date: appointmentDate,
      user_id,
    });

    const dateFormat = format(appointmentDate, "dd/MM/yyyy 'ás' HH:mm");

    console.log(user_id);

    await this.notificationsRepository.create({
      recipient_id: provider_id,
      content: `Novo agendamento para ${dateFormat}h`,
    });

    return appointment;
  }
}

export { CreateAppointmentService };
