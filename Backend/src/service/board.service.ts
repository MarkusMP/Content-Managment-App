import {
  DocumentDefinition,
  FilterQuery,
  QueryOptions,
  UpdateQuery,
} from "mongoose";
import Board, { BoardDocument } from "../model/board.model";

export const createBoard = async (input: DocumentDefinition<BoardDocument>) => {
  try {
    return await Board.create(input);
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getBoard = async (
  query: FilterQuery<BoardDocument>,
  options: QueryOptions = { lean: true }
) => {
  return Board.find(query, {}, options);
};

export const getOneBoard = async (query: FilterQuery<BoardDocument>) => {
  return Board.findOne(query).populate("lists", "title");
};

export const deleteBoardByUser = async (query: FilterQuery<BoardDocument>) => {
  return Board.deleteOne(query);
};

export const findAndUpdateBoard = async (
  query: FilterQuery<BoardDocument>,
  update: UpdateQuery<BoardDocument>,
  options: QueryOptions
) => {
  return Board.findOneAndUpdate(query, update, options);
};
