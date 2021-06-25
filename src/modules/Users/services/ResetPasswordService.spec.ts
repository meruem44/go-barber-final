import { AppError } from "@shared/errors/AppError";

import { FakeUserRepository } from "@modules/Users/repositories/fakes/FakeUserRepository";
import { FakeUsersTokenRepository } from "@modules/Users/repositories/fakes/FakeUsersTokenRepository";
import { ResetPasswordService } from "./ResetPasswordService";
import { FakeHasheProvider } from "@modules/Users/provider/HashProvider/fakes/FakeHasheProvider";

let fakeUserRepository: FakeUserRepository;
let fakeUsersTokenRepository: FakeUsersTokenRepository;
let resetPassword: ResetPasswordService;
let fakeHasheProvider: FakeHasheProvider;

describe("ResetPassword", () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeUsersTokenRepository = new FakeUsersTokenRepository();
    fakeHasheProvider = new FakeHasheProvider();

    resetPassword = new ResetPasswordService(
      fakeUserRepository,
      fakeUsersTokenRepository,
      fakeHasheProvider
    );
  });

  it("should be able to reset pasword user", async () => {
    const user = await fakeUserRepository.create({
      name: "leandro",
      password: "123456",
      email: "le@le.com",
    });

    const { token } = await fakeUsersTokenRepository.generate(user.id);

    const generateHash = jest.spyOn(fakeHasheProvider, "generateHash");

    await resetPassword.execute({
      password: "123123",
      token,
    });

    const updatedUser = await fakeUserRepository.findById(user.id);

    expect(generateHash).toHaveBeenCalledWith("123123");
    expect(updatedUser?.password).toBe("123123");
  });

  it("should not be able to reset password with not-exist token", async () => {
    await expect(
      resetPassword.execute({
        token: "not-existing-token",
        password: "123456",
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to reset password with not-exist users", async () => {
    const { token } = await fakeUsersTokenRepository.generate("asdhjasd");

    await expect(
      resetPassword.execute({
        token: token,
        password: "123456",
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to reset password if passed more then 2 hours ", async () => {
    const user = await fakeUserRepository.create({
      name: "leandro",
      password: "123456",
      email: "le@le.com",
    });

    const { token } = await fakeUsersTokenRepository.generate(user.id);

    jest.spyOn(Date, "now").mockImplementationOnce(() => {
      const custodate = new Date();

      return custodate.setHours(custodate.getHours() + 3);
    });

    await expect(
      resetPassword.execute({
        password: "123123",
        token,
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
