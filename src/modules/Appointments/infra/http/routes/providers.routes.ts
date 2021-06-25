import { Router } from "express";

import { ensureAuthenticate } from "@modules/Users/infra/http/middlewares/ensureAuthenticate";
import { ProvidersController } from "../controllers/ProvidersController";
import { ProviderDayAvaliabilityController } from "../controllers/ProviderDayAvaliabilityController";
import { ProviderMonthAvaliabilityController } from "../controllers/ProviderMonthAvaliabilityController";

const providerRouter = Router();
const providersController = new ProvidersController();
const providerMonthAvaliabilityController = new ProviderMonthAvaliabilityController();
const providerDayAvaliabilityController = new ProviderDayAvaliabilityController();

providerRouter.use(ensureAuthenticate);

providerRouter.get("/", providersController.index);
providerRouter.get(
  "/:provider_id/month-availability",
  providerMonthAvaliabilityController.index
);
providerRouter.get(
  "/:provider_id/day-availability",
  providerDayAvaliabilityController.index
);

export { providerRouter };
