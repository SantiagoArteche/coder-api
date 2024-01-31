import { Router } from "express";
import {
  addProductToCart,
  changeProductQuantity,
  clearCart,
  createCart,
  deleteCartProduct,
  getCart,
  getCartById,
  updateCart,
} from "../controllers/carts.controller.js";
import { buy } from "../controllers/tickets.controllers.js";
import { passportError, authorization } from "../utils/messagesError.js";

const cartRouter = Router();

cartRouter.get("/", passportError("jwt"), authorization("user"), getCart);

cartRouter.get(
  "/:cid",
  passportError("jwt"),
  authorization("user"),
  getCartById
);

cartRouter.post("/", passportError("jwt"), authorization("user"), createCart);

cartRouter.post(
  "/:cid/products/:pid",
  passportError("jwt"),
  authorization("user"),
  addProductToCart
);
cartRouter.put(
  "/:cid",
  passportError("jwt"),
  authorization("user"),
  updateCart
);

cartRouter.delete(
  "/:cid",
  passportError("jwt"),
  authorization("user"),
  clearCart
);

cartRouter.delete(
  "/:cid/products/:pid",
  passportError("jwt"),
  authorization("user"),
  deleteCartProduct
);

cartRouter.put(
  "/:cid/products/:pid",
  passportError("jwt"),
  authorization("user"),
  changeProductQuantity
);

cartRouter.post(
  "/:cid/purchase",
  passportError("jwt"),
  authorization(
    "user"
  ) /* Cambiar por premium para comprobar descuento sobre total amount  */,
  buy
);

export default cartRouter;
