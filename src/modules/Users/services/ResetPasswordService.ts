import { inject, injectable } from "tsyringe";
import { isAfter, addHours } from "date-fns";

import { IUserRepository } from "@modules/Users/repositories/IUsersRepository";
import { IUsersTokenRepository } from "@modules/Users/repositories/IUsersTokenRepository";
import { IHashProvider } from "@modules/Users/provider/HashProvider/models/IHashProvider";

import { AppError } from "@shared/errors/AppError";

interface IRequest {
  token: string;
  password: string;
}

@injectable()
class ResetPasswordService {
  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository,

    @inject("UsersTokenRepository")
    private usersTokenRepository: IUsersTokenRepository,

    @inject("HashProvider")
    private hashProvider: IHashProvider
  ) {}

  public async execute({ password, token }: IRequest): Promise<void> {
    const userToken = await this.usersTokenRepository.findByToken(token);

    if (!userToken) {
      throw new AppError("User token does not exist");
    }

    const user = await this.userRepository.findById(userToken?.user_id);

    if (!user) {
      throw new AppError("User token does not exist");
    }

    const tokenCreatedAt = userToken.created_at;
    const comparedDate = addHours(tokenCreatedAt, 2);

    if (isAfter(Date.now(), comparedDate)) {
      throw new AppError("Token expired");
    }

    user.password = await this.hashProvider.generateHash(password);

    await this.userRepository.save(user);
  }
}

export { ResetPasswordService };
