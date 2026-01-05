import { useState } from "react";
import { cn } from "@/lib/utils";
import { SubBrandModal } from "./SubBrandModal";
import logoDiginexai from "@/assets/logo-diginexai.jpeg";
import logoOnestudio from "@/assets/logo-onestudio.jpeg";
import logoShield from "@/assets/logo-shield.jpeg";
import logoAssist from "@/assets/logo-assist.jpeg";
import logoFlow from "@/assets/logo-flow.jpeg";
import logoEthera from "@/assets/logo-ethera.jpeg";
import logoSynapse from "@/assets/logo-synapse.jpeg";

const platforms = [
  { 
    name: "OneStudio", 
    fullName: "DigiNexOneStudio",
    logo: logoOnestudio, 
    angle: 0,
    tagline: "The Creator's Platform",
    description: "Build and launch AI-powered applications 10x faster with our revolutionary low-code platform. OneStudio combines visual development tools with powerful AI capabilities to transform how creators build digital products.",
    features: [
      "Visual drag-and-drop app builder",
      "Pre-built AI components and templates",
      "One-click deployment to cloud",
      "Real-time collaboration tools"
    ],
    stats: "1M+ Apps Built",
    color: "from-violet-600 to-violet-400"
  },
  { 
    name: "Shield", 
    fullName: "DigiNexShield",
    logo: logoShield, 
    angle: 60,
    tagline: "The Security Fortress",
    description: "Enterprise-grade AI security with zero-breach track record. DigiNexShield provides comprehensive protection against cyber threats using advanced machine learning and behavioral analysis.",
    features: [
      "Real-time threat detection",
      "Zero-day vulnerability protection",
      "AI-powered anomaly detection",
      "Compliance automation"
    ],
    stats: "99.97% Prevention Rate",
    color: "from-emerald-600 to-emerald-400"
  },
  { 
    name: "Assist", 
    fullName: "DigiNexAssist",
    logo: logoAssist, 
    angle: 120,
    tagline: "The Compliance Engine",
    description: "Streamline immigration and compliance processes with AI-powered document analysis and case management. DigiNexAssist has revolutionized how organizations handle complex regulatory requirements.",
    features: [
      "Intelligent document processing",
      "Automated compliance checking",
      "Multi-language support",
      "Case tracking dashboard"
    ],
    stats: "500K+ Cases Processed",
    color: "from-blue-600 to-blue-400"
  },
  { 
    name: "Flow", 
    fullName: "DigiNexFlow",
    logo: logoFlow, 
    angle: 180,
    tagline: "The Automation Backbone",
    description: "Enterprise workflow automation that scales. DigiNexFlow connects your systems, automates repetitive tasks, and orchestrates complex business processes with unprecedented reliability.",
    features: [
      "Visual workflow designer",
      "500+ pre-built integrations",
      "Intelligent task routing",
      "Real-time analytics"
    ],
    stats: "10M+ Workflows Automated",
    color: "from-orange-600 to-orange-400"
  },
  { 
    name: "Ethera", 
    fullName: "DigiNexEthera",
    logo: logoEthera, 
    angle: 240,
    tagline: "The Intelligence Network",
    description: "Multi-agent AI collaboration for complex decision-making. Ethera coordinates thousands of AI agents to solve problems that require diverse expertise and perspectives.",
    features: [
      "Multi-agent orchestration",
      "Collective intelligence",
      "Adaptive learning systems",
      "Decision audit trails"
    ],
    stats: "1,000+ AI Agents",
    color: "from-pink-600 to-pink-400"
  },
  { 
    name: "Synapse", 
    fullName: "DigiNexSynapse",
    logo: logoSynapse, 
    angle: 300,
    tagline: "The Intelligent Environment",
    description: "Transform physical spaces with ambient AI intelligence. Synapse creates responsive environments that learn, adapt, and optimize for human comfort and energy efficiency.",
    features: [
      "Ambient intelligence",
      "Energy optimization",
      "Occupancy analytics",
      "Smart building integration"
    ],
    stats: "50K+ Smart Spaces",
    color: "from-cyan-600 to-cyan-400"
  },
];

