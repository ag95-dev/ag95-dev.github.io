import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ArrowRight, ExternalLink } from "lucide-react";

interface SubBrandInfo {
  name: string;
  fullName: string;
  tagline: string;
  description: string;
  features: string[];
  stats: string;
  color: string;
  logo: string;
}

interface SubBrandModalProps {
  brand: SubBrandInfo | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SubBrandModal({ brand, open, onOpenChange }: SubBrandModalProps) {
  if (!brand) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg border-primary/30 bg-card/95 backdrop-blur-xl">
        <DialogHeader>
          <div className="flex items-center gap-4 mb-2">
            <div className="h-16 w-16 rounded-2xl overflow-hidden border-2 border-primary/50 glow-fusion">
              <img 
                src={brand.logo} 
                alt={brand.fullName}
                className="h-full w-full object-cover"
              />
            </div>
            <div>
              <DialogTitle className="font-display text-2xl gradient-text">
                {brand.fullName}
              </DialogTitle>
              <p className="text-primary text-sm font-medium">{brand.tagline}</p>
            </div>
          </div>
        </DialogHeader>
        
        <div className="space-y-4">
          <DialogDescription className="text-muted-foreground leading-relaxed">
            {brand.description}
          </DialogDescription>
          
          {/* Stats badge */}
          <div className="inline-flex items-center gap-2 rounded-full bg-muted px-4 py-2">
            <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
            <span className="text-sm font-semibold text-foreground">
              {brand.stats}
            </span>
          </div>
          
          {/* Features */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-3">Key Features</h4>
            <ul className="space-y-2">
              {brand.features.map((feature, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <ArrowRight className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
          
          {/* CTA */}
          <div className="flex gap-3 pt-2">
            <Button className="flex-1 glow-primary">
              Explore {brand.name}
              <ExternalLink className="ml-2 h-4 w-4" />
            </Button>
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}