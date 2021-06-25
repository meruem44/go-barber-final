import { IParseMailTemplateDTO } from "@shared/container/providers/MailTemplateProvider/DTOS/IParseMailTemplateDTO";

interface IMailContent {
  name: string;
  email: string;
}

interface ISendEmailDTO {
  to: IMailContent;
  from?: IMailContent;
  subject: string;
  templateData: IParseMailTemplateDTO;
}

export { ISendEmailDTO };