export function EcosystemOrbit() {
  const [selectedBrand, setSelectedBrand] = useState<typeof platforms[0] | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleBrandClick = (platform: typeof platforms[0]) => {
    setSelectedBrand(platform);
    setModalOpen(true);
  };

  return (
    <>
      <div className="relative mx-auto aspect-square w-full max-w-[650px]">
        {/* Outer orbit rings with fusion colors */}
        <div className="absolute inset-0 rounded-full border-2 border-primary/40" />
        <div className="absolute inset-4 rounded-full border border-accent/30" />
        <div className="absolute inset-8 rounded-full border border-primary/20" />
        <div className="absolute inset-16 rounded-full border border-accent/10" />

        {/* Rotating container for planets */}
        <div className="absolute inset-0 animate-orbit" style={{ animationDuration: "45s" }}>
          {platforms.map((platform) => {
            const radius = 42; // percentage from center
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
                {/* Counter-rotate to keep logos upright */}
                <div 
                  className="animate-orbit group cursor-pointer"
                  style={{ animationDirection: "reverse", animationDuration: "45s" }}
                  onClick={() => handleBrandClick(platform)}
                >
                  <div
                    className={cn(
                      "flex h-24 w-24 sm:h-28 sm:w-28 items-center justify-center rounded-full transition-all duration-300 overflow-hidden",
                      "hover:scale-125 hover:shadow-2xl border-2 border-primary/50 bg-background/80 backdrop-blur-sm"
                    )}
                    style={{
                      boxShadow: `0 0 30px hsl(185 100% 50% / 0.4), 0 0 60px hsl(270 80% 60% / 0.2)`,
                    }}
                  >
                    <img 
                      src={platform.logo} 
                      alt={platform.fullName}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  
                  {/* Tooltip */}
                  <div className="absolute left-1/2 top-full mt-3 -translate-x-1/2 opacity-0 transition-opacity group-hover:opacity-100 z-10">
                    <div className="whitespace-nowrap rounded-lg bg-popover/95 backdrop-blur-sm px-4 py-2 text-sm font-semibold shadow-xl border border-primary/30">
                      <span className="gradient-text">{platform.fullName}</span>
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
            <div className="absolute -inset-6 animate-pulse-glow rounded-full bg-gradient-to-br from-primary via-accent to-primary blur-2xl opacity-60" />
            <div className="absolute -inset-3 animate-pulse rounded-full bg-gradient-to-br from-primary/50 to-accent/50 blur-xl" />
            <div className="relative flex h-36 w-36 sm:h-44 sm:w-44 items-center justify-center rounded-full overflow-hidden shadow-2xl border-2 border-primary/50 bg-background/90 backdrop-blur-sm"
              style={{
                boxShadow: `0 0 50px hsl(185 100% 50% / 0.5), 0 0 100px hsl(270 80% 60% / 0.3)`,
              }}
            >
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
          className="absolute inset-0 h-full w-full pointer-events-none"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          {platforms.map((platform) => {
            const angleRad = (platform.angle * Math.PI) / 180;
            const x = 50 + 42 * Math.cos(angleRad);
            const y = 50 + 42 * Math.sin(angleRad);

            return (
              <line
                key={`line-${platform.name}`}
                x1="50"
                y1="50"
                x2={x}
                y2={y}
                stroke="url(#gradient-line)"
                strokeWidth="0.15"
                strokeDasharray="2,2"
                opacity="0.4"
              />
            );
          })}
          <defs>
            <linearGradient id="gradient-line" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="hsl(185 100% 50%)" />
              <stop offset="50%" stopColor="hsl(270 80% 60%)" />
              <stop offset="100%" stopColor="hsl(185 100% 50%)" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Sub-brand Modal */}
      <SubBrandModal 
        brand={selectedBrand} 
        open={modalOpen} 
        onOpenChange={setModalOpen} 
      />
    </>
  );
}
