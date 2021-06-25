import { Router } from "express";

import { appointmentsRouter } from "@modules/Appointments/infra/http/routes/appointments.routes";
import { usersRouter } from "@modules/Users/infra/http/routes/users.routes";
import { sessiosRouter } from "@modules/Users/infra/http/routes/sessions.routes";
import { passwordRouter } from "@modules/Users/infra/http/routes/password.routes";
import { profileRouter } from "@modules/Users/infra/http/routes/profile.routes";
import { providerRouter } from "@modules/Appointments/infra/http/routes/providers.routes";

const routes = Router();

routes.use("/appointments", appointmentsRouter);
routes.use("/users", usersRouter);
routes.use("/sessions", sessiosRouter);
routes.use("/password", passwordRouter);
routes.use("/profile", profileRouter);
routes.use("/providers", providerRouter);

export { routes };
