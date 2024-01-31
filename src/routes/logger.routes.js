import { Router } from "express";
import { addLogger } from "../config/logger.js";

const loggerRouter = Router();

loggerRouter.use(addLogger);

loggerRouter.get("/warning", (request, response) => {
  request.logger.warning(`<span style="color:yellow">Warning</span><br/>`);
  response.send("Warning send");
});
loggerRouter.get("/error", (request, response) => {
  request.logger.error(`<span style="color:magenta">Error</span><br/>`);
  response.send("Error send");
});
loggerRouter.get("/fatal", (request, response) => {
  request.logger.fatal(`<span style="color:red">Fatal</span><br/>`);
  response.send("Fatal send");
});
loggerRouter.get("/info", (request, response) => {
  request.logger.info(`<span style="color:cyan">Info</span><br/>`);
  response.send("Info send");
});
export default loggerRouter;
