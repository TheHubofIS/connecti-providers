
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  Images, 
  FileText, 
  Settings, 
  Globe,
  Users,
  Menu as MenuIcon,
  Layout,
  X,
  ChevronRight,
  ChevronDown
} from "lucide-react";

interface SidebarItemProps {
  icon: React.ElementType;
  title: string;
  href: string;
  isActive: boolean;
  children?: React.ReactNode;
  isOpen?: boolean;
  toggleOpen?: () => void;
}

const SidebarItem = ({ 
  icon: Icon, 
  title, 
  href, 
  isActive,
  children,
  isOpen,
  toggleOpen
}: SidebarItemProps) => {
  const hasChildren = Boolean(children);
  
  const sidebarItemContent = (
    <>
      <Icon className={cn("h-5 w-5 mr-3 transition-colors", 
        isActive ? "text-primary" : "text-muted-foreground group-hover:text-primary")} />
      <span>{title}</span>
      {hasChildren && (
        <button onClick={e => { e.preventDefault(); toggleOpen && toggleOpen(); }} className="ml-auto">
          {isOpen ? (
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          ) : (
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          )}
        </button>
      )}
    </>
  );
  
  return (
    <div className={cn("space-y-1", hasChildren && isOpen ? "mb-3" : "")}>
      {hasChildren ? (
        <button 
          onClick={toggleOpen}
          className={cn(
            "w-full flex items-center px-3 py-2 rounded-lg transition-colors group",
            isActive ? "bg-primary/10 text-primary" : "hover:bg-muted text-foreground"
          )}
        >
          {sidebarItemContent}
        </button>
      ) : (
        <Link
          to={href}
          className={cn(
            "flex items-center px-3 py-2 rounded-lg transition-colors group",
            isActive ? "bg-primary/10 text-primary" : "hover:bg-muted text-foreground"
          )}
        >
          {sidebarItemContent}
        </Link>
      )}
      
      {hasChildren && isOpen && (
        <div className="pl-4 border-l border-border ml-4 space-y-1 mt-1">
          {children}
        </div>
      )}
    </div>
  );
};

const AdminSidebar = () => {
  const location = useLocation();
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({
    content: false,
    settings: false,
  });
  
  const toggleMenu = (menu: string) => {
    setOpenMenus(prev => ({
      ...prev,
      [menu]: !prev[menu]
    }));
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const isParentActive = (parentPath: string) => {
    return location.pathname.startsWith(parentPath);
  };

  return (
    <aside
      id="admin-sidebar"
      className="fixed inset-y-0 left-0 z-30 w-64 transform -translate-x-full lg:translate-x-0 transition-transform duration-300 ease-in-out bg-background border-r border-border"
    >
      <div className="flex flex-col h-full">
        <div className="p-4 border-b border-border lg:hidden">
          <button 
            className="p-2 rounded-full hover:bg-muted"
            onClick={() => document.getElementById('admin-sidebar')?.classList.toggle('-translate-x-full')}
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <div className="flex-1 py-6 px-4 space-y-6 overflow-y-auto">
          <SidebarItem 
            icon={LayoutDashboard} 
            title="Tableau de bord" 
            href="/admin/dashboard" 
            isActive={isActive("/admin/dashboard")}
          />
          
          <div className="space-y-1">
            <SidebarItem 
              icon={FileText} 
              title="Gestion du contenu" 
              href="#" 
              isActive={isParentActive("/admin/content")}
              isOpen={openMenus.content}
              toggleOpen={() => toggleMenu("content")}
            >
              <SidebarItem 
                icon={FileText} 
                title="Pages" 
                href="/admin/content/pages" 
                isActive={isActive("/admin/content/pages")}
              />
              <SidebarItem 
                icon={Layout} 
                title="Mise en page" 
                href="/admin/content/layouts" 
                isActive={isActive("/admin/content/layouts")}
              />
              <SidebarItem 
                icon={MenuIcon} 
                title="Menus" 
                href="/admin/content/menus" 
                isActive={isActive("/admin/content/menus")}
              />
            </SidebarItem>
          </div>
          
          <SidebarItem 
            icon={Images} 
            title="Bibliothèque médias" 
            href="/admin/media" 
            isActive={isActive("/admin/media")}
          />
          
          <SidebarItem 
            icon={Globe} 
            title="Traductions" 
            href="/admin/translations" 
            isActive={isActive("/admin/translations")}
          />
          
          <SidebarItem 
            icon={Users} 
            title="Prestataires" 
            href="/admin/providers" 
            isActive={isActive("/admin/providers")}
          />
          
          <SidebarItem 
            icon={Users} 
            title="Utilisateurs" 
            href="/admin/users" 
            isActive={isActive("/admin/users")}
          />
          
          <div className="space-y-1">
            <SidebarItem 
              icon={Settings} 
              title="Paramètres" 
              href="#" 
              isActive={isParentActive("/admin/settings")}
              isOpen={openMenus.settings}
              toggleOpen={() => toggleMenu("settings")}
            >
              <SidebarItem 
                icon={Globe} 
                title="Langues" 
                href="/admin/settings/languages" 
                isActive={isActive("/admin/settings/languages")}
              />
              <SidebarItem 
                icon={Users} 
                title="Rôles & Permissions" 
                href="/admin/settings/roles" 
                isActive={isActive("/admin/settings/roles")}
              />
              <SidebarItem 
                icon={Settings} 
                title="Général" 
                href="/admin/settings/general" 
                isActive={isActive("/admin/settings/general")}
              />
            </SidebarItem>
          </div>
        </div>
        
        <div className="p-4 border-t border-border">
          <div className="p-3 rounded-lg bg-muted/50">
            <p className="text-sm">Besoin d'aide?</p>
            <Link to="/admin/support" className="text-xs text-primary hover:underline">
              Consulter la documentation
            </Link>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default AdminSidebar;
