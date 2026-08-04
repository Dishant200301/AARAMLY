import { Request, Response } from "express";
import { getDashboardAnalyticsStore } from "../store/analyticsStore.js";

export const getDashboardAnalytics = (_req: Request, res: Response) => {
  const stats = getDashboardAnalyticsStore();
  res.json({ success: true, data: stats });
};
