export type iStrBool = `${true}` | `${false}`;
export type iReqType = 1 | 2 | 3;
export type iChatType = "user" | "group";

export interface iRequestBody {
  type: iReqType;
  recipientId: string | null;
  groupId: string | null;
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

export type iContactTypes = "contact" | "mute" | "block";

export interface iRelBody {
  contactType: iContactTypes;
  chatType: iChatType;
  groupId: string | null;
  skip: number;
}
