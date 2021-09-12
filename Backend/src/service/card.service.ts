import {
  DocumentDefinition,
  FilterQuery,
  QueryOptions,
  UpdateQuery,
} from "mongoose";
import Card, { CardDocument } from "../model/card.model";
import List, { ListDocument } from "../model/list.model";

export const createCard = async (input: DocumentDefinition<CardDocument>) => {
  try {
    const card = await Card.create(input);

    await addCardToList({ _id: input.list }, card._id);

    return card;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const addCardToList = async (
  query: FilterQuery<ListDocument>,
  cardId: string
) => {
  return List.findOne(query).updateOne({ $push: { cards: cardId } });
};

export const removeCard = async (query: FilterQuery<ListDocument>) => {
  return Card.findByIdAndRemove(query);
};

export const removeCardFromList = async (
  query: FilterQuery<ListDocument>,
  cardId: string
) => {
  return await List.updateOne({ _id: query }, { $pull: { cards: cardId } });
};

export const updateCard = async (
  query: FilterQuery<CardDocument>,
  update: UpdateQuery<CardDocument>,
  options: QueryOptions
) => {
  return Card.findOneAndUpdate(query, update, options);
};
