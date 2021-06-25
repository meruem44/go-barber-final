import { Router } from "express";

import { ensureAuthenticate } from "@modules/Users/infra/http/middlewares/ensureAuthenticate";
import { AppointmentController } from "../controllers/AppointmentController";
import { ProviderAppointmentController } from "../controllers/ProviderAppointmentsController";

const appointmentsRouter = Router();
const appointmentController = new AppointmentController();
const providerAppointmentController = new ProviderAppointmentController();

appointmentsRouter.use(ensureAuthenticate);

appointmentsRouter.post("/", appointmentController.create);
appointmentsRouter.get("/me", providerAppointmentController.index);

export { appointmentsRouter };
