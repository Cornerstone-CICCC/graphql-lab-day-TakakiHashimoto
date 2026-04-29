import mongoose, { Document, Schema } from "mongoose";

const customerSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
  },
  { timestamps: true },
);

export interface ICustomer extends Document {
  firstName: string;
  lastName: string;
  email: string;
}

export const Customer = mongoose.model<ICustomer>("Customer", customerSchema);
