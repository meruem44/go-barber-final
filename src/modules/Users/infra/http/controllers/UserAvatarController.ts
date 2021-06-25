import { Request, Response } from "express";
import { container } from "tsyringe";
import { classToClass } from "class-transformer";

import { UpdatedUserAvatarService } from "@modules/Users/services/UpdatedUserAvatarService";

class UserAvatarController {
  public async update(request: Request, response: Response): Promise<Response> {
    const updatedUserAvatar = container.resolve(UpdatedUserAvatarService);
    const user = await updatedUserAvatar.execute({
      user_id: request.user.id,
      avatarFileName: request.file.filename,
    });

    return response.json({ user: classToClass(user) });
  }
}

export { UserAvatarController };
