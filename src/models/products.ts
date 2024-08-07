import { prop, getModelForClass, Ref } from "@typegoose/typegoose";
import { User } from "./user";

class Product {
  @prop({ required: true })
  public name!: string;

  @prop({ required: true })
  public price!: number;

  @prop({ type: String })
  public description!: string;

  @prop()
  public imageUrl!: string;

  @prop({ ref: User })
  public SellerId!: Ref<User>;
}

const ProductModel = getModelForClass(Product);

export { Product, ProductModel };
