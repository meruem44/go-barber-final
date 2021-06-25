import { IParseMailTemplateDTO } from "../DTOS/IParseMailTemplateDTO";

interface IMailTemplateProvider {
  parse(data: IParseMailTemplateDTO): Promise<string>;
}

export { IMailTemplateProvider };
