import { inject, injectable } from "tsyringe";

import { AppError } from "@shared/errors/AppError";
import { IUserRepository } from "@modules/Users/repositories/IUsersRepository";
import { IHashProvider } from "@modules/Users/provider/HashProvider/models/IHashProvider";

import { User } from "@modules/Users/infra/typeorm/entities/User";

interface Request {
  name: string;
  password: string;
  email: string;
}

@injectable()
class CreateUserService {
  constructor(
    @inject("UserRepository")
    private usersRepository: IUserRepository,
    @inject("HashProvider")
    private hashProvider: IHashProvider
  ) {}

  public async execute({ name, password, email }: Request): Promise<User> {
    const checkUserExist = await this.usersRepository.findByEmail(email);

    if (checkUserExist) {
      throw new AppError("Email address already used by another");
    }

    const hashedPassword = await this.hashProvider.generateHash(password);

    const user = await this.usersRepository.create({
      email,
      password: hashedPassword,
      name,
    });

    return user;
  }
}

export { CreateUserService };
