import express from "express";
const router = express.Router();
import { registerUser } from "../controller/UserController";
import validateRequest from "../middleware/validateRequest";
import { createUserSchema } from "../schema/user.schema";

router.post("/", validateRequest(createUserSchema), registerUser);

export default router;
