import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListProviderMonthAvailabilityService } from "../../../services/ListProviderMonthAvailabilityService";

class ProviderMonthAvaliabilityController {
  public async index(request: Request, response: Response): Promise<Response> {
    const provider_id = request.params.provider_id;
    const { month, year } = request.query;

    const listProviderMonthAvailability = container.resolve(
      ListProviderMonthAvailabilityService
    );

    const availabiblity = await listProviderMonthAvailability.execute({
      month: Number(month),
      provider_id,
      year: Number(year),
    });

    return response.json(availabiblity);
  }
}

export { ProviderMonthAvaliabilityController };
