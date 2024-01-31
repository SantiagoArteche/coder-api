import { Router } from "express";
import {
  createUser,
  getUsers,
  resetPassword,
  passwordRecovery,
  getUserById,
  deleteUser,
  updateUser,
  uploadUserDocuments,
} from "../controllers/users.controller.js";
import upload from "../config/multer.js";

const userRouter = Router();

userRouter.get("/", getUsers);

userRouter.get("/:uid", getUserById);

userRouter.post("/", createUser);

userRouter.put("/:uid", updateUser);

userRouter.delete("/:uid", deleteUser);

userRouter.post("/password-recovery", passwordRecovery);

userRouter.post("/reset-password/:token", resetPassword);

userRouter.post(
  "/:uid/documents",
  upload.array("productImage", 2),
  uploadUserDocuments
);

export default userRouter;
