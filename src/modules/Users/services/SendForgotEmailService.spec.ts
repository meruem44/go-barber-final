import "reflect-metadata";

import { AppError } from "@shared/errors/AppError";

import { SendForgotEmailService } from "./SendForgotEmailService";
import { FakeUserRepository } from "@modules/Users/repositories/fakes/FakeUserRepository";
import { FakeMailProvider } from "@shared/container/providers/MailProvider/fakes/FakeMailProvider";
import { FakeUsersTokenRepository } from "@modules/Users/repositories/fakes/FakeUsersTokenRepository";

let fakeUserRepository: FakeUserRepository;
let fakeMailProvider: FakeMailProvider;
let fakeUsersTokenRepository: FakeUsersTokenRepository;
let sendForgotEmail: SendForgotEmailService;

describe("SendForgotPasswordEmail", () => {
  beforeEach(() => {
    fakeMailProvider = new FakeMailProvider();
    fakeUserRepository = new FakeUserRepository();
    fakeUsersTokenRepository = new FakeUsersTokenRepository();

    sendForgotEmail = new SendForgotEmailService(
      fakeUserRepository,
      fakeMailProvider,
      fakeUsersTokenRepository
    );
  });

  it("should be able to recover the password user the email", async () => {
    const sendMail = jest.spyOn(fakeMailProvider, "sendMail");

    await fakeUserRepository.create({
      name: "leandro",
      email: "leandro@teste.com",
      password: "123456",
    });

    await sendForgotEmail.execute({ email: "leandro@teste.com" });

    expect(sendMail).toHaveBeenCalled();
  });

  it("should not be able to recover a non-exist user password", async () => {
    await expect(
      sendForgotEmail.execute({ email: "leandro@teste.com" })
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should generate a forgot password token", async () => {
    const sendMail = jest.spyOn(fakeMailProvider, "sendMail");
    const generateToken = jest.spyOn(fakeUsersTokenRepository, "generate");

    const user = await fakeUserRepository.create({
      name: "leandro",
      email: "leandro@teste.com",
      password: "123456",
    });

    await sendForgotEmail.execute({ email: "leandro@teste.com" });

    expect(generateToken).toHaveBeenCalledWith(user.id);
  });
});
