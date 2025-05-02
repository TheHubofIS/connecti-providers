
import { useState, useRef, useEffect } from "react";
import { Users, Globe, Star, CheckCircle } from "lucide-react";
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
  
  useEffect(() => {
    let startTimestamp: number;
    let animationFrameId: number;
    let timeoutId: NodeJS.Timeout;
    
    if (inView) {
      // Small delay before starting the animation for a staggered effect
      timeoutId = setTimeout(() => {
        const step = (timestamp: number) => {
          if (!startTimestamp) startTimestamp = timestamp;
          const progress = Math.min((timestamp - startTimestamp) / duration, 1);
          const currentCount = progress * (end - start) + start;
          
          setCount(currentCount);
          
          if (progress < 1) {
            animationFrameId = requestAnimationFrame(step);
          } else {
            setCount(end); // Ensure we land exactly on the target number
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
  
  const formattedCount = decimals > 0 
    ? count.toFixed(decimals) 
    : Math.floor(count).toLocaleString();
  
  return (
    <div className="text-4xl md:text-5xl font-bold" ref={counterRef}>
      {prefix}{formattedCount}{suffix}
    </div>
  );
}

export default function Stats() {
  const [inView, setInView] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
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
      decimals: 0
    },
    {
      id: "providers",
      value: 2500,
      label: "Prestataires vérifiés",
      icon: CheckCircle,
      suffix: "+",
      color: "text-green-500 dark:text-green-400",
      iconBg: "bg-green-500/10 dark:bg-green-400/10",
      decimals: 0
    },
    {
      id: "countries",
      value: 45,
      label: "Pays couverts",
      icon: Globe,
      suffix: "",
      color: "text-purple-500 dark:text-purple-400",
      iconBg: "bg-purple-500/10 dark:bg-purple-400/10",
      decimals: 0
    },
    {
      id: "rating",
      value: 4.9,
      label: "Satisfaction moyenne",
      icon: Star,
      suffix: "/5",
      color: "text-amber-500 dark:text-amber-400",
      iconBg: "bg-amber-500/10 dark:bg-amber-400/10",
      decimals: 1
    },
  ];
  
  return (
    <section 
      ref={sectionRef} 
      className="py-20 bg-gradient-to-b from-primary/5 to-transparent dark:from-primary/10 dark:to-transparent"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto mb-12 text-center">
          <span className="text-sm font-medium text-primary mb-2 inline-block">Chiffres clés</span>
          <h2 className="text-3xl md:text-4xl font-bold">Notre impact en chiffres</h2>
          <p className="text-muted-foreground mt-4">Découvrez l'impact de notre réseau de professionnels français à l'international</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={stat.id}
              className={cn(
                "text-center p-6 bg-white/30 dark:bg-white/5 backdrop-blur-sm rounded-xl border border-border/40 shadow-sm transition-all duration-500 hover:shadow-md",
                inView ? 'animate-fade-in' : 'opacity-0'
              )}
              style={{ 
                animationDelay: `${index * 150}ms`,
                transform: inView ? 'translateY(0)' : 'translateY(20px)'
              }}
            >
              <div className={cn(
                "inline-flex items-center justify-center h-16 w-16 rounded-full shadow-sm mb-4 transition-transform hover:scale-105",
                stat.iconBg
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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
