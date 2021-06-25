import { IParseMailTemplateDTO } from "../DTOS/IParseMailTemplateDTO";
import { IMailTemplateProvider } from "../models/IMailTemplateProvider";

class FakeMailTemplateProvider implements IMailTemplateProvider {
  public async parse(data: IParseMailTemplateDTO): Promise<string> {
    return "Email template";
  }
}

export { FakeMailTemplateProvider };
