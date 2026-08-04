import { Request, Response } from "express";
import { sizeGuideStore } from "../store/sizeGuideStore.js";

export class SizeGuideController {
  public static getAllSizeGuides(req: Request, res: Response): void {
    const categoryId = req.query.categoryId as string | undefined;
    const subcategoryId = req.query.subcategoryId as string | undefined;

    if (categoryId || subcategoryId) {
      const guide = sizeGuideStore.getForCategory(categoryId, subcategoryId);
      res.status(200).json({ success: true, data: guide });
      return;
    }

    const guides = sizeGuideStore.getAll();
    res.status(200).json({ success: true, count: guides.length, data: guides });
  }

  public static getSizeGuideById(req: Request, res: Response): void {
    const { id } = req.params;
    const guide = sizeGuideStore.getById(id);
    if (!guide) {
      res.status(404).json({ success: false, message: "Size Guide not found" });
      return;
    }
    res.status(200).json({ success: true, data: guide });
  }

  public static createSizeGuide(req: Request, res: Response): void {
    try {
      const newGuide = sizeGuideStore.add(req.body);
      res.status(201).json({ success: true, message: "Size guide created!", data: newGuide });
    } catch (err) {
      res.status(500).json({ success: false, message: (err as Error).message });
    }
  }

  public static updateSizeGuide(req: Request, res: Response): void {
    try {
      const { id } = req.params;
      const updated = sizeGuideStore.update(id, req.body);
      if (!updated) {
        res.status(404).json({ success: false, message: "Size guide not found to update" });
        return;
      }
      res.status(200).json({ success: true, message: "Size guide updated!", data: updated });
    } catch (err) {
      res.status(500).json({ success: false, message: (err as Error).message });
    }
  }

  public static deleteSizeGuide(req: Request, res: Response): void {
    const { id } = req.params;
    const deleted = sizeGuideStore.delete(id);
    if (!deleted) {
      res.status(404).json({ success: false, message: "Size guide not found to delete" });
      return;
    }
    res.status(200).json({ success: true, message: "Size guide deleted!" });
  }
}
