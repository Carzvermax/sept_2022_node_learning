import { UploadedFile } from "express-fileupload";

import { ApiError } from "../errors";
import { User } from "../models";
import { IUser } from "../types";
import { s3Service } from "./s3.service";

interface IPaginationResponse<T> {
  page: number;
  perPage: number;
  itemsCount: number;
  itemsFound: number;
  data: T[];
}
class UserService {
  public async getAll(): Promise<IUser[]> {
    try {
      return User.find();
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async getWithPagination(
    query: any
  ): Promise<IPaginationResponse<IUser>> {
    try {
      const user = await User.findById("641a411e3b1ef08d9cfb1548");

      console.log(user.nameWithSurname);

      const queryStr = JSON.stringify(query);
      const queryObj = JSON.parse(
        queryStr.replace(/\b(gte|lte|gt|lt)\b/, (match) => `$${match}`)
      );
      const {
        limit = 5,
        page = 1,
        sortedBy = "createdAt",
        ...searchObject
      } = queryObj;
      const skip = limit * (page - 1);
      const users = await User.find(searchObject)
        .skip(skip)
        .limit(limit)
        .sort(sortedBy)
        .lean();
      const usersTotalCount = await User.count();

      return {
        itemsCount: +usersTotalCount,
        page: +page,
        perPage: +limit,
        itemsFound: users.length,
        data: users,
      };
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }
  public async getById(id: string): Promise<IUser> {
    try {
      return User.findById(id);
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }
  public async uploadAvatar(file: UploadedFile, user: IUser): Promise<IUser> {
    try {
      const filePath = await s3Service.uploadPhoto(file, "user", user._id);
      if (user.avatar) {
        await s3Service.deletePhoto(user.avatar);
      }

      return await User.findByIdAndUpdate(
        user._id,
        { avatar: filePath },
        { new: true }
      );
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }
  public async deleteAvatar(user: IUser): Promise<IUser> {
    try {
      if (!user.avatar) {
        throw new ApiError("User doesn't have avatar", 422);
      }

      await s3Service.deletePhoto(user.avatar);

      return await User.findByIdAndUpdate(
        user._id,
        { $unset: { avatar: user.avatar } },
        { new: true }
      );
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }
}
export const userService = new UserService();
