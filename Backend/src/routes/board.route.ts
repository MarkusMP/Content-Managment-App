import express from "express";
const router = express.Router();
import validateRequest from "../middleware/validateRequest";
import requiresUser from "../middleware/requiresUser";
import {
  createBoardSchema,
  updateBoardSchema,
  deleteBoardSchema,
} from "../schema/board.schema";
import {
  boardCreateHandler,
  getBoardByUser,
  deleteBoard,
  findOneBoardById,
  updateBoard,
} from "../controller/board.controller";

router
  .route("/")
  .post([requiresUser, validateRequest(createBoardSchema)], boardCreateHandler)
  .get(requiresUser, getBoardByUser);

router
  .route("/:boardId")
  .delete([requiresUser, validateRequest(deleteBoardSchema)], deleteBoard)
  .get(requiresUser, findOneBoardById)
  .put([requiresUser, validateRequest(updateBoardSchema)], updateBoard);

export default router;
