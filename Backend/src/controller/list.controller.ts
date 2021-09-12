import { Request, Response } from "express";
import log from "../logger";
import { get } from "lodash";
import {
  createList,
  removelistFromBoard,
  removeList,
  updateList,
  findAllListByBoard,
} from "../service/list.service";
import Board from "../model/board.model";

export const createListHandler = async (req: Request, res: Response) => {
  const boardId = get(req, "params.boardId");
  const body = req.body;

  try {
    const list = await createList({ ...body, board: boardId }, { boardId });

    res.json(list);
  } catch (error: any) {
    log.error(error);
    return res.status(409);
  }
};

export const removeListHandler = async (req: Request, res: Response) => {
  const boardId = get(req, "params.boardId");
  const { listId } = req.body;

  try {
    await removelistFromBoard(boardId, listId);
    await removeList(listId);

    res.sendStatus(200);
  } catch (error: any) {
    log.error(error);
    return res.status(409);
  }
};

export const editListHandler = async (req: Request, res: Response) => {
  const listId = get(req, "params.listId");
  const update = req.body;

  const updatedList = await updateList({ _id: listId }, update, {
    new: true,
  });

  return res.send(updatedList);
};

export const moveListHandler = async (req: Request, res: Response) => {
  const listId = get(req, "params.listId");
  const toIndex = req.body.toIndex ? req.body.toIndex : 0;
  const { boardId } = req.body;

  console.log(boardId);

  const board = await Board.findById(boardId);

  if (!listId) {
    throw {
      status: 404,
      errors: [{ msg: "List not found" }],
    };
  }

  if (board) {
    board.lists.splice(board.lists.indexOf(listId), 1);
    board.lists.splice(toIndex, 0, listId);
    await board.save();

    return res.json(board.lists);
  }

  return res.json({ msg: "Board is not found" });
};

export const getAllListByBoardId = async (req: Request, res: Response) => {
  const boardId = get("req", "params.boardId");

  const lists = await findAllListByBoard({ boardId });

  return res.json(lists);
};
