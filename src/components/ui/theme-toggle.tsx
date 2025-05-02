
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setTheme("dark");
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      setTheme("light");
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  if (!isMounted) {
    return null;
  }

  return (
    <button
      onClick={toggleTheme}
      className="relative p-2 rounded-full bg-secondary/80 text-secondary-foreground hover:bg-secondary/90 transition-all duration-500 overflow-hidden"
      aria-label="Toggle theme"
    >
      <div className="relative z-10 transition-transform duration-500">
        {theme === "light" ? (
          <Moon className="h-5 w-5 transition-all scale-100" />
        ) : (
          <Sun className="h-5 w-5 transition-all scale-100" />
        )}
      </div>
      
      {/* Background animation */}
      <div 
        className={`absolute inset-0 transition-all duration-500 ${
          theme === 'light' 
            ? 'bg-secondary/80' 
            : 'bg-secondary/90'
        }`}
      />
      
      {/* Circle animations */}
      <div 
        className={`absolute w-20 h-20 rounded-full transition-all duration-500 ${
          theme === 'light' 
            ? 'bg-blue-200/30 scale-0' 
            : 'bg-amber-400/20 scale-100'
        }`} 
        style={{
          top: '-150%',
          left: '-150%',
        }}
      />
      
      <div 
        className={`absolute w-16 h-16 rounded-full transition-all duration-500 ${
          theme === 'light' 
            ? 'bg-blue-300/30 scale-0' 
            : 'bg-amber-300/30 scale-100'
        }`} 
        style={{
          top: '100%',
          right: '-80%',
        }}
      />
    </button>
  );
}
