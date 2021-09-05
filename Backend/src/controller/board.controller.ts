import { Request, Response } from "express";
import log from "../logger";
import { omit } from "lodash";
import {
  createBoard,
  getBoard,
  getOneBoard,
  deleteBoardByUser,
} from "../service/board.service";
import { get } from "lodash";

const boardCreateHandler = async (req: Request, res: Response) => {
  const userId = get(req, "user._id");
  const body = req.body;
  try {
    const board = await createBoard({ ...body, user: userId });
    return res.send(omit(board.toJSON()));
  } catch (error: any) {
    log.error(error);
    return res.status(409);
  }
};

const getBoardByUser = async (req: Request, res: Response) => {
  const userId = get(req, "user._id");

  const boards = await getBoard({ user: userId });

  if (!boards) {
    return res.sendStatus(404);
  }

  return res.json(boards);
};

const deleteBoard = async (req: Request, res: Response) => {
  const userId = get(req, "user._id");
  const boardId = get(req, "params.boardId");

  const board = await getOneBoard({ boardId });

  if (!board) {
    return res.sendStatus(404);
  }

  if (String(board.user) !== String(userId)) {
    return res.sendStatus(401);
  }

  await deleteBoardByUser({ boardId });

  return res.sendStatus(200);
};

const findOneBoardById = async (req: Request, res: Response) => {
  const userId = get(req, "user._id");
  const boardId = get(req, "params.boardId");

  const board = await getOneBoard({ boardId });

  if (!board) {
    return res.sendStatus(404);
  }

  if (String(board.user) !== String(userId)) {
    return res.sendStatus(401);
  }

  res.json(board);
};

export { boardCreateHandler, getBoardByUser, deleteBoard, findOneBoardById };
