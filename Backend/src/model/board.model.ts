import mongoose, { Schema } from "mongoose";

export interface BoardDocument extends mongoose.Document {
  title: string;
  backgroundURL: string;
  created_at: Date;
  updated_at: Date;
  lists: mongoose.Types.ObjectId;
  user: mongoose.Types.ObjectId;
}

const BoardSchema = new mongoose.Schema(
  {
    title: { required: true, type: String },
    backgroundURL: { type: String },
    lists: { type: Schema.Types.ObjectId, ref: "List" },
    user: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const Board = mongoose.model<BoardDocument>("Board", BoardSchema);

export default Board;
