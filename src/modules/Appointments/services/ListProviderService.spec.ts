import { FakeUserRepository } from "@modules/Users/repositories/fakes/FakeUserRepository";
import { ListProviderService } from "./ListProviderService";

let usersRepository: FakeUserRepository;
let listProvider: ListProviderService;

describe("ListProviderService", () => {
  beforeEach(() => {
    usersRepository = new FakeUserRepository();
    listProvider = new ListProviderService(usersRepository);
  });

  it("should be able to list all providers", async () => {
    const user1 = await usersRepository.create({
      name: "leandro 1",
      email: "leandro1@outlook.com",
      password: "123456",
    });

    const user2 = await usersRepository.create({
      name: "leandro 2",
      email: "leandro2@outlook.com",
      password: "123456",
    });

    const userLogged = await usersRepository.create({
      name: "leandro 3",
      email: "leandro3@outlook.com",
      password: "123456",
    });

    const providers = await listProvider.execute({
      except_user_id: userLogged.id,
    });

    expect(providers).toEqual([user1, user2]);
  });
});
