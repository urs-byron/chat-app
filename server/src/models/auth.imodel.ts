import { Session } from "express-session";

export interface PassportSession extends Session {
  passport: {
    user: string;
  };
}
