import { chatType } from "./user.model";
import { Model, Schema, model } from "mongoose";
import {
  iGenRelations,
  iGenRelationsDoc,
  iGenRequest,
  iGenRequests,
  iGenRequestsDoc,
  iGenSecurity,
  iGenSecurityDoc,
} from "./gen.imodel";

/* 
-----------------
PRIVACY
-----------------
*/

export const genRequestState: {
  pending: "pending";
  rejected: "rejected";
  approved: "approved";
  cancelled: "cancelled";
} = {
  pending: "pending",
  rejected: "rejected",
  approved: "approved",
  cancelled: "cancelled",
};

export const userSettings: {
  public: "public";
  availability: "availability";
} = {
  public: "public",
  availability: "availability",
};

const GenSecuritySchema = new Schema<iGenSecurity>({
  str_id: { type: String, require: true, index: true },
  security: {
    salt: String,
    hash: String,
  },
  privacy: {
    public: { type: Boolean, require: true },
    availability: { type: Boolean, require: true },
  },
});

export const GenSecurity: Model<iGenSecurityDoc> = model<iGenSecurityDoc>(
  "user-security",
  GenSecuritySchema
);

/* 
-----------------
REQUEST
-----------------
*/

export const requestPath: {
  invitations: "invitations";
  memberships: "memberships";
} = {
  invitations: "invitations",
  memberships: "memberships",
};

const GenRequestSchema = new Schema<iGenRequest>({
  accnt_id: { type: String, require: true, index: true },
  accnt_name: { type: String, require: true, index: true },
  isGroup: { type: Boolean, require: true },
  status: {
    type: String,
    enum: ["approved", "pending", "rejected", "cancelled"],
    require: true,
  },
});

const GenRequestsSchema = new Schema<iGenRequests>({
  str_id: { type: String, require: true, index: true },
  requests: {
    invitations: {
      incoming: [GenRequestSchema],
      outgoing: [GenRequestSchema],
    },
    memberships: {
      incoming: [GenRequestSchema],
      outgoing: [GenRequestSchema],
    },
  },
});

export const GenRequests: Model<iGenRequestsDoc> = model<iGenRequestsDoc>(
  "gen-requests",
  GenRequestsSchema
);

/* 
-----------------
RELATIONS
-----------------
*/

export const actionType: {
  block: "block";
  archive: "archive";
  mute: "mute";
} = {
  block: "block",
  archive: "archive",
  mute: "mute",
};
export const contactType: {
  contact: "contact";
  mute: "mute";
  block: "block";
} = {
  contact: "contact",
  mute: "mute",
  block: "block",
};

const GenRelationsSchema = new Schema<iGenRelations>({
  str_id: { type: String, require: true, index: true },
  relations: {
    hBump: { type: Number, require: true },
    list: [
      {
        accnt_id: { type: String, require: true, index: true },
        accnt_name: { type: String, require: true },
        admin: { type: Boolean, require: true },
        type: {
          type: String,
          enum: [chatType.user, chatType.group],
          require: true,
        },
        chat_id: { type: String, require: true },
        block: { type: Boolean, require: true },
        mute: { type: Boolean, require: true },
        archive: { type: Boolean, require: true },
        bump: { type: Number, require: true, index: true },
      },
    ],
  },
});

export const GenRelations: Model<iGenRelationsDoc> = model<iGenRelationsDoc>(
  "gen-relations",
  GenRelationsSchema
);
