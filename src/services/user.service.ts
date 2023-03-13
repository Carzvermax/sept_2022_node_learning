import { ApiError } from "../errors/api.error";
import { User } from "../models/User.model";
import { IUser } from "../types/user.types";

class UserService {
  public async getAll(): Promise<IUser[]> {
    try {
      return User.find();
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }
}

export const userService = new UserService();
