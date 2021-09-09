import express from "express";
import validateRequest from "../middleware/validateRequest";
import requiresUser from "../middleware/requiresUser";
import {
  createListHandler,
  removeListHandler,
  editListHandler,
} from "../controller/list.controller";
import { createListSchema } from "../schema/list.schema";

const router = express.Router();

router
  .route("/:boardId")
  .post([requiresUser, validateRequest(createListSchema)], createListHandler)
  .delete(requiresUser, removeListHandler);

router.route("/:listId").put(requiresUser, editListHandler);

export default router;
