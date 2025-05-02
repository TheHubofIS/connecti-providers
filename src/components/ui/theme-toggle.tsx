
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [isMounted, setIsMounted] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setTheme("dark");
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 750);
    
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
  
  const stars = Array.from({ length: 6 }).map((_, i) => {
    const size = Math.random() * 3 + 2;
    const top = Math.random() * 40;
    const left = Math.random() * 100;
    const delay = Math.random() * 0.5;
    
    return {
      size,
      style: {
        top: `${top}%`,
        left: `${left}%`,
        animationDelay: `${delay}s`
      }
    };
  });

  const clouds = Array.from({ length: 4 }).map((_, i) => {
    const size = Math.random() * 30 + 20;
    const top = Math.random() * 60 + 15;
    const left = Math.random() * 100;
    const delay = Math.random() * 0.5;
    
    return {
      size,
      style: {
        top: `${top}%`,
        left: `${left}%`,
        width: `${size}px`,
        height: `${size / 2}px`,
        animationDelay: `${delay}s`
      }
    };
  });

  return (
    <button
      onClick={toggleTheme}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className={cn(
        "relative p-2 rounded-full text-secondary-foreground transition-all duration-500 overflow-hidden",
        "hover:shadow-md focus:outline-none focus:ring-2 focus:ring-primary/40 focus:ring-offset-2 focus:ring-offset-background",
        theme === "light" ? "bg-blue-50 dark:bg-blue-900/20" : "bg-slate-800"
      )}
      aria-label="Toggle theme"
    >
      <div 
        className={cn(
          "relative z-10 transition-transform duration-500", 
          isAnimating && (theme === "light" ? "animate-spin-slow" : "animate-reverse-spin")
        )}
      >
        {theme === "light" ? (
          <Moon 
            className={cn(
              "h-5 w-5 transition-all scale-100", 
              isHovering ? "text-indigo-600" : "text-slate-700"
            )} 
          />
        ) : (
          <Sun 
            className={cn(
              "h-5 w-5 transition-all scale-100", 
              isHovering ? "text-amber-300" : "text-amber-200"
            )} 
          />
        )}
      </div>
      
      {/* Background animation */}
      <div 
        className={cn(
          "absolute inset-0 transition-all duration-500", 
          theme === 'light' 
            ? 'bg-gradient-to-br from-blue-50 to-blue-100' 
            : 'bg-gradient-to-br from-slate-800 to-slate-900'
        )}
      />
      
      {/* Dark mode stars animations */}
      {theme === "dark" && stars.map((star, i) => (
        <div
          key={i}
          className={cn(
            "absolute rounded-full bg-white transition-opacity duration-500",
            isHovering ? "animate-twinkle opacity-100" : "opacity-0"
          )}
          style={{
            width: `${star.size}px`,
            height: `${star.size}px`,
            ...star.style,
          }}
        />
      ))}
      
      {/* Light mode clouds animations */}
      {theme === "light" && clouds.map((cloud, i) => (
        <div
          key={i}
          className={cn(
            "absolute bg-white rounded-full transition-opacity duration-500",
            isHovering ? "opacity-80" : "opacity-0"
          )}
          style={cloud.style}
        />
      ))}

      {/* Sun/moon animations */}
      {theme === 'light' ? (
        <div 
          className={cn(
            "absolute w-12 h-12 rounded-full transition-all duration-500",
            isHovering ? "bg-amber-100 scale-100" : "bg-amber-200/20 scale-0"
          )} 
          style={{
            top: '60%',
            left: '-60%',
            filter: 'blur(6px)',
          }}
        />
      ) : (
        <div 
          className={cn(
            "absolute w-12 h-12 rounded-full transition-all duration-500",
            isHovering ? "bg-indigo-500/20 scale-100" : "bg-indigo-400/10 scale-0"
          )} 
          style={{
            top: '-60%',
            left: '60%',
            filter: 'blur(8px)',
          }}
        />
      )}
      
      {/* Use regular style tag without jsx and global properties */}
      <style>
        {`
        @keyframes twinkle {
          0%, 100% { opacity: 0.7; }
          50% { opacity: 0.3; }
        }
        
        @keyframes spin-slow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @keyframes reverse-spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(-360deg); }
        }
        
        .animate-twinkle {
          animation: twinkle 3s infinite ease-in-out;
        }
        
        .animate-spin-slow {
          animation: spin-slow 1s ease-in-out;
        }
        
        .animate-reverse-spin {
          animation: reverse-spin 1s ease-in-out;
        }
        `}
      </style>
    </button>
  );
}
