interface IMailConfig {
  driver: "ethereal" | "ses";
}

const mailConfig = {
  driver: process.env.MAIL_DRIVER || "ethereal",
  defaults: {
    from: {
      email: 'leandro@lemoraes.dev'
    }
  }
};

mailConfig as IMailConfig;

export { mailConfig };
