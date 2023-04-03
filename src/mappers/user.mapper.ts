import { configs } from "../configs/config";
import { IUser } from "../types";

export class UserMapper {
  public toResponse(user: IUser) {
    return {
      _id: user._id,
      name: user.name,
      email: user.email,
      age: user.age,
      avatar: user.avatar ? `${configs.AWS_S3_URL}/${user.avatar}` : null,
      password: user.password,
      gender: user.gender,
      phone: user.phone,
    };
  }
  public toManyResponse(users: IUser[]) {
    return users.map(this.toResponse);
  }
}
export const userMapper = new UserMapper();
