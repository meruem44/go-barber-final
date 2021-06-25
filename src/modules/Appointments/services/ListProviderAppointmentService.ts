import { injectable, inject } from "tsyringe";

import { AppError } from "@shared/errors/AppError";

import { Appointment } from "@modules/Appointments/infra/typeorm/entities/Appointment";
import { IAppointmentRepository } from "../repositories/IApointmentsRepository";

interface IRequest {
  provider_id: string;
  day: number;
  month: number;
  year: number;
}

@injectable()
class ListProviderAppointment {
  constructor(
    @inject("AppointmentRepository")
    private appointmentRepository: IAppointmentRepository
  ) {}

  public async execute({
    provider_id,
    day,
    month,
    year,
  }: IRequest): Promise<Appointment[]> {
    const appointments = await this.appointmentRepository.findAllInDayFromProvider(
      {
        day,
        month,
        provider_id,
        year,
      }
    );

    return appointments;
  }
}

export { ListProviderAppointment };
