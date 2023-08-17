import KeyGrip from "keygrip";
import { randomBytes } from "node:crypto";

export const cookie_opts: CookieSessionInterfaces.CookieSessionOptions = {
  name: process.env.COOKIE_NAME,
  maxAge: 1000 * 60 * 60 * 24 * 2,
  keys: new KeyGrip(
    [randomBytes(32).toString(), randomBytes(32).toString()],
    "SHA384",
    "base64"
  ),
  httpOnly: false,
  secure: true,
};
