import { container } from "tsyringe";
import { mailConfig } from "@config/mail";

import { IStorageProvider } from "./StorageProvider/models/IStorageProvider";
import { DiskStorageProvider } from "./StorageProvider/implementations/DiskStorageProvider";

import { IMailProvider } from "../providers/MailProvider/models/IMailProvider";
import { EtherealMailProvider } from "../providers/MailProvider/implementations/EtherealMailProvider";
import { SESMailProvider } from "../providers/MailProvider/implementations/SESMailProvider";

import { HandleBarsMailTemplateProvider } from "./MailTemplateProvider/implementations/HandleBarsMailTemplateProvider";
import { IMailTemplateProvider } from "./MailTemplateProvider/models/IMailTemplateProvider";

container.registerSingleton<IStorageProvider>(
  "StorageProvider",
  DiskStorageProvider
);

container.registerSingleton<IMailTemplateProvider>(
  "MailTemplateProvider",
  HandleBarsMailTemplateProvider
);

container.registerInstance<IMailProvider>(
  "MailProvider",
  mailConfig.driver === "ethereal"
    ? container.resolve(EtherealMailProvider)
    : container.resolve(SESMailProvider)
);
