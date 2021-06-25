import { injectable, inject } from "tsyringe";

import { User } from "@modules/Users/infra/typeorm/entities/User";

import { AppError } from "@shared/errors/AppError";
import { IUserRepository } from "@modules/Users/repositories/IUsersRepository";

import { IStorageProvider } from "@shared/container/providers/StorageProvider/models/IStorageProvider";

interface Request {
  user_id: string;
  avatarFileName: string;
}

@injectable()
class UpdatedUserAvatarService {
  constructor(
    @inject("UserRepository")
    private usersRepository: IUserRepository,
    @inject("StorageProvider")
    private storageProvider: IStorageProvider
  ) {}

  public async execute({ user_id, avatarFileName }: Request): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError("Only Authenticate users can change avatar", 401);
    }

    if (user.avatar) {
      await this.storageProvider.deleteFile(user.avatar);
    }

    const fileName = await this.storageProvider.saveFile(avatarFileName);

    user.avatar = fileName;

    await this.usersRepository.save(user);

    return user;
  }
}

export { UpdatedUserAvatarService };
