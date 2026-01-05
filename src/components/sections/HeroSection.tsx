import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import { EcosystemOrbit } from "@/components/ui/EcosystemOrbit";
import { FuturisticBackground } from "@/components/ui/FuturisticBackground";

export function HeroSection() {
  return (
    <section className="relative min-h-screen overflow-hidden pt-20">
      {/* 3D Futuristic Background */}
      <FuturisticBackground />
      
      {/* Gradient overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background/90" />
      <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[120px]" />

      <div className="container relative z-10 flex min-h-[calc(100vh-5rem)] flex-col items-center justify-center py-20">
        <div className="mx-auto max-w-4xl text-center">
          {/* Badge */}
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-border bg-muted/50 px-4 py-2 backdrop-blur-sm animate-fade-up">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent"></span>
            </span>
            <span className="text-sm text-muted-foreground">
              Trusted by Fortune 500 companies across 50+ countries
            </span>
          </div>

          {/* Headline */}
          <h1 
            className="font-display text-5xl font-bold leading-tight tracking-tight sm:text-6xl md:text-7xl lg:text-8xl animate-fade-up"
            style={{ animationDelay: "0.1s" }}
          >
            <span className="text-foreground">Intelligence,</span>
            <br />
            <span className="gradient-text glow-text">Orchestrated.</span>
          </h1>

          {/* Subheadline */}
          <p 
            className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl animate-fade-up"
            style={{ animationDelay: "0.2s" }}
          >
            The world's first fusion-first AI ecosystem. Six specialized platforms working as one 
            unified operating system for digital transformation.
          </p>

          {/* CTA Buttons */}
          <div 
            className="mt-10 flex flex-wrap items-center justify-center gap-4 animate-fade-up"
            style={{ animationDelay: "0.3s" }}
          >
            <Button variant="hero" size="xl">
              Explore Ecosystem
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button variant="heroOutline" size="xl">
              <Play className="mr-2 h-5 w-5" />
              Watch Demo
            </Button>
          </div>
        </div>

        {/* Ecosystem Orbit Visualization */}
        <div 
          className="mt-16 w-full max-w-3xl animate-fade-up"
          style={{ animationDelay: "0.4s" }}
        >
          <EcosystemOrbit />
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs text-muted-foreground">Scroll to explore</span>
          <div className="h-12 w-6 rounded-full border-2 border-muted-foreground/30 p-1">
            <div className="h-2 w-full animate-bounce rounded-full bg-accent" />
          </div>
        </div>
      </div>
    </section>
  );
}
