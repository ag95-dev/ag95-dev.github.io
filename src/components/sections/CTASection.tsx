import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, Sparkles } from "lucide-react";

export function CTASection() {
  return (
    <section className="relative overflow-hidden py-24">
      {/* Background effects */}
      <div className="absolute inset-0 gradient-hero" />
      <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/20 blur-[150px]" />
      <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-20" />

      <div className="container relative">
        <div className="mx-auto max-w-4xl text-center">
          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-2">
            <Sparkles className="h-4 w-4 text-accent" />
            <span className="text-sm font-medium text-accent">
              Start your transformation today
            </span>
          </div>

          {/* Headline */}
          <h2 className="font-display text-4xl font-bold md:text-5xl lg:text-6xl">
            Ready to Experience the{" "}
            <span className="gradient-text">Future of AI?</span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            Join 1,000+ enterprise clients who have already transformed their operations 
            with DigiNexAI. Schedule a personalized demo to see the ecosystem in action.
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Button variant="hero" size="xl">
              <Calendar className="mr-2 h-5 w-5" />
              Schedule Demo
            </Button>
            <Button variant="heroOutline" size="xl">
              Start Free Trial
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>

          {/* Trust indicators */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-emerald-500" />
              No credit card required
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-emerald-500" />
              14-day free trial
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-emerald-500" />
              Enterprise-ready
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
