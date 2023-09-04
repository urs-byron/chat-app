import { Session } from "express-session";

export interface PassportSession extends Session {
  passport: {
    user: string;
  };
}

export interface iStratOpt {
  callbackURL: string;
  clientID: string;
  clientSecret: string;
}
