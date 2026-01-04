import { useEffect, useRef, useState } from "react";

const stats = [
  {
    value: 50,
    suffix: "+",
    label: "Countries",
    description: "Global presence across 6 continents",
  },
  {
    value: 10,
    suffix: "K+",
    label: "Developers",
    description: "Active developer ecosystem",
  },
  {
    value: 300,
    suffix: "%",
    label: "ROI",
    description: "Average efficiency improvement",
  },
  {
    value: 100,
    suffix: "M+",
    label: "Transactions",
    description: "Processed monthly",
  },
];

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const duration = 2000;
          const steps = 60;
          const increment = value / steps;
          let current = 0;

          const timer = setInterval(() => {
            current += increment;
            if (current >= value) {
              setCount(value);
              clearInterval(timer);
            } else {
              setCount(Math.floor(current));
            }
          }, duration / steps);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [value]);

  return (
    <div ref={ref} className="font-display text-4xl font-bold md:text-5xl lg:text-6xl">
      <span className="gradient-text">{count}</span>
      <span className="text-accent">{suffix}</span>
    </div>
  );
}

export function StatsSection() {
  return (
    <section className="relative border-y border-border bg-card/50 py-20">
      {/* Background accent */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5" />

      <div className="container relative">
        <div className="mb-12 text-center">
          <h2 className="font-display text-3xl font-bold md:text-4xl">
            Proven at <span className="gradient-text">Scale</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            Trusted by Fortune 500 companies and government agencies worldwide
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="group relative rounded-2xl border border-border bg-card/50 p-6 text-center backdrop-blur-sm transition-all duration-300 hover:border-primary/50 hover:bg-card"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Glow effect on hover */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 opacity-0 transition-opacity group-hover:opacity-100" />

              <div className="relative">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                <h3 className="mt-2 font-display text-lg font-semibold text-foreground">
                  {stat.label}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {stat.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
