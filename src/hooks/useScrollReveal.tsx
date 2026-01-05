import { useEffect, useRef, ReactNode } from 'react';

export function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      }
    );
    
    const elements = ref.current?.querySelectorAll('.scroll-reveal, .scroll-reveal-left, .scroll-reveal-right, .scroll-reveal-scale');
    elements?.forEach((el) => observer.observe(el));
    
    return () => {
      elements?.forEach((el) => observer.unobserve(el));
    };
  }, []);
  
  return ref;
}

interface ScrollRevealWrapperProps {
  children: ReactNode;
  className?: string;
}

export function ScrollRevealWrapper({ children, className = '' }: ScrollRevealWrapperProps) {
  const ref = useScrollReveal();
  
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}