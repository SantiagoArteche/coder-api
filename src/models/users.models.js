import { Schema, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import { cartsModel } from "./carts.models.js";

const userSchema = new Schema(
  {
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
    },
    age: {
      type: Number,
      required: false,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    rol: {
      type: String,
      default: "user",
      enum: ["user", "premium"],
    },
    cart: {
      type: Schema.Types.ObjectId,
      ref: "carts",
    },
    documents: [
      {
        name: String,
        reference: String,
      },
    ],
    last_connection: {
      type: Date,
      default: Date.now,
    },
  },
  { versionKey: false }
);

userSchema.plugin(mongoosePaginate);

userSchema.pre("save", async function (next) {
  try {
    const newCart = await cartsModel.create({});

    this.cart = newCart._id;
  } catch (error) {
    next(error);
  }
});

export const usersModel = model("users", userSchema);
