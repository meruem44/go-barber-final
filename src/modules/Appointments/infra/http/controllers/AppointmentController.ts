import { Request, Response } from "express";
import { parseISO } from "date-fns";
import { container } from "tsyringe";

import { CreateAppointmentService } from "@modules/Appointments/services/CreateAppointmentService";

class AppointmentController {
  public async create(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { provider_id, date } = request.body;

    const parsedDate = parseISO(date);

    const createAppointment = container.resolve(CreateAppointmentService);

    const appointment = await createAppointment.execute({
      provider_id,
      date: parsedDate,
      user_id,
    });

    return response.json(appointment);
  }
}

export { AppointmentController };
