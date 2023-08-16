import { RequestHandler } from "express";

export const getLougOut: RequestHandler = (req, res, next) => {
  // --- NOTE: Logging out mysteriously works without req.logout()
  // req.logout((err) => {
  //   if (err) return res.redirect("/auth/prot");
  // });

  res.clearCookie("chat-app-session");
  res.clearCookie("chat-app-session.sig");

  return res.status(200).json({ statusCode: 200, data: null });
};
