import { config } from "dotenv";

config();

export const configs = {
  PORT: process.env.PORT || 5300,
  DB_URL: process.env.DB_URL || "jfsdlkfjdsaklfdas",

  ACCESS_SECRET: process.env.JWT_ACCESS_SECRET || "aaa",
  REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || "bbb",

  NO_REPLY_EMAIL: process.env.NO_REPLY_EMAIL,
  NO_REPLY_EMAIL_PASSWORD: process.env.NO_REPLY_EMAIL_PASSWORD,

  TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID,
  TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN,
  TWILIO_SERVICE_SID: process.env.TWILIO_SERVICE_SID,
};
