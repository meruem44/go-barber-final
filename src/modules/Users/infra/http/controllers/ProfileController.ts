import { Request, Response } from "express";
import { container } from "tsyringe";
import { classToClass } from "class-transformer";

import { UpdateUser } from "@modules/Users/services/UpdateUser";
import { ShowProfileService } from "@modules/Users/services/ShowProfileService";

class ProfileController {
  public async show(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const showProfileService = container.resolve(ShowProfileService);

    const user = await showProfileService.execute(user_id);

    return response.json(user);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { name, email, old_password, password } = request.body;

    const updateUser = container.resolve(UpdateUser);

    const user = await updateUser.execute({
      user_id,
      name,
      email,
      old_password,
      password,
    });

    return response.json(classToClass(user));
  }
}

export { ProfileController };
