import { Router } from "express";
import {
  getProducts,
  getProductById,
  putProduct,
  deleteProduct,
  postProduct,
} from "../controllers/products.controller.js";
import { passportError, authorization } from "../utils/messagesError.js";

const productRouter = Router();

productRouter.get("/", getProducts);

productRouter.get("/:pid", getProductById);

productRouter.post(
  "/",
  passportError("jwt"),
  authorization("user"),
  postProduct
);

productRouter.put(
  "/:pid",
  passportError("jwt"),
  authorization("admin"),
  putProduct
);

productRouter.delete(
  "/:pid",
  passportError("jwt"),
  authorization("admin"),
  deleteProduct
);
export default productRouter;
