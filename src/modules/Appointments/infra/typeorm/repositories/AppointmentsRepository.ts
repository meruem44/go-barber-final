import { Appointment } from "@modules/Appointments/infra/typeorm/entities/Appointment";
import { getRepository, Repository, Raw } from "typeorm";

import { IAppointmentRepository } from "@modules/Appointments/repositories/IApointmentsRepository";
import { ICreateAppointmentDTO } from "@modules/Appointments/dtos/ICreateAppointmentDTO";
import { IFinddAllProviderDTO } from "@modules/Appointments/dtos/IFindAllMonthProviderDTO";
import { IFindAllDayProviderDTO } from "@modules/Appointments/dtos/IFindAllDayProviderDTO";

class AppointmentRepository implements IAppointmentRepository {
  private ormRepository: Repository<Appointment>;

  constructor() {
    this.ormRepository = getRepository(Appointment);
  }

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = await this.ormRepository.findOne({
      where: { date },
    });

    return findAppointment;
  }

  public async create({
    provider_id,
    date,
    user_id,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = this.ormRepository.create({
      provider_id,
      date,
      user_id,
    });

    await this.ormRepository.save(appointment);

    return appointment;
  }

  public async findAllInMonthFromProvider({
    year,
    month,
    provider_id,
  }: IFinddAllProviderDTO): Promise<Appointment[]> {
    const parsedMounth = String(month).padStart(2, "0");

    const appointments = await this.ormRepository.find({
      provider_id,
      date: Raw(
        (dateFieldName) =>
          `to_char(${dateFieldName}, 'MM-YYYY') = '${parsedMounth}-${year}'`
      ),
    });

    return appointments;
  }

  public async findAllInDayFromProvider({
    year,
    month,
    provider_id,
    day,
  }: IFindAllDayProviderDTO): Promise<Appointment[]> {
    const parseDay = String(day).padStart(2, "0");
    const parsedMounth = String(month).padStart(2, "0");

    const appointments = await this.ormRepository.find({
      provider_id,
      date: Raw(
        (dateFieldName) =>
          `to_char(${dateFieldName}, 'DD-MM-YYYY') = '${parseDay}-${parsedMounth}-${year}'`
      ),
    });

    return appointments;
  }
}

export { AppointmentRepository };
