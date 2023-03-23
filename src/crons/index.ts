import { removeOldPasswords } from "./remove.old.password.cron";
import { removeOldTokens } from "./remove.old.tokens.cron";

export const cronRunner = () => {
  removeOldTokens.start();
  removeOldPasswords.start();
};
