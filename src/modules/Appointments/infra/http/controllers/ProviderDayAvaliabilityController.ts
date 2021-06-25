import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListProviderDayAvailabilityService } from "../../../services/ListProviderDatAvailabilityService";

class ProviderDayAvaliabilityController {
  public async index(request: Request, response: Response): Promise<Response> {
    const provider_id = request.params.provider_id;
    const { month, year, day } = request.query;

    const listProviderDayAvailability = container.resolve(
      ListProviderDayAvailabilityService
    );

    const availabiblity = await listProviderDayAvailability.execute({
      month: Number(month),
      provider_id,
      year: Number(year),
      day: Number(day),
    });

    return response.json(availabiblity);
  }
}

export { ProviderDayAvaliabilityController };
