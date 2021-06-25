import { Request, Response } from "express";
import { container } from "tsyringe";

import { SendForgotEmailService } from "@modules/Users/services/SendForgotEmailService";

class ForgotPasswordController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email } = request.body;

    const sendForgotEmail = container.resolve(SendForgotEmailService);

    await sendForgotEmail.execute({
      email,
    });

    return response.status(204).json();
  }
}

export { ForgotPasswordController };
