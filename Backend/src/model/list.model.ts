import mongoose, { Schema, PopulatedDoc } from "mongoose";

export interface ListDocument extends mongoose.Document {
  title: string;
  cards: Array<cardArr>;
  board: Schema.Types.ObjectId;
}

interface cardArr extends mongoose.Document {
  type: Schema.Types.ObjectId;
  ref: "Card";
}

const listSchema = new mongoose.Schema({
  title: { type: String, rquired: true },
  cards: [{ type: Schema.Types.ObjectId, ref: "Card" }],
  board: { type: Schema.Types.ObjectId, ref: "Board" },
});

const List = mongoose.model<ListDocument>("List", listSchema);

export default List;
