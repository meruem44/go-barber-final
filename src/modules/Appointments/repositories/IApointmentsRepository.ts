import { Appointment } from "../infra/typeorm/entities/Appointment";

import { ICreateAppointmentDTO } from "@modules/Appointments/dtos/ICreateAppointmentDTO";
import { IFinddAllProviderDTO } from "@modules/Appointments/dtos/IFindAllMonthProviderDTO";
import { IFindAllDayProviderDTO } from "@modules/Appointments/dtos/IFindAllDayProviderDTO";

interface IAppointmentRepository {
  findByDate(date: Date): Promise<Appointment | undefined>;
  create(data: ICreateAppointmentDTO): Promise<Appointment>;
  findAllInMonthFromProvider(
    date: IFinddAllProviderDTO
  ): Promise<Appointment[]>;
  findAllInDayFromProvider(
    date: IFindAllDayProviderDTO
  ): Promise<Appointment[]>;
}

export { IAppointmentRepository };
