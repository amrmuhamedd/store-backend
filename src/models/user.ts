import { prop, getModelForClass } from "@typegoose/typegoose";
import { UserRolesEnum } from "../types/enums/userRoles.enum";

class User {
  @prop({ required: true })
  public name!: string;

  @prop({ required: true, unique: true })
  public email!: string;

  @prop({ required: true })
  public password!: string;

  @prop({
    required: true,
    enum: UserRolesEnum,
    default: UserRolesEnum.CUSTOMER,
  })
  public role!: UserRolesEnum;
}

const UserModel = getModelForClass(User);

export { User, UserModel };
