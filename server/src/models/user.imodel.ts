import { Document } from "mongoose";

export type iUserType = "local" | "google" | "facebook" | "github";

export type iUserSearchValues = {
  pattern: string;
  type: iSearchType;
  skip: number;
  cnt: number;
};

//  0 (user) 1 (group)
export type iSearchType = 0 | 1;

export type iUserSearchObj = {
  accnt_id: string;
  act_name: string;
  availability: true | false;
};

export interface iUser {
  act_id: {
    accnt_type: iUserType;
    accnt_id: string;
  };
  act_name: string;
  security: string;
  requests: string;
  relations: string;
}

export type iUserSet = Array<{ act_id: string }>;

export interface iUserDoc extends iUser, Document {}
