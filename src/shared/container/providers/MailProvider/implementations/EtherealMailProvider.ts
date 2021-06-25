import nodemailer, { Transporter } from "nodemailer";
import { inject, injectable } from "tsyringe";

import { IMailProvider } from "../models/IMailProvider";
import { ISendEmailDTO } from "../DTOS/ISendMailDTO";

import { IMailTemplateProvider } from "@shared/container/providers/MailTemplateProvider/models/IMailTemplateProvider";

@injectable()
class EtherealMailProvider implements IMailProvider {
  private client: Transporter;

  constructor(
    @inject("MailTemplateProvider")
    private mailTemplateProvider: IMailTemplateProvider
  ) {
    nodemailer.createTestAccount().then((account) => {
      const transporte = nodemailer.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
          user: account.user,
          pass: account.pass,
        },
      });
      this.client = transporte;
    });
  }

  public async sendMail({
    subject,
    to,
    from,
    templateData,
  }: ISendEmailDTO): Promise<void> {
    const message = await this.client.sendMail({
      from: {
        name: from?.name || "Equipe Gobarber",
        address: from?.email || "equipe@gobarber.com.br",
      },
      to: {
        name: to.name,
        address: to.email,
      },
      subject,
      html: await this.mailTemplateProvider.parse(templateData),
    });

    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(message));
  }
}

export { EtherealMailProvider };
