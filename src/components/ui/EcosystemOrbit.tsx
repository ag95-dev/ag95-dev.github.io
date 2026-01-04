import { cn } from "@/lib/utils";
import logoDiginexai from "@/assets/logo-diginexai.jpeg";
import logoOnestudio from "@/assets/logo-onestudio.jpeg";
import logoShield from "@/assets/logo-shield.jpeg";
import logoAssist from "@/assets/logo-assist.jpeg";
import logoFlow from "@/assets/logo-flow.jpeg";
import logoEthera from "@/assets/logo-ethera.jpeg";
import logoSynapse from "@/assets/logo-synapse.jpeg";

const platforms = [
  { name: "OneStudio", logo: logoOnestudio, angle: 0 },
  { name: "Shield", logo: logoShield, angle: 60 },
  { name: "Assist", logo: logoAssist, angle: 120 },
  { name: "Flow", logo: logoFlow, angle: 180 },
  { name: "Ethera", logo: logoEthera, angle: 240 },
  { name: "Synapse", logo: logoSynapse, angle: 300 },
];

export function EcosystemOrbit() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[400px]">
      {/* Outer orbit ring */}
      <div className="absolute inset-0 rounded-full border border-border/50" />
      <div className="absolute inset-4 rounded-full border border-border/30" />
      <div className="absolute inset-8 rounded-full border border-border/20" />

      {/* Rotating container for planets */}
      <div className="absolute inset-0 animate-orbit" style={{ animationDuration: "40s" }}>
        {platforms.map((platform) => {
          const radius = 45; // percentage from center
          const angleRad = (platform.angle * Math.PI) / 180;
          const x = 50 + radius * Math.cos(angleRad);
          const y = 50 + radius * Math.sin(angleRad);

          return (
            <div
              key={platform.name}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{
                left: `${x}%`,
                top: `${y}%`,
              }}
            >
              {/* Counter-rotate to keep text upright */}
              <div 
                className="animate-orbit group cursor-pointer"
                style={{ animationDirection: "reverse", animationDuration: "40s" }}
              >
                <div
                  className={cn(
                    "flex h-14 w-14 items-center justify-center rounded-full transition-all duration-300 overflow-hidden",
                    "hover:scale-125 hover:shadow-lg border-2 border-primary/30"
                  )}
                  style={{
                    boxShadow: `0 0 20px hsl(var(--primary) / 0.4)`,
                  }}
                >
                  <img 
                    src={platform.logo} 
                    alt={`DigiNex${platform.name}`}
                    className="h-full w-full object-cover"
                  />
                </div>
                
                {/* Tooltip */}
                <div className="absolute left-1/2 top-full mt-2 -translate-x-1/2 opacity-0 transition-opacity group-hover:opacity-100">
                  <div className="whitespace-nowrap rounded-lg bg-popover px-3 py-1.5 text-xs font-medium shadow-lg">
                    DigiNex{platform.name}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Center hub with DigiNexAI logo */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="relative">
          <div className="absolute inset-0 animate-pulse-glow rounded-full bg-gradient-to-br from-primary to-accent blur-xl" />
          <div className="relative flex h-24 w-24 items-center justify-center rounded-full overflow-hidden shadow-2xl border-2 border-primary/30">
            <img 
              src={logoDiginexai} 
              alt="DigiNexAI"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Connecting lines (decorative) */}
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        {platforms.map((platform) => {
          const angleRad = (platform.angle * Math.PI) / 180;
          const x = 50 + 45 * Math.cos(angleRad);
          const y = 50 + 45 * Math.sin(angleRad);

          return (
            <line
              key={`line-${platform.name}`}
              x1="50"
              y1="50"
              x2={x}
              y2={y}
              stroke="url(#gradient-line)"
              strokeWidth="0.2"
              strokeDasharray="2,2"
              opacity="0.3"
            />
          );
        })}
        <defs>
          <linearGradient id="gradient-line" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(var(--primary))" />
            <stop offset="100%" stopColor="hsl(var(--accent))" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
