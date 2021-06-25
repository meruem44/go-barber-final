import { inject, injectable } from "tsyringe";

import { User } from "@modules/Users/infra/typeorm/entities/User";
import { IUserRepository } from "@modules/Users/repositories/IUsersRepository";

import { IFindAllProviderDTO } from "@modules/Appointments/dtos/IFinddAllProviderDTO";

@injectable()
class ListProviderService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUserRepository
  ) {}

  public async execute({
    except_user_id,
  }: IFindAllProviderDTO): Promise<User[]> {
    const providers = await this.usersRepository.findAllProviders({
      except_user_id,
    });

    return providers;
  }
}

export { ListProviderService };
