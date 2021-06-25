import { injectable, inject } from "tsyringe";
import { sign } from "jsonwebtoken";
import { authConfig } from "@config/auth";

import { AppError } from "@shared/errors/AppError";

import { User } from "@modules/Users/infra/typeorm/entities/User";
import { IHashProvider } from "@modules/Users/provider/HashProvider/models/IHashProvider";
import { IUserRepository } from "@modules/Users/repositories/IUsersRepository";

interface Request {
  email: string;
  password: string;
}

interface Response {
  user: User;
  token: string;
}

@injectable()
class AuthenticateUserService {
  constructor(
    @inject("UserRepository")
    private usersRepository: IUserRepository,
    @inject("HashProvider")
    private hashedProvider: IHashProvider
  ) {}

  public async execute({ email, password }: Request): Promise<Response> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError("Incorrect email/password combination.", 401);
    }

    const passwordMatched = await this.hashedProvider.compareHashed(
      password,
      user.password
    );

    if (!passwordMatched) {
      throw new AppError("Incorrect email/password combination.", 401);
    }

    const token = sign({}, authConfig.secret, {
      expiresIn: authConfig.expiresIn,
      subject: user.id,
    });

    return {
      user,
      token,
    };
  }
}

export { AuthenticateUserService };
