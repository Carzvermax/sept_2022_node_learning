import { NextFunction, Request, Response } from "express";

import { ETokenType } from "../enums";
import { EActionTokenType } from "../enums/action-token-type.enum";
import { ApiError } from "../errors";
import { Action, Token } from "../models";
import { OldPassword } from "../models/Old.password.model";
import { passwordService, tokenService } from "../services";

class AuthMiddleware {
  public async checkAccessToken(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const accessToken = req.get("Authorization");

      if (!accessToken) {
        throw new ApiError("No token", 401);
      }

      const jwtPayload = tokenService.checkToken(accessToken);

      const tokenInfo = await Token.findOne({ accessToken });

      if (!tokenInfo) {
        throw new ApiError("Token not valid", 401);
      }

      req.res.locals = { tokenInfo, jwtPayload, user: tokenInfo._user_id };
      next();
    } catch (e) {
      next(e);
    }
  }

  public async checkRefreshToken(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const refreshToken = req.get("Authorization");

      if (!refreshToken) {
        throw new ApiError("No token", 401);
      }

      const jwtPayload = tokenService.checkToken(
        refreshToken,
        ETokenType.refresh
      );

      const tokenInfo = await Token.findOne({ refreshToken });

      if (!tokenInfo) {
        throw new ApiError("Token not valid", 401);
      }

      req.res.locals = { tokenInfo, jwtPayload };
      next();
    } catch (e) {
      next(e);
    }
  }

  public checkActionToken(type: EActionTokenType) {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const actionToken = req.params.token;

        if (!actionToken) {
          throw new ApiError("No token", 401);
        }

        const jwtPayload = tokenService.checkActionToken(actionToken, type);

        const tokenInfo = await Action.findOne({ actionToken });

        if (!tokenInfo) {
          throw new ApiError("Token not valid", 401);
        }

        req.res.locals = { tokenInfo, jwtPayload };
        next();
      } catch (e) {
        next(e);
      }
    };
  }

  public async checkOldPassword(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { body } = req;
      const { tokenInfo } = req.res.locals;

      const oldPasswords = await OldPassword.find({
        _user_id: tokenInfo._user_id,
      });
      if (!oldPasswords) return next();

      await Promise.all(
        oldPasswords.map(async (oldPassword) => {
          const isMatched = await passwordService.compare(
            body.password,
            oldPassword.password
          );
          if (isMatched) {
            throw new ApiError(
              "Your new password is the same as your previous password",
              409
            );
          }
        })
      );
      next();
    } catch (e) {
      next(e);
    }
  }
}

export const authMiddleware = new AuthMiddleware();
