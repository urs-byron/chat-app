import mongoose, { Model, Schema, model } from "mongoose";
import { iUser, iUserDoc } from "./user.imodel";

export const chatType: {
  user: "user";
  group: "group";
} = {
  user: "user",
  group: "group",
};

const UserSchema = new Schema<iUser>({
  act_id: {
    type: {
      accnt_type: {
        type: String,
        enum: ["local", "google", "facebook", "github"],
        require: true,
      },
      accnt_id: {
        type: String,
        require: true,
        index: true,
      },
    },
    require: true,
  },
  act_name: { type: String, require: true, index: true },
  security: { type: String, require: true },
  requests: { type: String, require: true },
  relations: { type: String, require: true },
});

export const User: Model<iUserDoc> =
  mongoose.models.user || model<iUserDoc>("user", UserSchema);
