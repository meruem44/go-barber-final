import { ISendEmailDTO } from "../DTOS/ISendMailDTO";

interface IMailProvider {
  sendMail(data: ISendEmailDTO): Promise<void>;
}

export { IMailProvider };
