import mongoose, { Schema } from "mongoose";
import { ListDocument } from "../model/list.model";

export interface BoardDocument extends mongoose.Document {
  title: string;
  backgroundURL: string;
  created_at: Date;
  updated_at: Date;
  user: Schema.Types.ObjectId;
  lists: Array<ListDocument>;
}

const BoardSchema = new mongoose.Schema(
  {
    title: { required: true, type: String },
    backgroundURL: { type: String },
    lists: [{ type: Schema.Types.ObjectId, ref: "List" }],
    user: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const Board = mongoose.model<BoardDocument>("Board", BoardSchema);

export default Board;
