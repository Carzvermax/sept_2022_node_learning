import * as jwt from "jsonwebtoken";

import { configs } from "../configs/config";
import { ETokenType } from "../enums";
import { EActionTokenType } from "../enums/action-token-type.enum";
import { ApiError } from "../errors";
import { IActionTokenPayload, ITokenPair, ITokenPayload } from "../types";

class TokenService {
  public generateTokenPair(payload: ITokenPayload): ITokenPair {
    const accessToken = jwt.sign(payload, configs.ACCESS_SECRET, {
      expiresIn: "15m",
    });
    const refreshToken = jwt.sign(payload, configs.REFRESH_SECRET, {
      expiresIn: "30d",
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  public checkToken(
    token: string,
    tokenType = ETokenType.access
  ): ITokenPayload {
    try {
      let secret = "";

      switch (tokenType) {
        case ETokenType.access:
          secret = configs.ACCESS_SECRET;
          break;
        case ETokenType.refresh:
          secret = configs.REFRESH_SECRET;
          break;
      }

      return jwt.verify(token, secret) as ITokenPayload;
    } catch (e) {
      throw new ApiError("Token not valid", 401);
    }
  }

  public generateActionToken(
    payload: IActionTokenPayload,
    tokenType: EActionTokenType
  ): string {
    let secret = "";

    switch (tokenType) {
      case EActionTokenType.activate:
        secret = configs.ACTIVATE_SECRET;
        break;
      case EActionTokenType.forgot:
        secret = configs.FORGOT_SECRET;
        break;
    }

    return jwt.sign(payload, secret, { expiresIn: "7d" });
  }

  public checkActionToken(token: string, tokenType: EActionTokenType) {
    try {
      let secret = "";

      switch (tokenType) {
        case EActionTokenType.forgot:
          secret = configs.FORGOT_SECRET;
          break;
        case EActionTokenType.activate:
          secret = configs.ACTIVATE_SECRET;
          break;
      }

      return jwt.verify(token, secret) as IActionTokenPayload;
    } catch (e) {
      throw new ApiError("Token not valid", 401);
    }
  }
}

export const tokenService = new TokenService();
