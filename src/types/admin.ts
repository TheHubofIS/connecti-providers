
export type AdminRole = "admin" | "editor" | "reader";

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: AdminRole;
  avatar?: string;
  lastLogin?: string;
  createdAt: string;
}

export interface ContentItem {
  id: string;
  title: string;
  type: "text" | "html" | "image" | "link" | "video";
  content: string;
  language: string;
  pageId: string;
  position?: string;
  lastModified: string;
  modifiedBy: string;
}

export interface PageLayout {
  id: string;
  name: string;
  slug: string;
  sections: SectionLayout[];
  isPublished: boolean;
  lastModified: string;
  modifiedBy: string;
}

export interface SectionLayout {
  id: string;
  name: string;
  position: number;
  columns: number;
  contentIds: string[];
}

export interface SiteImage {
  id: string;
  fileName: string;
  url: string;
  thumbnailUrl: string;
  size: number;
  dimensions: {
    width: number;
    height: number;
  };
  alt: string;
  tags: string[];
  uploadedAt: string;
  uploadedBy: string;
}

export interface SiteMenu {
  id: string;
  name: string;
  items: MenuItem[];
  location: "header" | "footer" | "sidebar";
  language: string;
}

export interface MenuItem {
  id: string;
  label: string;
  url: string;
  icon?: string;
  parentId?: string;
  position: number;
  isExternal: boolean;
  requiresAuth?: boolean;
  roles?: AdminRole[];
}

export interface LanguageSetting {
  code: string;
  name: string;
  flag: string;
  isDefault: boolean;
  isEnabled: boolean;
}
