import { inject, injectable } from "tsyringe";
import { getHours, isAfter } from "date-fns";

import { IAppointmentRepository } from "../repositories/IApointmentsRepository";

interface IRequest {
  provider_id: string;
  month: number;
  year: number;
  day: number;
}

type IResponse = Array<{
  hour: number;
  available: boolean;
}>;

@injectable()
class ListProviderDayAvailabilityService {
  constructor(
    @inject("AppointmentsRepository")
    private appointmentsRepository: IAppointmentRepository
  ) {}

  public async execute({
    month,
    provider_id,
    year,
    day,
  }: IRequest): Promise<IResponse> {
    const appointment = await this.appointmentsRepository.findAllInDayFromProvider(
      {
        provider_id,
        year,
        month,
        day,
      }
    );

    const hourStart = 8;

    const eachHourArray = Array.from(
      { length: 10 },
      (_, index) => index + hourStart
    );

    const currentDate = new Date(Date.now());

    const availability = eachHourArray.map((hour) => {
      const hasAppointmentHour = appointment.find(
        (appointment) => getHours(appointment.date) === hour
      );

      const compareDate = new Date(year, month - 1, day, hour);

      return {
        hour,
        available: !hasAppointmentHour && isAfter(compareDate, currentDate),
      };
    });

    return availability;
  }
}

export { ListProviderDayAvailabilityService };
