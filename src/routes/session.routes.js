import { Router } from "express";
import passport from "passport";
import { passportError, authorization } from "../utils/messagesError.js";
import {
  currentSession,
  deleteInactiveSessions,
  github,
  githubCallback,
  login,
  logout,
  register,
} from "../controllers/session.controller.js";

const sessionRouter = Router();

sessionRouter.post("/login", passport.authenticate("login"), login);

sessionRouter.post("/register", passport.authenticate("register"), register);

sessionRouter.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] }),
  github
);

sessionRouter.get(
  "/githubCallback",
  passport.authenticate("github"),
  githubCallback
);

sessionRouter.get("/logout", logout);

sessionRouter.delete("/inactiveUsers", deleteInactiveSessions);

sessionRouter.get(
  "/current",
  passportError("jwt"),
  authorization("user"),
  currentSession
);

export default sessionRouter;
