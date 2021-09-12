import { Request, Response } from "express";
import log from "../logger";
import { get } from "lodash";
import {
  createCard,
  removeCard,
  removeCardFromList,
  updateCard,
} from "../service/card.service";
import List from "../model/list.model";

export const createCardHandler = async (req: Request, res: Response) => {
  const listId = get(req, "params.listId");
  const body = req.body;

  try {
    const card = await createCard({ ...body, list: listId });

    res.json(card);
  } catch (error: any) {
    log.error(error);
    return res.status(409);
  }
};

export const removeCardHandler = async (req: Request, res: Response) => {
  const listId = get(req, "params.listId");
  const { cardId } = req.body;

  try {
    await removeCardFromList(listId, cardId);
    await removeCard(cardId);

    res.sendStatus(200);
  } catch (error: any) {
    log.error(error);
    return res.status(409);
  }
};

export const editCardHandler = async (req: Request, res: Response) => {
  const cardId = get(req, "params.cardId");
  const update = req.body;

  console.log(cardId);

  const updatedCard = await updateCard({ _id: cardId }, update, {
    new: true,
  });

  return res.json(updatedCard);
};

export const moveCardHandler = async (req: Request, res: Response) => {
  const cardId = get(req, "params.cardId");
  const toIndex = req.body.toIndex ? req.body.toIndex : 0;
  const { listId } = req.body;

  const list = await List.findById(listId);

  if (!cardId) {
    throw {
      status: 404,
      errors: [{ msg: "Card not found" }],
    };
  }

  if (list) {
    list.cards.splice(list.cards.indexOf(cardId), 1);
    list.cards.splice(toIndex, 0, cardId);
    await list.save();

    return res.json(list);
  }

  return res.json({ msg: "List is not found" });
};
