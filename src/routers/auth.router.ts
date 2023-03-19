import { Router } from "express";

import { authController } from "../controllers";
import {
  authMiddleware,
  commonMiddleware,
  userMiddleware,
} from "../middlewares";
import { UserValidator } from "../validators";

const router = Router();

router.post(
  "/register",
  commonMiddleware.isBodyValid(UserValidator.createUser),
  userMiddleware.getDynamicallyAndThrow("email"),
  authController.register
);

router.post(
  "/login",
  commonMiddleware.isBodyValid(UserValidator.loginUser),
  userMiddleware.getDynamicallyOrThrow("email"),
  authController.login
);

router.post(
  "/password/change",
  commonMiddleware.isBodyValid(UserValidator.changeUserPassword),
  authMiddleware.checkAccessToken,
  authController.changePassword
);

router.post(
  "/refresh",
  authMiddleware.checkRefreshToken,
  authController.refresh
);

export const authRouter = router;
