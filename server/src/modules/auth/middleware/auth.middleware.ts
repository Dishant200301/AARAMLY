import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { config } from "../../../config/index.js";

export function authenticateAdmin(req: Request, res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({
      success: false,
      message: "Access token missing or invalid."
    });
    return;
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, config.jwt.accessSecret);
    (req as any).user = decoded;
    next();
  } catch (err) {
    res.status(401).json({
      success: false,
      message: "Invalid or expired authorization token."
    });
  }
}
