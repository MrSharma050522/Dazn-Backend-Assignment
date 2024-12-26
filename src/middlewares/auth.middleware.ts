import { Request, Response, NextFunction } from "express";

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  const { role } = req.body; // Assume role is sent in the request
  if (role === "admin") next();
  else res.status(403).json({ message: "Access Denied" });
};