import mongoose, { Schema, PopulatedDoc } from "mongoose";
import { CardDocument } from "./card.model";

export interface ListDocument extends mongoose.Document {
  title: string;
  cards: Array<CardDocument>;
  board: Schema.Types.ObjectId;
}

const listSchema = new mongoose.Schema({
  title: { type: String, required: true },
  cards: [{ type: Schema.Types.ObjectId, ref: "Card" }],
  board: { type: Schema.Types.ObjectId, ref: "Board" },
});

const List = mongoose.model<ListDocument>("List", listSchema);

export default List;
