import { Types } from "mongoose";

import { IUser } from "./user.types";

export interface ICar {
  _id?: string;
  brand: string;
  model: string;
  year: number;
  user: IUser | Types.ObjectId;
}
