import nodemailer, { Transporter } from "nodemailer";
import aws from 'aws-sdk'
import { inject, injectable } from "tsyringe";

import { IMailProvider } from "../models/IMailProvider";
import { ISendEmailDTO } from "../DTOS/ISendMailDTO";

import { IMailTemplateProvider } from "@shared/container/providers/MailTemplateProvider/models/IMailTemplateProvider";

@injectable()
class SESMailProvider implements IMailProvider {
  private client: Transporter;

  constructor(
    @inject("MailTemplateProvider")
    private mailTemplateProvider: IMailTemplateProvider
  ) {
      this.client = nodemailer.createTransport({
          SES: new aws.SES({
              apiVersion: '2010-12-01',
              
          })
      })
  }

  public async sendMail({
    subject,
    to,
    from,
    templateData,
  }: ISendEmailDTO): Promise<void> {
    await this.client.sendMail({
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
  }
}

export { SESMailProvider };
