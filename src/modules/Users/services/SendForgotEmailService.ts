import { inject, injectable } from "tsyringe";
import { resolve } from "path";

import { IUserRepository } from "@modules/Users/repositories/IUsersRepository";
import { IMailProvider } from "@shared/container/providers/MailProvider/models/IMailProvider";
import { IUsersTokenRepository } from "@modules/Users/repositories/IUsersTokenRepository";

import { AppError } from "@shared/errors/AppError";

interface IRequest {
  email: string;
}

@injectable()
class SendForgotEmailService {
  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository,
    @inject("MailProvider")
    private mailProvider: IMailProvider,
    @inject("UsersTokenRepository")
    private usersTokenRepository: IUsersTokenRepository
  ) {}

  public async execute({ email }: IRequest): Promise<void> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new AppError("user does not exist");
    }

    const { token } = await this.usersTokenRepository.generate(user.id);

    const forgotPasswordTemplate = resolve(
      __dirname,
      "..",
      "views",
      "forgot_password.hbs"
    );

    await this.mailProvider.sendMail({
      to: {
        name: user.name,
        email: user.email,
      },
      subject: "[Gobarber] - Recuperação de Senha",
      templateData: {
        file: forgotPasswordTemplate,
        variables: {
          name: user.name,
          link: `${process.env.APP_WEB_URL}/reset_password?token=${token}`,
        },
      },
    });
  }
}

export { SendForgotEmailService };
