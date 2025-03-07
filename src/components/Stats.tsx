
import { useState, useRef, useEffect } from "react";
import { Users, Globe, Star, CheckCircle } from "lucide-react";

interface StatCounterProps {
  start: number;
  end: number;
  duration: number;
  suffix?: string;
  prefix?: string;
  inView: boolean;
}

function StatCounter({ start, end, duration, suffix = "", prefix = "", inView }: StatCounterProps) {
  const [count, setCount] = useState(start);
  
  useEffect(() => {
    let startTimestamp: number;
    let animationFrameId: number;
    
    if (inView) {
      const step = (timestamp: number) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const currentCount = Math.floor(progress * (end - start) + start);
        
        setCount(currentCount);
        
        if (progress < 1) {
          animationFrameId = requestAnimationFrame(step);
        }
      };
      
      animationFrameId = requestAnimationFrame(step);
    }
    
    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [start, end, duration, inView]);
  
  return (
    <div className="text-4xl md:text-5xl font-bold">
      {prefix}{count.toLocaleString()}{suffix}
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
    },
    {
      id: "providers",
      value: 2500,
      label: "Prestataires vérifiés",
      icon: CheckCircle,
      suffix: "+",
      color: "text-green-500 dark:text-green-400",
    },
    {
      id: "countries",
      value: 45,
      label: "Pays couverts",
      icon: Globe,
      suffix: "",
      color: "text-purple-500 dark:text-purple-400",
    },
    {
      id: "rating",
      value: 4.9,
      label: "Satisfaction moyenne",
      icon: Star,
      suffix: "/5",
      color: "text-amber-500 dark:text-amber-400",
    },
  ];
  
  return (
    <section ref={sectionRef} className="py-20 bg-primary/5 dark:bg-primary/10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={stat.id}
              className={`text-center p-6 ${
                inView ? 'animate-fade-in' : 'opacity-0'
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-white dark:bg-secondary/50 shadow-sm mb-4">
                <stat.icon className={`h-8 w-8 ${stat.color}`} />
              </div>
              
              <StatCounter
                start={0}
                end={stat.value}
                duration={2000}
                suffix={stat.suffix}
                inView={inView}
              />
              
              <p className="text-muted-foreground mt-2">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
