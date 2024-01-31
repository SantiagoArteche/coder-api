import { Router } from "express";
import { getFakerProducts } from "../controllers/mocking.controller.js";

const mockingRouter = Router();

mockingRouter.get("/", getFakerProducts);

export default mockingRouter;
