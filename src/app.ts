import { config } from "dotenv";
import express, { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";

config();

import { userRouter } from "./routers/user.router";
import { IError } from "./types/common.types";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/users", userRouter);

app.use((err: IError, req: Request, res: Response, next: NextFunction) => {
  const status = err.status || 500;
  return res.status(status).json({
    message: err.message,
    status,
  });
});

app.listen(process.env.PORT, () => {
  mongoose.connect(process.env.DB_URL);
  console.log(`Server has started on PORT ${process.env.PORT} 🚀🚀🚀`);
});