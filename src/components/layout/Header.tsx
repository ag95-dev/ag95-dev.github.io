import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown } from "lucide-react";
import logoImage from "@/assets/diginexai-logo.jpeg";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

const ecosystemItems = [
  {
    title: "DigiNexOneStudio",
    description: "The Creator's Platform - Build smart, launch fast with AI-powered low-code.",
    icon: "🚀",
  },
  {
    title: "DigiNexShield",
    description: "The Security Fortress - Zero-breach cybersecurity with predictive AI.",
    icon: "🛡️",
  },
  {
    title: "DigiNexAssist",
    description: "The Compliance Engine - Immigration simplified with 98% approval rate.",
    icon: "📋",
  },
  {
    title: "DigiNexFlow",
    description: "The Automation Backbone - 10M+ workflows automated with 99.95% success.",
    icon: "⚡",
  },
  {
    title: "DigiNexEthera",
    description: "The Intelligence Network - 1,000+ AI agents working collaboratively.",
    icon: "🧠",
  },
  {
    title: "DigiNexSynapse",
    description: "The Intelligent Environment - Spaces that think and adapt.",
    icon: "🌐",
  },
];

const navItems = [
  { name: "About", href: "#about" },
  { name: "Solutions", href: "#solutions" },
  { name: "Case Studies", href: "#case-studies" },
  { name: "Investors", href: "#investors" },
  { name: "Developers", href: "#developers" },
  { name: "Contact", href: "#contact" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <nav className="container flex h-20 items-center justify-between">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2">
          <img 
            src={logoImage} 
            alt="DigiNexAI Logo" 
            className="h-10 w-10 rounded-xl object-cover"
          />
          <span className="font-display text-xl font-bold">
            <span className="text-foreground">DigiNex</span>
            <span className="gradient-text">AI</span>
          </span>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-1 lg:flex">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent text-muted-foreground hover:text-foreground">
                  Ecosystem
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[500px] gap-2 p-4 md:grid-cols-2">
                    {ecosystemItems.map((item) => (
                      <li key={item.title}>
                        <NavigationMenuLink asChild>
                          <a
                            href="#"
                            className="flex gap-3 rounded-lg p-3 transition-colors hover:bg-muted"
                          >
                            <span className="text-2xl">{item.icon}</span>
                            <div>
                              <div className="font-display text-sm font-medium text-foreground">
                                {item.title}
                              </div>
                              <p className="text-xs text-muted-foreground line-clamp-2">
                                {item.description}
                              </p>
                            </div>
                          </a>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="px-4 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.name}
            </a>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="hidden items-center gap-3 lg:flex">
          <Button variant="ghost" size="sm">
            Sign In
          </Button>
          <Button variant="hero" size="sm">
            Schedule Demo
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6 text-foreground" />
          ) : (
            <Menu className="h-6 w-6 text-foreground" />
          )}
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="border-t border-border bg-background lg:hidden">
          <div className="container space-y-4 py-6">
            <div className="space-y-2">
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Ecosystem
              </p>
              {ecosystemItems.map((item) => (
                <a
                  key={item.title}
                  href="#"
                  className="flex items-center gap-3 rounded-lg p-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
                >
                  <span>{item.icon}</span>
                  {item.title}
                </a>
              ))}
            </div>
            <div className="border-t border-border pt-4">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="block py-2 text-sm text-muted-foreground hover:text-foreground"
                >
                  {item.name}
                </a>
              ))}
            </div>
            <div className="flex gap-3 pt-4">
              <Button variant="outline" className="flex-1">
                Sign In
              </Button>
              <Button variant="hero" className="flex-1">
                Schedule Demo
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
