import { Router } from "express";

import multer from "multer";
import uploadConfig from "@config/upload";

import { UsersController } from "../controllers/UsersController";
import { UserAvatarController } from "../controllers/UserAvatarController";

import { ensureAuthenticate } from "@modules/Users/infra/http/middlewares/ensureAuthenticate";

const usersRouter = Router();
const upload = multer(uploadConfig);
const usersController = new UsersController();
const userAvatarController = new UserAvatarController();

usersRouter.post("/", usersController.create);

usersRouter.patch(
  "/",
  ensureAuthenticate,
  upload.single("avatar"),
  userAvatarController.update
);

export { usersRouter };
