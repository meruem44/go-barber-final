import { uuid } from "uuidv4";
import { User } from "@modules/Users/infra/typeorm/entities/User";

import { IUserRepository } from "@modules/Users/repositories/IUsersRepository";
import { ICreateUserDTO } from "@modules/Users/dtos/ICreateUserDTO";
import { IFindAllProviderDTO } from "@modules/Appointments/dtos/IFinddAllProviderDTO";

class FakeUserRepository implements IUserRepository {
  private users: User[] = [];

  public async create({
    name,
    password,
    email,
  }: ICreateUserDTO): Promise<User> {
    const user = new User();

    Object.assign(user, { id: uuid(), name, password, email });

    this.users.push(user);

    return user;
  }

  public async findAllProviders({
    except_user_id,
  }: IFindAllProviderDTO): Promise<User[]> {
    let { users } = this;

    if (except_user_id) {
      users = this.users.filter((user) => user.id !== except_user_id);
    }

    return users;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = this.users.find((findUser) => findUser.email === email);

    return user;
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = this.users.find((findUser) => findUser.id === id);

    return user;
  }

  public async save(user: User): Promise<User> {
    const findIndex = this.users.findIndex(
      (findUser) => findUser.id === user.id
    );

    this.users[findIndex] = user;

    return user;
  }
}

export { FakeUserRepository };
