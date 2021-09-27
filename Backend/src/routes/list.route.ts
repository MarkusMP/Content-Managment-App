import express from "express";
import validateRequest from "../middleware/validateRequest";
import requiresUser from "../middleware/requiresUser";
import {
  createListHandler,
  removeListHandler,
  editListHandler,
  moveListHandler,
  getAllListByBoardId,
} from "../controller/list.controller";
import {
  createListSchema,
  getAllListsByBoardIdSchema,
} from "../schema/list.schema";

const router = express.Router();

router
  .route("/:boardId")
  .post([requiresUser, validateRequest(createListSchema)], createListHandler)
  .delete(requiresUser, removeListHandler)
  .get(
    [requiresUser, validateRequest(getAllListsByBoardIdSchema)],
    getAllListByBoardId
  );

router
  .route("/list/:listId")
  .put(requiresUser, editListHandler)
  .post(requiresUser, moveListHandler);

export default router;
