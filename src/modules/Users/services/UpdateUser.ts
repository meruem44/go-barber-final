import { injectable, inject } from "tsyringe";

import { User } from "../infra/typeorm/entities/User";
import { IUserRepository } from "@modules/Users/repositories/IUsersRepository";
import { AppError } from "@shared/errors/AppError";
import { IHashProvider } from "../provider/HashProvider/models/IHashProvider";

interface IRequest {
  user_id: string;
  name: string;
  email: string;
  password?: string;
  old_password?: string;
}

@injectable()
class UpdateUser {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUserRepository,

    @inject("HashProvider")
    private HashProvider: IHashProvider
  ) {}

  public async execute({
    user_id,
    name,
    email,
    password,
    old_password,
  }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError("User not found");
    }

    const userWithUpdatedEmail = await this.usersRepository.findByEmail(email);

    if (userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id) {
      throw new AppError("E-mail already in use");
    }

    user.name = name;
    user.email = email;

    if (password && !old_password) {
      throw new AppError(
        "You need to inform the old password to set a new password"
      );
    }

    if (password && old_password) {
      const checkOldPassword = await this.HashProvider.compareHashed(
        old_password,
        password
      );

      if (!checkOldPassword) {
        throw new AppError("Old password does not match");
      }

      user.password = await this.HashProvider.generateHash(password);
    }

    return this.usersRepository.save(user);
  }
}

export { UpdateUser };
