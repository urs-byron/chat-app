import { APIError } from "../global/httpErrors.global.js";
import { iGenRelations, iGenRequests } from "./gen.imodel.js";

export type iGenSections = iGenRelations | iGenRequests;
export interface iGeneralProp {
  securityId: string;
  requestId: string;
  relationId: string;
}
export type iGeneral = Promise<iGeneralProp | APIError | Error>;

export interface iNewGrpBody {
  recipientId: string;
  grpName: string;
}

export interface iGroup {
  grp_id: string;
  grp_name: string;
  chat_id: string;
  security: string;
  requests: string;
  relations: string;
}

export interface iGroupDoc extends iGroup, Document {}
