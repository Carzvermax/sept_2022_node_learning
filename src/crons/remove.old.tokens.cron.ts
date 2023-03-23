import { CronJob } from "cron";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import { Token } from "../models";

dayjs.extend(utc);

const tokensRemover = async (): Promise<void> => {
  const previousMonth = dayjs().utc().subtract(1, "month");

  await Token.deleteMany({ createdAt: { $lte: previousMonth } });
};

export const removeOldTokens = new CronJob("0 0 * * * ", tokensRemover);
