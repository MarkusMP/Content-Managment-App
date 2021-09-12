import {
  DocumentDefinition,
  FilterQuery,
  QueryOptions,
  UpdateQuery,
} from "mongoose";
import List, { ListDocument } from "../model/list.model";
import Board, { BoardDocument } from "../model/board.model";

export const createList = async (
  input: DocumentDefinition<ListDocument>,
  boardId: object
) => {
  try {
    const list = await List.create(input);

    await addListToBoard(boardId, list._id);

    return list;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const addListToBoard = async (
  query: FilterQuery<BoardDocument>,
  listId: string
) => {
  return Board.findOne(query).updateOne({ $push: { lists: listId } });
};

export const removeList = async (query: FilterQuery<ListDocument>) => {
  return List.findByIdAndRemove(query);
};

export const removelistFromBoard = async (
  query: FilterQuery<BoardDocument>,
  listId: string
) => {
  return await Board.updateOne({ _id: query }, { $pull: { lists: listId } });
};

export const updateList = async (
  query: FilterQuery<ListDocument>,
  update: UpdateQuery<ListDocument>,
  options: QueryOptions
) => {
  return List.findOneAndUpdate(query, update, options);
};

export const findAllListByBoard = async (query: FilterQuery<ListDocument>) => {
  return List.find(query).populate("cards", "title");
};
