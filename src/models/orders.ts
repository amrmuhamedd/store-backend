import { prop, getModelForClass, Ref } from "@typegoose/typegoose";
import { User } from "./user";
import { Product } from "./products";
import { OrderStatusEnum } from "../types/enums/orderStatus.enum";

class Order {
  @prop({ required: true })
  public price!: number;

  @prop({ type: String })
  public description!: string;

  @prop({
    enum: OrderStatusEnum,
    default: OrderStatusEnum.CREATED,
  })
  public status!: OrderStatusEnum;

  @prop({ ref: Product })
  public products!: Ref<Product[]>;

  @prop({ ref: User })
  public user!: Ref<User[]>;
}

const OrderModel = getModelForClass(Order);

export { Order, OrderModel };
