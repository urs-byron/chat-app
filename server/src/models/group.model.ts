import { iGroup, iGroupDoc } from "./group.imodel";
import { Schema, model, Model } from "mongoose";

const groupSchema = new Schema<iGroup>({
  grp_id: { type: String, require: true, index: true },
  grp_name: { type: String, require: true, index: true },

  chat_id: { type: String, require: true },

  security: { type: String, require: true },
  requests: { type: String, require: true },
  relations: { type: String, require: true },
});

export const Group: Model<iGroupDoc> = model<iGroupDoc>("group", groupSchema);
