import { Router } from "express";

import { authController } from "../controllers";
import { EActionTokenType } from "../enums/action-token-type.enum";
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
  "/password/forgot",
  commonMiddleware.isBodyValid(UserValidator.emailValidator),
  userMiddleware.getDynamicallyOrThrow("email"),
  authController.forgotPassword
);

router.put(
  `/password/forgot/:token`,
  authMiddleware.checkActionToken(EActionTokenType.forgot),
  authController.setForgotPassword
);

router.post(
  "/activate",
  commonMiddleware.isBodyValid(UserValidator.emailValidator),
  userMiddleware.getDynamicallyOrThrow("email"),
  authController.sendActivateToken
);

router.put(
  `/activate/:token`,
  authMiddleware.checkActionToken(EActionTokenType.activate),
  authController.activate
);

router.post(
  "/refresh",
  authMiddleware.checkRefreshToken,
  authController.refresh
);

export const authRouter = router;
