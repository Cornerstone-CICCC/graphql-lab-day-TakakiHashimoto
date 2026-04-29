import mongoose, { Document } from "mongoose";

export interface IProducts extends Document {
  productName: string;
  productPrice: number;
}

const ProductSchema = new mongoose.Schema({
  productName: { type: String, required: true },
  productPrice: { type: Number, required: true },
});

export const Product = mongoose.model<IProducts>("Product", ProductSchema);
