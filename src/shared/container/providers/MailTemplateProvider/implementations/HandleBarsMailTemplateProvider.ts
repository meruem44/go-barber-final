import handlebars from "handlebars";
import fs from "fs";

import { IParseMailTemplateDTO } from "../DTOS/IParseMailTemplateDTO";
import { IMailTemplateProvider } from "../models/IMailTemplateProvider";

class HandleBarsMailTemplateProvider implements IMailTemplateProvider {
  public async parse({
    variables,
    file,
  }: IParseMailTemplateDTO): Promise<string> {
    const templateFileContent = await fs.promises.readFile(file, {
      encoding: "utf-8",
    });

    const parseTemplate = handlebars.compile(templateFileContent);

    return parseTemplate(variables);
  }
}

export { HandleBarsMailTemplateProvider };
