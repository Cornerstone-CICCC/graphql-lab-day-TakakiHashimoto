import mongoose, { Document, Schema } from "mongoose";

const orderSchema = new Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },
  },
  { timestamps: true },
);

export interface IOrder extends Document {
  productId: string;
  customerId: string;
}

export const Order = mongoose.model("Order", orderSchema);
