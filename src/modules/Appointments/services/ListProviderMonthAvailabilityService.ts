import { inject, injectable } from "tsyringe";
import { getDaysInMonth, getDate } from "date-fns";

import { IAppointmentRepository } from "../repositories/IApointmentsRepository";

interface IRequest {
  provider_id: string;
  month: number;
  year: number;
}

type IResponse = Array<{
  day: number;
  available: boolean;
}>;

@injectable()
class ListProviderMonthAvailabilityService {
  constructor(
    @inject("AppointmentsRepository")
    private appointmentsRepository: IAppointmentRepository
  ) {}

  public async execute({
    month,
    provider_id,
    year,
  }: IRequest): Promise<IResponse> {
    const appointments = await this.appointmentsRepository.findAllInMonthFromProvider(
      {
        month,
        provider_id,
        year,
      }
    );

    const numbersOfDayInMonth = getDaysInMonth(new Date(year, month - 1));

    const eachDayArray = Array.from(
      { length: numbersOfDayInMonth },
      (_, index) => index + 1
    );

    const availability = eachDayArray.map((day) => {
      const appointmentsInDay = appointments.filter((appointment) => {
        return getDate(appointment.date) === day;
      });

      return {
        day: day,
        available: appointmentsInDay.length < 10,
      };
    });

    return availability;
  }
}

export { ListProviderMonthAvailabilityService };
