import app from "./app";
import { globalHandleError } from "./middlewares/globalHandleError";

app.use(globalHandleError);

app.listen(process.env.PORT || 3333, () => {
  console.log("Server is Running");
});
