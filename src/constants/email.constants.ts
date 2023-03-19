import { EEmailActions } from "../enums";

export const allTemplates = {
  [EEmailActions.WELCOME]: {
    subject: "Great to see you in our app!",
    templateName: "register",
  },
  [EEmailActions.FORGOT_PASSWORD]: {
    subject:
      "We control your password, just follow all steps and everything will be good",
    templateName: "forgotPassword",
  },
};
