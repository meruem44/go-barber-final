import { AppError } from "@shared/errors/AppError";

import { FakeHasheProvider } from "../provider/HashProvider/fakes/FakeHasheProvider";
import { FakeUserRepository } from "../repositories/fakes/FakeUserRepository";
import { UpdateUser } from "./UpdateUser";

let fakeHasheProvider: FakeHasheProvider;
let fakeUserRepository: FakeUserRepository;
let updateUser: UpdateUser;

describe("UpdateUser", () => {
  beforeEach(() => {
    fakeHasheProvider = new FakeHasheProvider();
    fakeUserRepository = new FakeUserRepository();

    updateUser = new UpdateUser(fakeUserRepository, fakeHasheProvider);
  });

  it("should be able update the profile", async () => {
    const user = await fakeUserRepository.create({
      name: "John joe",
      email: "leandro@le.com",
      password: "123456",
    });

    const updatedUser = await updateUser.execute({
      user_id: user.id,
      name: "leandro",
      email: "leandro@le22.com",
    });

    expect(updatedUser.name).toBe("leandro");
    expect(updatedUser.email).toBe("leandro@le22.com");
  });

  it("should not able to change another user email", async () => {
    await fakeUserRepository.create({
      name: "John joe",
      email: "leandro@le22.com",
      password: "123456",
    });

    const user = await fakeUserRepository.create({
      name: "John joe2",
      email: "leandro@le.com",
      password: "123456",
    });

    await expect(
      updateUser.execute({
        user_id: user.id,
        name: "leandro",
        email: "leandro@le22.com",
        old_password: "123456",
        password: "123456",
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able update the password withot old password", async () => {
    const user = await fakeUserRepository.create({
      name: "John joe",
      email: "leandro@le.com",
      password: "123456",
    });

    expect(
      updateUser.execute({
        user_id: user.id,
        name: "leandro",
        email: "leandro@le22.com",
        password: "111111",
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able update the password withot wrong old password", async () => {
    const user = await fakeUserRepository.create({
      name: "John joe",
      email: "leandro@le.com",
      password: "123456",
    });

    expect(
      updateUser.execute({
        user_id: user.id,
        name: "leandro",
        email: "leandro@le22.com",
        old_password: "wrong old password",
        password: "111111",
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
