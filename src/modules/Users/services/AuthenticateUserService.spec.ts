import "reflect-metadata";

import { AppError } from "@shared/errors/AppError";

import { AuthenticateUserService } from "./AuthenticateUserService";
import { FakeHasheProvider } from "@modules/Users/provider/HashProvider/fakes/FakeHasheProvider";
import { CreateUserService } from "./CreateUserService";
import { FakeUserRepository } from "@modules/Users/repositories/fakes/FakeUserRepository";

let fakeUserRepository: FakeUserRepository;
let fakeHasheProvider: FakeHasheProvider;
let authenticateUser: AuthenticateUserService;
let createUser: CreateUserService;

describe("AutheticateUser", () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeHasheProvider = new FakeHasheProvider();

    authenticateUser = new AuthenticateUserService(
      fakeUserRepository,
      fakeHasheProvider
    );

    createUser = new CreateUserService(fakeUserRepository, fakeHasheProvider);
  });

  it("should be able to authenticate", async () => {
    await createUser.execute({
      name: "john doe",
      email: "leandro@leandro.com",
      password: "123456",
    });

    const response = await authenticateUser.execute({
      email: "leandro@leandro.com",
      password: "123456",
    });

    expect(response).toHaveProperty("token");
  });

  it("should not be able to authenticate to user not exist", async () => {
    expect(
      authenticateUser.execute({
        email: "leandro@leandro.com",
        password: "123456",
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to authenticate with wrong password", async () => {
    await createUser.execute({
      name: "john doe",
      email: "leandro@leandro.com",
      password: "123456",
    });

    expect(
      authenticateUser.execute({
        email: "leandro@leandro.com",
        password: "asdfgasyhdfhasgfd",
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
