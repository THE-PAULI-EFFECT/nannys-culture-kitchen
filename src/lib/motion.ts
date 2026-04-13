import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/** Initialize GSAP defaults for the NCK brand: refined, never bouncy */
export function initMotion() {
  gsap.defaults({
    ease: "power3.out",
    duration: 0.8,
  });

  // Smooth-scroll via CSS (Lenis removed — GSAP ScrollTrigger handles scroll animations)
  document.documentElement.style.scrollBehavior = "smooth";
}

/** Fade-up reveal for sections */
export function revealOnScroll(selector: string) {
  gsap.utils.toArray<HTMLElement>(selector).forEach((el) => {
    gsap.fromTo(
      el,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          once: true,
        },
      }
    );
  });
}

/** Stagger children into view */
export function staggerReveal(parentSelector: string, childSelector: string) {
  gsap.utils.toArray<HTMLElement>(parentSelector).forEach((parent) => {
    const children = parent.querySelectorAll(childSelector);
    gsap.fromTo(
      children,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.12,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: {
          trigger: parent,
          start: "top 80%",
          once: true,
        },
      }
    );
  });
}

/** Parallax effect for hero backgrounds */
export function parallaxBg(selector: string, speed = 0.3) {
  gsap.to(selector, {
    yPercent: -100 * speed,
    ease: "none",
    scrollTrigger: {
      trigger: selector,
      start: "top top",
      end: "bottom top",
      scrub: true,
    },
  });
}

export { gsap, ScrollTrigger };
