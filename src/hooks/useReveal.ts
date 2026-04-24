import { useEffect, useRef, useState } from "react";

type RevealOptions = {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
};

export function useReveal<T extends HTMLElement = HTMLDivElement>({
  threshold = 0.2,
  rootMargin = "0px 0px -10% 0px",
  once = true,
}: RevealOptions = {}) {
  const elementRef = useRef<T | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncPreference = () => setPrefersReducedMotion(mediaQuery.matches);

    syncPreference();
    mediaQuery.addEventListener("change", syncPreference);

    return () => {
      mediaQuery.removeEventListener("change", syncPreference);
    };
  }, []);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    if (prefersReducedMotion) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            if (once) observer.unobserve(entry.target);
            return;
          }

          if (!once) setIsVisible(false);
        });
      },
      { threshold, rootMargin },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [once, prefersReducedMotion, rootMargin, threshold]);

  return { elementRef, isVisible, prefersReducedMotion };
}
