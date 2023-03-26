import { model, Schema, Types } from "mongoose";

import { User } from "./User.model";

const carSchema = new Schema(
  {
    brand: {
      type: String,
      trim: true,
      lowercase: true,
      required: true,
    },
    model: {
      type: String,
      trim: true,
      lowercase: true,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    user: {
      type: Types.ObjectId,
      required: true,
      ref: User,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);
export const Car = model("car", carSchema);
