import { Router } from "express";

import { ProfileController } from "../controllers/ProfileController";

import { ensureAuthenticate } from "@modules/Users/infra/http/middlewares/ensureAuthenticate";

const profileRouter = Router();
const profileController = new ProfileController();

profileRouter.use(ensureAuthenticate);

profileRouter.put("/", profileController.create);
profileRouter.get("/profile", profileController.show);

export { profileRouter };
