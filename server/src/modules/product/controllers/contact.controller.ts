import { Request, Response } from "express";
import {
  getContactMessagesStore,
  createContactMessageStore,
  updateContactMessageStatusStore,
  deleteContactMessageStore
} from "../store/contactStore.js";

export const getContactMessages = (req: Request, res: Response) => {
  const { status, search } = req.query;
  const messages = getContactMessagesStore(status as string, search as string);
  res.json({ success: true, data: messages });
};

export const createContactMessage = (req: Request, res: Response) => {
  const msg = createContactMessageStore(req.body);
  res.status(201).json({ success: true, data: msg });
};

export const updateContactMessageStatus = (req: Request, res: Response) => {
  const { id } = req.params;
  const { status, replyText } = req.body;
  const updated = updateContactMessageStatusStore(id, status, replyText);
  if (!updated) {
    return res.status(404).json({ success: false, message: "Contact message not found" });
  }
  res.json({ success: true, data: updated });
};

export const deleteContactMessage = (req: Request, res: Response) => {
  const { id } = req.params;
  const deleted = deleteContactMessageStore(id);
  res.json({ success: deleted, message: deleted ? "Message deleted" : "Message not found" });
};
