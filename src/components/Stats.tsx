
import { useState, useRef, useEffect } from "react";
import { Users, Globe, Star, CheckCircle, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCounterProps {
  start: number;
  end: number;
  duration: number;
  suffix?: string;
  prefix?: string;
  inView: boolean;
  decimals?: number;
}

function StatCounter({ 
  start, 
  end, 
  duration, 
  suffix = "", 
  prefix = "", 
  inView,
  decimals = 0
}: StatCounterProps) {
  const [count, setCount] = useState(start);
  const counterRef = useRef<HTMLDivElement>(null);
  const countingRef = useRef<boolean>(false);
  
  useEffect(() => {
    let startTimestamp: number;
    let animationFrameId: number;
    let timeoutId: NodeJS.Timeout;
    
    if (inView && !countingRef.current) {
      countingRef.current = true;
      
      // Petit délai avant de commencer l'animation pour un effet décalé
      timeoutId = setTimeout(() => {
        const step = (timestamp: number) => {
          if (!startTimestamp) startTimestamp = timestamp;
          const progress = Math.min((timestamp - startTimestamp) / duration, 1);
          const easedProgress = easeOutCubic(progress); // Fonction d'easing pour une animation plus naturelle
          const currentCount = easedProgress * (end - start) + start;
          
          setCount(currentCount);
          
          if (progress < 1) {
            animationFrameId = requestAnimationFrame(step);
          } else {
            setCount(end); // Assurer qu'on arrive exactement au nombre cible
          }
        };
        
        animationFrameId = requestAnimationFrame(step);
      }, 300);
    }
    
    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [start, end, duration, inView]);
  
  // Fonction d'easing pour une animation plus fluide
  const easeOutCubic = (x: number): number => {
    return 1 - Math.pow(1 - x, 3);
  };
  
  const formattedCount = decimals > 0 
    ? count.toFixed(decimals) 
    : Math.floor(count).toLocaleString();
  
  return (
    <div className="text-4xl md:text-5xl font-bold relative" ref={counterRef}>
      <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
        {prefix}{formattedCount}{suffix}
      </span>
    </div>
  );
}

export default function Stats() {
  const [inView, setInView] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState<string | null>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      observer.disconnect();
    };
  }, []);
  
  const stats = [
    {
      id: "clients",
      value: 15000,
      label: "Clients satisfaits",
      icon: Users,
      suffix: "+",
      color: "text-blue-500 dark:text-blue-400",
      iconBg: "bg-blue-500/10 dark:bg-blue-400/10",
      decimals: 0,
      description: "Des milliers de clients nous font confiance"
    },
    {
      id: "providers",
      value: 2500,
      label: "Prestataires vérifiés",
      icon: CheckCircle,
      suffix: "+",
      color: "text-green-500 dark:text-green-400",
      iconBg: "bg-green-500/10 dark:bg-green-400/10",
      decimals: 0,
      description: "Tous nos prestataires sont soigneusement sélectionnés"
    },
    {
      id: "countries",
      value: 45,
      label: "Pays couverts",
      icon: Globe,
      suffix: "",
      color: "text-purple-500 dark:text-purple-400",
      iconBg: "bg-purple-500/10 dark:bg-purple-400/10",
      decimals: 0,
      description: "Une présence internationale en constante expansion"
    },
    {
      id: "rating",
      value: 4.9,
      label: "Satisfaction moyenne",
      icon: Star,
      suffix: "/5",
      color: "text-amber-500 dark:text-amber-400",
      iconBg: "bg-amber-500/10 dark:bg-amber-400/10",
      decimals: 1,
      description: "La qualité de service est notre priorité"
    },
    {
      id: "growth",
      value: 127,
      label: "Croissance annuelle",
      icon: TrendingUp,
      suffix: "%",
      color: "text-cyan-500 dark:text-cyan-400",
      iconBg: "bg-cyan-500/10 dark:bg-cyan-400/10",
      decimals: 0,
      description: "Une croissance exceptionnelle année après année"
    },
  ];
  
  return (
    <section 
      ref={sectionRef} 
      className="py-20 bg-gradient-to-b from-primary/5 to-transparent dark:from-primary/10 dark:to-transparent relative overflow-hidden"
    >
      {/* Particules d'arrière-plan */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full bg-primary/5 dark:bg-primary/10"
            style={{
              width: `${Math.random() * 100 + 50}px`,
              height: `${Math.random() * 100 + 50}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float ${Math.random() * 10 + 15}s infinite ease-in-out`,
              animationDelay: `${Math.random() * 5}s`,
              opacity: 0.3
            }}
          />
        ))}
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto mb-16 text-center">
          <span className="text-sm font-medium text-primary inline-block py-1 px-3 rounded-full bg-primary/10 mb-3">Chiffres clés</span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/80">Notre impact en chiffres</h2>
          <p className="text-muted-foreground mt-4 text-lg">Découvrez l'impact de notre réseau de professionnels français à l'international</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 max-w-7xl mx-auto">
          {stats.map((stat, index) => (
            <div
              key={stat.id}
              className={cn(
                "text-center p-6 bg-white/30 dark:bg-white/5 backdrop-blur-sm rounded-xl border border-border/40 shadow-sm transition-all duration-500 hover:shadow-md group",
                inView ? 'animate-fade-in' : 'opacity-0',
                isHovered === stat.id ? 'scale-105 border-primary/40 shadow-lg' : ''
              )}
              style={{ 
                animationDelay: `${index * 150}ms`,
                transform: inView ? 'translateY(0)' : 'translateY(20px)'
              }}
              onMouseEnter={() => setIsHovered(stat.id)}
              onMouseLeave={() => setIsHovered(null)}
            >
              <div className={cn(
                "inline-flex items-center justify-center h-16 w-16 rounded-full shadow-sm mb-4 transition-transform group-hover:scale-110",
                stat.iconBg,
                isHovered === stat.id ? 'animate-pulse' : ''
              )}>
                <stat.icon className={cn("h-8 w-8", stat.color)} />
              </div>
              
              <StatCounter
                start={0}
                end={stat.value}
                duration={2000}
                suffix={stat.suffix}
                inView={inView}
                decimals={stat.decimals}
              />
              
              <p className="text-muted-foreground mt-2">{stat.label}</p>
              
              <div className={cn(
                "mt-4 pt-4 border-t border-border/30 text-sm text-muted-foreground/70 transition-all duration-300",
                isHovered === stat.id ? 'opacity-100' : 'opacity-0 max-h-0 mt-0 pt-0 border-0'
              )}>
                {stat.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
