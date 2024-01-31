import cartRouter from "./carts.routes.js";
import loggerRouter from "./logger.routes.js";
import mockingRouter from "./mocking.routes.js";
import productRouter from "./products.routes.js";
import sessionRouter from "./session.routes.js";
import userRouter from "./users.routes.js";
import { Router } from "express";

export const router = Router();

router.use("/api/products", productRouter);
router.use("/api/users", userRouter);
router.use("/api/session", sessionRouter);
router.use("/api/carts", cartRouter);
router.use("/api/mocking", mockingRouter);
router.use("/api/logger", loggerRouter);
