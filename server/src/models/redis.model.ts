import { RediSearchSchema, SchemaFieldTypes } from "redis";

export const userSessionSchema: RediSearchSchema = {
  "$.accnt_id": {
    type: SchemaFieldTypes.TEXT,
    AS: "accnt_id",
    SORTABLE: true,
  },
  "$.accnt_name": {
    type: SchemaFieldTypes.TEXT,
    AS: "accnt_name",
    SORTABLE: true,
  },
};
export const userSchema: RediSearchSchema = {
  "$.accnt_type": {
    type: SchemaFieldTypes.TEXT,
    AS: "accnt_type",
  },
  "$.accnt_id": {
    type: SchemaFieldTypes.TEXT,
    SORTABLE: true,
    AS: "accnt_id",
  },
  "$.act_name": {
    type: SchemaFieldTypes.TEXT,
    SORTABLE: true,
    AS: "act_name",
  },
  "$.security": {
    type: SchemaFieldTypes.TEXT,
    AS: "security",
  },
  "$.requests": {
    type: SchemaFieldTypes.TEXT,
    AS: "requests",
  },
  "$.relations": {
    type: SchemaFieldTypes.TEXT,
    AS: "relations",
  },
};
export const securitySchema: RediSearchSchema = {
  "$.str_id": {
    type: SchemaFieldTypes.TEXT,
    SORTABLE: true,
    AS: "str_id",
  },
  "$.public": {
    type: SchemaFieldTypes.NUMERIC,
    AS: "public",
  },
  "$.availability": {
    type: SchemaFieldTypes.NUMERIC,
    AS: "availability",
  },
};
export const relationsIndexSchema: RediSearchSchema = {
  "$.str_id": {
    type: SchemaFieldTypes.TEXT,
    SORTABLE: true,
    AS: "str_id",
  },
  "$.hBump": {
    type: SchemaFieldTypes.NUMERIC,
    AS: "hBump",
  },
  "$.relationSet": {
    type: SchemaFieldTypes.TEXT,
    AS: "relationSet",
  },
};
export const relationSchema: RediSearchSchema = {
  "$.accnt_id": {
    type: SchemaFieldTypes.TEXT,
    AS: "accnt_id",
  },
  "$.accnt_name": {
    type: SchemaFieldTypes.TEXT,
    AS: "accnt_name",
  },
  "$.admin": {
    type: SchemaFieldTypes.NUMERIC,
    AS: "admin",
  },
  "$.type": {
    type: SchemaFieldTypes.TEXT,
    AS: "type",
  },
  "$.chat_id": {
    type: SchemaFieldTypes.TEXT,
    AS: "chat_id",
  },
  "$.block": {
    type: SchemaFieldTypes.NUMERIC,
    AS: "block",
  },
  "$.mute": {
    type: SchemaFieldTypes.NUMERIC,
    AS: "mute",
  },
  "$.archive": {
    type: SchemaFieldTypes.NUMERIC,
    AS: "archive",
  },
  "$.bump": {
    type: SchemaFieldTypes.NUMERIC,
    SORTABLE: true,
    AS: "bump",
  },
};
export const requestsIndexSchema: RediSearchSchema = {
  "$.str_id": {
    type: SchemaFieldTypes.TEXT,
    AS: "str_id",
    SORTABLE: true,
  },
  "$.reqInSet": {
    type: SchemaFieldTypes.TEXT,
    AS: "reqInSet",
  },
  "$.reqOutSet": {
    type: SchemaFieldTypes.TEXT,
    AS: "reqOutSet",
  },
};
export const requestSchema: RediSearchSchema = {
  "$.accnt_id": {
    type: SchemaFieldTypes.TEXT,
    SORTABLE: true,
    AS: "accnt_id",
  },
  "$.accnt_name": {
    type: SchemaFieldTypes.TEXT,
    AS: "accnt_name",
  },
  "$.isGroup": {
    type: SchemaFieldTypes.NUMERIC,
    AS: "isGroup",
  },
  "$.status": {
    type: SchemaFieldTypes.TEXT,
    AS: "status",
  },
};
export const groupSchema: RediSearchSchema = {
  "$.grp_id": {
    type: SchemaFieldTypes.TEXT,
    SORTABLE: true,
    AS: "grp_id",
  },
  "$.grp_name": {
    type: SchemaFieldTypes.TEXT,
    SORTABLE: true,
    AS: "grp_name",
  },
  "$.chat_id": {
    type: SchemaFieldTypes.TEXT,
    AS: "chat_id",
  },
  "$.security": {
    type: SchemaFieldTypes.TEXT,
    AS: "security",
  },
  "$.requests": {
    type: SchemaFieldTypes.TEXT,
    AS: "requests",
  },
  "$.relations": {
    type: SchemaFieldTypes.TEXT,
    AS: "relations",
  },
};
export const chatSchema: RediSearchSchema = {
  "$.chat_id": {
    type: SchemaFieldTypes.TEXT,
    SORTABLE: true,
    AS: "chat_id",
  },
  "$.msgs_id": {
    type: SchemaFieldTypes.TEXT,
    SORTABLE: true,
    AS: "msgs_id",
  },
  "$.rules_id": {
    type: SchemaFieldTypes.TEXT,
    AS: "rules_id",
  },
};
export const chatSetSchema: RediSearchSchema = {
  "$.msg": {
    type: SchemaFieldTypes.TEXT,
    SORTABLE: true,
    AS: "msg",
  },
  "$.msgId": {
    type: SchemaFieldTypes.TEXT,
    SORTABLE: true,
    AS: "msgId",
  },
  "$.senderName": {
    type: SchemaFieldTypes.TEXT,
    AS: "senderName",
  },
  "$.senderId": {
    type: SchemaFieldTypes.TEXT,
    SORTABLE: true,
    AS: "senderId",
  },
  "$.timeReceived": {
    type: SchemaFieldTypes.NUMERIC,
    AS: "timeReceived",
  },
};
