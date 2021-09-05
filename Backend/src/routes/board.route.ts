import express from "express";
const router = express.Router();
import validateRequest from "../middleware/validateRequest";
import requiresUser from "../middleware/requiresUser";
import { createBoardSchema } from "../schema/board.schema";
import {
  boardCreateHandler,
  getBoardByUser,
  deleteBoard,
  findOneBoardById,
} from "../controller/board.controller";

router
  .route("/")
  .post([requiresUser, validateRequest(createBoardSchema)], boardCreateHandler)
  .get(requiresUser, getBoardByUser);

router
  .route("/:boardId")
  .delete(requiresUser, deleteBoard)
  .get(requiresUser, findOneBoardById);

export default router;
