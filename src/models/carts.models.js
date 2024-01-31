import { Schema, model } from "mongoose";

const cartsSchema = new Schema(
  {
    products: {
      type: [
        {
          id_prod: {
            type: Schema.Types.ObjectId,
            ref: "products",
            required: true,
          },
          quantity: {
            type: Number,
            required: true,
          },
        },
      ],
      default: function () {
        return [];
      },
    },
  },
  { versionKey: false }
);

cartsSchema.pre("findOne", function () {
  this.populate("products.id_prod");
});

export const cartsModel = model("carts", cartsSchema);
