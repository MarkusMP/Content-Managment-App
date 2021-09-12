import express from "express";
import {
  createCardHandler,
  removeCardHandler,
  editCardHandler,
  moveCardHandler,
} from "../controller/card.controller";
import requiresUser from "../middleware/requiresUser";
import validateRequest from "../middleware/validateRequest";
import { createCardSchema, editCardSchema } from "../schema/card.schema";

const router = express.Router();

router
  .route("/:listId")
  .post([requiresUser, validateRequest(createCardSchema)], createCardHandler)
  .delete(requiresUser, removeCardHandler);

router
  .route("/cards/:cardId")
  .put([requiresUser, validateRequest(editCardSchema)], editCardHandler)
  .post(requiresUser, moveCardHandler);

export default router;
