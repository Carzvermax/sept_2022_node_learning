import { IUser } from "./user.types";

export type ICredentials = Pick<IUser, "email" | "password">;
