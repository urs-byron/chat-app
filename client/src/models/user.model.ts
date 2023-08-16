export type iUserType = "local" | "google" | "facebook" | "github";

export interface iUserObj {
  act_id: {
    accnt_type: iUserType;
    accnt_id: string;
  };
  act_name: string;
  security: string;
  requests: string;
  relations: string;
}

export const requestActions: {
  approve: "approve";
  reject: "reject";
  cancel: "cancel";
} = {
  approve: "approve",
  reject: "reject",
  cancel: "cancel",
};

export const userSettings: {
  public: "public";
  availability: "availability";
} = {
  public: "public",
  availability: "availability",
};

export type iUserRequestState =
  | "approved"
  | "pending"
  | "rejected"
  | "cancelled";

export const iRequestType: { out: "outgoing"; in: "incoming" } = {
  out: "outgoing",
  in: "incoming",
};
export type iUserPrivacyProp = "public" | "availability";
export type iUserPrivacyValue = "true" | "false";

export type iRequestActions = "approve" | "reject" | "cancel";

export interface iRequestApproveData {
  newStatus: iUserRequestState;
  relItem: iRelation;
}

export type iContactTypes = "contact" | "mute" | "block";
export interface iRelation {
  accnt_id: string;
  accnt_name: string;
  type: "user" | "group";
  chat_id: string;
  admin: boolean;
  block: boolean;
  mute: boolean;
  archive: boolean;
  bump: number;
}
export interface iPrivacyRequest {
  property: iUserPrivacyProp;
  value: iUserPrivacyValue;
}
export interface iRequest {
  accnt_id: string;
  accnt_name: string;
  isGroup: Boolean;
  status: "approved" | "pending" | "rejected" | "cancelled";
}

export interface iUser {
  accnt_id: string;
  accnt_name: string;
  privacy: iUserPrivacy;
  requests: {
    incoming: Array<iRequest>;
    outgoing: Array<iRequest>;
  };
  relations: {
    mutes: Array<iRelation>;
    blocks: Array<iRelation>;
  };
}

export interface iUserPatchRequest {
  recipientId: string;
  status: iRequestActions;
}

export interface iUserPrivacy {
  public: boolean;
  availability: boolean;
}

export interface iUserPassword {
  password: string;
  rePassword: string;
}
