import { Request, Response } from "express";
import log from "../logger";
import { get } from "lodash";
import {
  createList,
  removelistFromBoard,
  removeList,
  updateList,
} from "../service/list.service";

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
