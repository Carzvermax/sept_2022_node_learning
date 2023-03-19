import { Twilio } from "twilio";

import { configs } from "../configs/config";
import { smsTemplates } from "../constants";
import { ESmsActionEnum } from "../enums";

class SmsService {
  constructor(
    private client = new Twilio(
      configs.TWILIO_ACCOUNT_SID,
      configs.TWILIO_AUTH_TOKEN
    )
  ) {}

  public async sendSms(phone: string, smsAction: ESmsActionEnum) {
    try {
      const message = smsTemplates[smsAction];

      await this.client.messages.create({
        body: message,
        to: phone,
        messagingServiceSid: configs.TWILIO_SERVICE_SID,
      });
    } catch (e) {
      console.error(e.message);
    }
  }
}

export const smsService = new SmsService();
