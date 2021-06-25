import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListProviderService } from "@modules/Appointments/services/ListProviderService";

class ProvidersController {
  public async index(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const listProviders = container.resolve(ListProviderService);

    const providers = await listProviders.execute({
      except_user_id: user_id,
    });

    return response.json(providers);
  }
}

export { ProvidersController };
