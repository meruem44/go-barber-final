import "reflect-metadata";

import { AppError } from "@shared/errors/AppError";

import { CreateUserService } from "./CreateUserService";
import { FakeHasheProvider } from "@modules/Users/provider/HashProvider/fakes/FakeHasheProvider";
import { FakeUserRepository } from "@modules/Users/repositories/fakes/FakeUserRepository";

let fakeUserRepository: FakeUserRepository;
let fakeHasheProvider: FakeHasheProvider;
let createUser: CreateUserService;

describe("CreateUser", () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeHasheProvider = new FakeHasheProvider();

    createUser = new CreateUserService(fakeUserRepository, fakeHasheProvider);
  });

  it("shold be able to create a new user", async () => {
    const user = await createUser.execute({
      name: "John doe",
      email: "le@le.com",
      password: "123456",
    });

    expect(user).toHaveProperty("id");
  });

  it("shold not be able to create a new user with same email from another", async () => {
    const user = await createUser.execute({
      name: "John doe",
      email: "le@le.com",
      password: "123456",
    });

    expect(
      createUser.execute({
        name: "John doe",
        email: "le@le.com",
        password: "123456",
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
