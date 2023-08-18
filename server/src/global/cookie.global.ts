import KeyGrip from "keygrip";

export const cookie_opts: CookieSessionInterfaces.CookieSessionOptions = {
  name: process.env.AUTH_COOKIE_NAME,
  maxAge: 1000 * 60 * 60 * 24 * 2,
  keys: new KeyGrip(
    [process.env.AUTH_KEY_1!, process.env.AUTH_KEY_2!],
    "SHA384",
    "base64"
  ),
  httpOnly: false,
  secure: true,
};
