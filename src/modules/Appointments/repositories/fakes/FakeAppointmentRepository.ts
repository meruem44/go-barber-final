import { uuid } from "uuidv4";
import { isEqual, getMonth, getDate, getYear } from "date-fns";

import { IAppointmentRepository } from "@modules/Appointments/repositories/IApointmentsRepository";
import { ICreateAppointmentDTO } from "@modules/Appointments/dtos/ICreateAppointmentDTO";
import { IFindAllDayProviderDTO } from "@modules/Appointments/dtos/IFindAllDayProviderDTO";

import { Appointment } from "@modules/Appointments/infra/typeorm/entities/Appointment";
import { IFinddAllProviderDTO } from "@modules/Appointments/dtos/IFindAllMonthProviderDTO";

class FakeAppointmentRepository implements IAppointmentRepository {
  private appointments: Appointment[] = [];

  public async findAllInDayFromProvider({
    year,
    month,
    provider_id,
    day,
  }: IFindAllDayProviderDTO): Promise<Appointment[]> {
    const appointments = this.appointments.filter(
      (appointment) =>
        appointment.provider_id === provider_id &&
        getMonth(appointment.date) + 1 === month &&
        getYear(appointment.date) === year &&
        getDate(appointment.date) === day
    );

    return appointments;
  }

  public async findAllInMonthFromProvider({
    year,
    month,
    provider_id,
  }: IFinddAllProviderDTO): Promise<Appointment[]> {
    const appointments = this.appointments.filter(
      (appointment) =>
        appointment.provider_id === provider_id &&
        getMonth(appointment.date) + 1 === month &&
        getYear(appointment.date) === year
    );

    return appointments;
  }

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = this.appointments.find((appointment) =>
      isEqual(appointment.date, date)
    );

    return findAppointment;
  }

  public async create({
    date,
    provider_id,
    user_id,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = new Appointment();

    Object.assign(appointment, { id: uuid(), date, provider_id, user_id });

    this.appointments.push(appointment);

    return appointment;
  }
}

export { FakeAppointmentRepository };
