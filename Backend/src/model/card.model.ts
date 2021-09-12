import mongoose, { Schema } from "mongoose";

export interface CardDocument extends mongoose.Document {
  title: string;
  list: Schema.Types.ObjectId;
}

const cardSchema = new mongoose.Schema({
  title: { type: String, required: true },
  list: { type: Schema.Types.ObjectId, ref: "List" },
});

const Card = mongoose.model<CardDocument>("Card", cardSchema);

export default Card;
