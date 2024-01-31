import { Schema, model } from "mongoose";
import { v4 as uuid } from "uuid";

const ticketSchema = new Schema(
  {
    code: { type: String, default: uuid() },
    purchase_datetime: { type: Date, default: Date.now },
    amount: { type: Number, required: true },
    purchaser: { type: String, required: true },
  },
  { versionKey: false }
);

export const ticketModel = model("ticket", ticketSchema);
