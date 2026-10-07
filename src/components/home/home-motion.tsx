"use client";

import { type ReactNode, useEffect, useRef } from "react";

export function HomeMotion({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const animations = new Set<Animation>();
    const revealed = new Set<Element>();
    const elements = root.querySelectorAll<HTMLElement>("[data-home-reveal]");
    const observer = new IntersectionObserver(
      (entries) => {
        if (preference.matches) return;
        const styles = getComputedStyle(root);
        const timing = styles
          .getPropertyValue("--qx-motion-duration-normal")
          .trim();
        const duration =
          Number.parseFloat(timing) * (timing.endsWith("ms") ? 1 : 1000) * 2;

        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const element = entry.target as HTMLElement;
          observer.unobserve(element);
          revealed.add(element);

          const animation = element.animate(
            [
              { opacity: 0, transform: "translateY(16px)" },
              { opacity: 1, transform: "translateY(0)" },
            ],
            {
              duration: Number.isFinite(duration) ? duration : 400,
              delay: Number(element.dataset.homeDelay ?? 0),
              easing: styles
                .getPropertyValue("--qx-motion-easing-standard")
                .trim(),
              fill: "backwards",
            },
          );
          animations.add(animation);
          animation.onfinish = () => animations.delete(animation);
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -24px 0px" },
    );

    function syncPreference() {
      observer.disconnect();
      for (const animation of animations) animation.cancel();
      animations.clear();
      if (preference.matches) return;
      for (const element of elements) {
        if (!revealed.has(element)) observer.observe(element);
      }
    }

    syncPreference();
    preference.addEventListener("change", syncPreference);
    return () => {
      observer.disconnect();
      preference.removeEventListener("change", syncPreference);
      for (const animation of animations) animation.cancel();
    };
  }, []);

  return (
    <div ref={ref} className="home-page flex flex-col">
      {children}
    </div>
  );
}
