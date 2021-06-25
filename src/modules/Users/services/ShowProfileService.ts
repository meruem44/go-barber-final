import { inject, injectable } from "tsyringe";

import { User } from "../infra/typeorm/entities/User";
import { IUserRepository } from "../repositories/IUsersRepository";

@injectable()
class ShowProfileService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUserRepository
  ) {}

  public async execute(user_id: string): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  }
}

export { ShowProfileService };
