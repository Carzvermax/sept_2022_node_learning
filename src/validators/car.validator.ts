import * as Joi from "joi";

export class CarValidator {
  private static brand = Joi.string().min(2).max(15).trim().lowercase();
  private static model = Joi.string().min(2).max(15).trim().lowercase();
  private static year = Joi.number().min(1970).max(new Date().getFullYear());
  static createCar = Joi.object({
    brand: this.brand.required(),
    model: this.model.required(),
    year: this.year.required(),
  });

  static updateCar = Joi.object({
    brand: this.brand,
    model: this.model,
    year: this.year,
  });
}
