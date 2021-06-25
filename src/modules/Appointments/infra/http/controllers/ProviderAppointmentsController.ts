import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListProviderAppointment } from "@modules/Appointments/services/ListProviderAppointmentService";

class ProviderAppointmentController {
  public async index(request: Request, response: Response): Promise<Response> {
    const provider_id = request.user.id;
    const { day, month, year } = request.query;

    const listProviderAppointment = container.resolve(ListProviderAppointment);

    const appointment = await listProviderAppointment.execute({
      provider_id,
      day: Number(day),
      month: Number(month),
      year: Number(year),
    });

    return response.json(appointment);
  }
}

export { ProviderAppointmentController };
