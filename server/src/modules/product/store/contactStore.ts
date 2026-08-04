import { ContactMessage } from "../../../types/admin.js";

let contactMessages: ContactMessage[] = [
  {
    id: "cm-1",
    name: "Priya Sharma",
    email: "priya.s@example.com",
    phone: "+91 98765 43210",
    subject: "Size Guide Assistance Required",
    message: "Hi AARAMLY team, I am confused between 32B and 34B for the Seamless Padded Bralette. Could you advise?",
    status: "New",
    date: "2026-08-01",
    createdAt: "2026-08-01T09:30:00Z"
  },
  {
    id: "cm-2",
    name: "Ananya Roy",
    email: "ananya.r@example.com",
    phone: "+91 98111 22334",
    subject: "Bulk Order Inquiry for Bridal Trousseau",
    message: "Hello! Looking to order 15 sets from your Bridal Silk & Lace collection. Do you offer corporate/bridal discounts?",
    status: "Read",
    date: "2026-07-31",
    createdAt: "2026-07-31T14:15:00Z"
  },
  {
    id: "cm-3",
    name: "Rohan Kapoor",
    email: "rohan.k@example.com",
    phone: "+91 97777 88899",
    subject: "Gift Card Query",
    message: "Can I buy a physical gift voucher for my spouse?",
    status: "Replied",
    replyText: "Hi Rohan! We offer e-gift cards sent instantly via Email/WhatsApp.",
    date: "2026-07-30",
    createdAt: "2026-07-30T11:00:00Z"
  }
];

export const getContactMessagesStore = (filterStatus?: string, search?: string): ContactMessage[] => {
  let list = [...contactMessages];
  if (filterStatus && filterStatus.toUpperCase() !== 'ALL') {
    list = list.filter((m) => m.status.toLowerCase() === filterStatus.toLowerCase());
  }
  if (search && search.trim() !== '') {
    const q = search.toLowerCase();
    list = list.filter((m) =>
      m.name.toLowerCase().includes(q) ||
      m.email.toLowerCase().includes(q) ||
      m.subject.toLowerCase().includes(q) ||
      m.message.toLowerCase().includes(q)
    );
  }
  return list;
};

export const createContactMessageStore = (data: Partial<ContactMessage>): ContactMessage => {
  const newMsg: ContactMessage = {
    id: `cm-${Date.now()}`,
    name: data.name || "Customer",
    email: data.email || "customer@example.com",
    phone: data.phone || "",
    subject: data.subject || "General Inquiry",
    message: data.message || "",
    status: "New",
    date: new Date().toISOString().split("T")[0],
    createdAt: new Date().toISOString()
  };
  contactMessages.unshift(newMsg);
  return newMsg;
};

export const updateContactMessageStatusStore = (id: string, status: "New" | "Read" | "Replied" | "Archived", replyText?: string): ContactMessage | null => {
  const msg = contactMessages.find((m) => m.id === id);
  if (!msg) return null;
  msg.status = status;
  if (replyText) {
    msg.replyText = replyText;
  }
  return msg;
};

export const deleteContactMessageStore = (id: string): boolean => {
  const len = contactMessages.length;
  contactMessages = contactMessages.filter((m) => m.id !== id);
  return contactMessages.length < len;
};
