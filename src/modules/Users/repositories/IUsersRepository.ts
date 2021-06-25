import { User } from "../infra/typeorm/entities/User";
import { ICreateUserDTO } from "@modules/Users/dtos/ICreateUserDTO";

import { IFindAllProviderDTO } from "@modules/Appointments/dtos/IFinddAllProviderDTO";

interface IUserRepository {
  findAllProviders(data: IFindAllProviderDTO): Promise<User[]>;
  findById(id: string): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
  create(data: ICreateUserDTO): Promise<User>;
  save(user: User): Promise<User>;
}

export { IUserRepository };
