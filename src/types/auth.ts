
export type Language = "fr" | "en" | "es";

export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  avatar?: string;
  lastLogin?: string;
  createdAt: string;
}
