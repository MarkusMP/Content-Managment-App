import express from "express";
const router = express.Router();
import {
  createUserSessionHandler,
  invalidateUserSessionHandler,
  getUserSessionsHandler,
} from "../controller/session.controller";
import validateRequest from "../middleware/validateRequest";
import requiresUser from "../middleware/requiresUser";
import { createUserSessionSchema } from "../schema/user.schema";

router
  .route("/")
  .post(validateRequest(createUserSessionSchema), createUserSessionHandler)
  .get(requiresUser, getUserSessionsHandler)
  .delete(requiresUser, invalidateUserSessionHandler);

export default router;
