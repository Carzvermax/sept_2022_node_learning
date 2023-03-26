import { Model, model, Schema } from "mongoose";

import { EGenders, EUserStatus } from "../enums";
import { IUser } from "../types";

const userSchema = new Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    age: {
      type: String,
    },
    gender: {
      type: String,
      enum: EGenders,
    },
    status: {
      type: String,
      enum: EUserStatus,
      default: EUserStatus.inactive,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

interface IUserMethods {
  nameWithAge(): void;
}
interface IUserVirtuals {
  nameWithSurname: string;
}
interface IUserModel extends Model<IUser, object, IUserMethods, IUserVirtuals> {
  // eslint-disable-next-line no-unused-vars
  findByName(name: string): Promise<IUser[]>;
}

userSchema.virtual("nameWithSurname").get(function () {
  return `${this.name} Hulio`;
});
userSchema.methods = {
  nameWithAge() {
    return `${this.name} is ${this.age} years old`;
  },
};

userSchema.statics = {
  async findByName(name: string): Promise<IUser[]> {
    return this.find({ name });
  },
};
export const User = model<IUser, IUserModel>("user", userSchema);
