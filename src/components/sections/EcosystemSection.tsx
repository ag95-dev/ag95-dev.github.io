import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollRevealWrapper } from "@/hooks/useScrollReveal";
import logoOnestudio from "@/assets/logo-onestudio.jpeg";
import logoShield from "@/assets/logo-shield.jpeg";
import logoAssist from "@/assets/logo-assist.jpeg";
import logoFlow from "@/assets/logo-flow.jpeg";
import logoEthera from "@/assets/logo-ethera.jpeg";
import logoSynapse from "@/assets/logo-synapse.jpeg";

const platforms = [
  {
    name: "DigiNexOneStudio",
    tagline: "The Creator's Platform",
    description: "Build and launch AI-powered applications 10x faster with our low-code platform. 1M+ apps built.",
    logo: logoOnestudio,
    color: "from-violet-600 to-violet-400",
    stats: "1M+ Apps Built",
    href: "#onestudio",
  },
  {
    name: "DigiNexShield",
    tagline: "The Security Fortress",
    description: "Zero-breach track record with 99.97% threat prevention. Trusted by Fortune 500.",
    logo: logoShield,
    color: "from-emerald-600 to-emerald-400",
    stats: "99.97% Prevention",
    href: "#shield",
  },
  {
    name: "DigiNexAssist",
    tagline: "The Compliance Engine",
    description: "500K+ immigration cases processed with 98% approval rate improvement.",
    logo: logoAssist,
    color: "from-blue-600 to-blue-400",
    stats: "500K+ Cases",
    href: "#assist",
  },
  {
    name: "DigiNexFlow",
    tagline: "The Automation Backbone",
    description: "10M+ workflows automated with 99.95% success rate across enterprises.",
    logo: logoFlow,
    color: "from-orange-600 to-orange-400",
    stats: "10M+ Workflows",
    href: "#flow",
  },
  {
    name: "DigiNexEthera",
    tagline: "The Intelligence Network",
    description: "1,000+ AI agents collaborating with 94% accuracy on complex decisions.",
    logo: logoEthera,
    color: "from-pink-600 to-pink-400",
    stats: "1,000+ Agents",
    href: "#ethera",
  },
  {
    name: "DigiNexSynapse",
    tagline: "The Intelligent Environment",
    description: "50,000+ smart spaces with 34% average energy savings.",
    logo: logoSynapse,
    color: "from-cyan-600 to-cyan-400",
    stats: "50K+ Spaces",
    href: "#synapse",
  },
];

export function EcosystemSection() {
  return (
    <ScrollRevealWrapper>
      <section id="ecosystem" className="relative py-24">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-card/30" />
        <div className="absolute left-0 top-1/2 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-primary/5 blur-[150px]" />
        <div className="absolute right-0 bottom-0 h-[400px] w-[400px] rounded-full bg-accent/5 blur-[120px]" />

        <div className="container relative">
          {/* Section Header */}
          <div className="mx-auto mb-16 max-w-3xl text-center scroll-reveal">
            <span className="mb-4 inline-block rounded-full bg-muted px-4 py-1 text-sm font-medium text-muted-foreground">
              The Complete Ecosystem
            </span>
            <h2 className="font-display text-4xl font-bold md:text-5xl">
              Six Platforms.{" "}
              <span className="gradient-text">One Ecosystem.</span>
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Each platform is powerful alone. Together, they create the most comprehensive 
              digital transformation suite ever built.
            </p>
          </div>

          {/* Platform Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {platforms.map((platform, index) => (
              <a
                key={platform.name}
                href={platform.href}
                className={cn(
                  "group relative overflow-hidden rounded-2xl border border-border bg-card/50 p-6 backdrop-blur-sm transition-all duration-500 hover:border-primary/50 hover:bg-card hover:shadow-xl hover:shadow-primary/5",
                  "scroll-reveal-scale"
                )}
                style={{ transitionDelay: `${index * 0.1}s` }}
              >
                {/* Gradient overlay on hover */}
                <div
                  className={cn(
                    "absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-500 group-hover:opacity-5",
                    platform.color
                  )}
                />

                <div className="relative">
                  {/* Logo */}
                  <div className="mb-4 h-16 w-16 overflow-hidden rounded-xl border border-primary/30 glow-fusion">
                    <img 
                      src={platform.logo} 
                      alt={platform.name}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  {/* Content */}
                  <div className="mb-4">
                    <h3 className="font-display text-xl font-semibold text-foreground">
                      {platform.name}
                    </h3>
                    <span className="text-sm text-primary">{platform.tagline}</span>
                  </div>

                  <p className="mb-4 text-sm text-muted-foreground leading-relaxed">
                    {platform.description}
                  </p>

                  {/* Stats badge */}
                  <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-muted px-3 py-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                    <span className="text-xs font-medium text-foreground">
                      {platform.stats}
                    </span>
                  </div>

                  {/* Arrow */}
                  <div className="flex items-center text-sm font-medium text-primary transition-transform group-hover:translate-x-1">
                    Learn more
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </div>
                </div>
              </a>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-12 text-center scroll-reveal">
            <Button variant="heroOutline" size="lg">
              Explore Full Ecosystem
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>
    </ScrollRevealWrapper>
  );
}