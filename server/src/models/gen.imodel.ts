/* 
-----------------
PRIVACY
-----------------
*/

import { iChatType } from "./chat.imodel";

export type iGenPrivacyProp = "public" | "availability";
export type iGenPrivacyValue = "true" | "false";

export interface iGenSecuritySH {
  salt: string;
  hash: string;
}

export interface iGenSecurityPrivacy {
  public: boolean;
  availability: boolean;
}

export interface iGenSecurity {
  str_id: string;
  security?: iGenSecuritySH;
  privacy: iGenSecurityPrivacy;
}

export interface iPrivacyRequest {
  property: iGenPrivacyProp;
  value: iGenPrivacyValue;
}

export interface iGenSecurityDoc extends iGenSecurity, Document {}

/* 
-----------------
REQUEST
-----------------
*/

export type iGenRequestPath = "invitations" | "memberships";
export type iPatchGenRequestType = "user" | "group";
export type iGenRequestState =
  | "approved"
  | "pending"
  | "rejected"
  | "cancelled";

export interface iNewGenRequests {
  newInReq: iGenRequest;
  newOutReq: iGenRequest;
}

export interface iGenRequestBody {
  type: 1 | 2 | 3;
  recipientId: string;
  groupId: string;
}

// type: 2 - user - grp
// type: 1 - user - recipient
// type: 3 - grp  - recipient

// patch request types
// *                            **                           ***
// usr-usr (1)                  usr-grp (2)                  grp-usr (3) *
// type: 1                      type: 2                      type: 3
// recipient: "string"          recipient: null              recipient: "string"
// group: null                  group: "string"              group: "string"

// * userID as sender
// ** userID as sender
// *** userID as admin

export type iGenRequest = {
  accnt_id: string;
  accnt_name: string;
  isGroup: Boolean;
  status: iGenRequestState;
};
export type iGenRequestSet = Array<iGenRequest>;

export interface iGenRequests {
  str_id: string;
  requests: {
    invitations: {
      incoming: iGenRequestSet;
      outgoing: iGenRequestSet;
    };
    memberships: {
      incoming: iGenRequestSet;
      outgoing: iGenRequestSet;
    };
  };
}

export interface iGenRequestsDoc extends iGenRequests, Document {}

export type iGetGenReqs = { incoming: any[]; outgoing: any[] }[];

/* 
-----------------
REQUEST
-----------------
*/

export interface iGenRelBody {
  contactType: iContactTypes;
  chatType: iChatType;
  groupId: string | null;
  skip: number;
}

export interface iGenRelations {
  str_id: string;
  relations: {
    hBump: number;
    list: Array<iRelation>;
  };
}

export type iGenRequestActions = "approve" | "reject" | "cancel";

export type iContactTypes = "contact" | "mute" | "block";

export interface iRelation {
  accnt_id: string;
  accnt_name: string;
  type: string;
  chat_id: string;
  admin: boolean;
  block: boolean;
  mute: boolean;
  archive: boolean;
  bump: number;
}

export interface iRelationAct {
  recipientId: string;
  userAction: "archive" | "block" | "mute";
  actionValue: boolean;
}

export type iGetGenRels = { blocks: any[]; mutes: any[] }[];

export interface iGenRelationsDoc extends iGenRelations, Document {}
