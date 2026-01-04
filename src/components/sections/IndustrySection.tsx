import { CheckCircle2, Award, Lock, TrendingUp } from "lucide-react";

const achievements = [
  {
    icon: Lock,
    title: "Zero-Breach Security",
    description: "Unmatched track record across our entire ecosystem",
  },
  {
    icon: TrendingUp,
    title: "100M+ Monthly Transactions",
    description: "Scalable processing across all platforms",
  },
  {
    icon: Award,
    title: "50+ Patents",
    description: "AI-blockchain fusion technology leadership",
  },
  {
    icon: CheckCircle2,
    title: "Global Compliance",
    description: "Certified for GDPR, HIPAA, SOC 2",
  },
];

const awards = [
  { title: "Global AI Innovation Leader 2024", org: "World Economic Forum" },
  { title: "Best Enterprise Security Platform", org: "Cybersecurity Excellence" },
  { title: "Technology Pioneer 2024", org: "MIT Technology Review" },
  { title: "Magic Quadrant Leader", org: "Gartner" },
];

export function IndustrySection() {
  return (
    <section className="relative overflow-hidden bg-card py-24">
      {/* Background elements */}
      <div className="absolute right-0 top-0 h-[600px] w-[600px] translate-x-1/2 rounded-full bg-primary/5 blur-[150px]" />
      <div className="absolute bottom-0 left-0 h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-accent/5 blur-[100px]" />

      <div className="container relative">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
          {/* Left Column - Industry Leadership */}
          <div>
            <span className="mb-4 inline-block rounded-full bg-muted px-4 py-1 text-sm font-medium text-muted-foreground">
              Industry Leadership
            </span>
            <h2 className="font-display text-3xl font-bold md:text-4xl">
              Setting the Standard for{" "}
              <span className="gradient-text">Enterprise AI</span>
            </h2>
            <p className="mt-4 text-muted-foreground">
              Our relentless focus on security, scalability, and innovation has made DigiNexAI 
              the trusted partner for the world's most demanding organizations.
            </p>

            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              {achievements.map((item, index) => (
                <div
                  key={item.title}
                  className="group rounded-xl border border-border bg-background/50 p-4 transition-all duration-300 hover:border-primary/50 hover:bg-background"
                >
                  <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-display text-sm font-semibold text-foreground">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Awards */}
          <div>
            <span className="mb-4 inline-block rounded-full bg-accent/10 px-4 py-1 text-sm font-medium text-accent">
              Recognition & Awards
            </span>
            <h2 className="font-display text-3xl font-bold md:text-4xl">
              Trusted by Industry{" "}
              <span className="text-accent">Leaders</span>
            </h2>
            <p className="mt-4 text-muted-foreground">
              Consistently recognized by the world's most respected technology analysts 
              and industry associations.
            </p>

            <div className="mt-8 space-y-4">
              {awards.map((award, index) => (
                <div
                  key={award.title}
                  className="group flex items-center gap-4 rounded-xl border border-border bg-background/50 p-4 transition-all duration-300 hover:border-accent/50 hover:bg-background"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent">
                    <Award className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-display text-sm font-semibold text-foreground">
                      {award.title}
                    </h3>
                    <p className="text-xs text-muted-foreground">{award.org}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
