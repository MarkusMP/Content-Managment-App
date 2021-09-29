import mongoose, { Schema, PopulatedDoc } from "mongoose";
import { CardDocument } from "./card.model";

export interface ListDocument extends mongoose.Document {
  title: string;
  board: Schema.Types.ObjectId;

  cards: Array<CardDocument>;
}

const listSchema = new mongoose.Schema({
  board: { type: Schema.Types.ObjectId, ref: "Board" },

  title: { type: String, required: true },
  cards: [{ type: Schema.Types.ObjectId, ref: "Card" }],
});

const List = mongoose.model<ListDocument>("List", listSchema);

export default List;
