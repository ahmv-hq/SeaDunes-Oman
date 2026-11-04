import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Initializes global scroll animations for sections and cards
 */
export function initScrollAnimations() {
  if (typeof window === 'undefined') return () => {};

  const ctx = gsap.context(() => {
    // 1. Reveal section headings
    const sectionHeads = document.querySelectorAll('.animate-head');
    sectionHeads.forEach((head) => {
      gsap.fromTo(
        head,
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.85,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: head,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    });

    // 2. Reveal cards with smooth stagger
    const cardGroups = document.querySelectorAll('.animate-cards-grid');
    cardGroups.forEach((group) => {
      const cards = group.querySelectorAll('.reveal-card');
      if (cards.length > 0) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.75,
            stagger: 0.12,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: group,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    });

    // 3. Featured Package Cards
    const featuredCards = document.querySelectorAll('.featured-card');
    featuredCards.forEach((card) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 45 },
        {
          opacity: 1,
          y: 0,
          duration: 0.85,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    });

    // 4. Parallax effect on hero background if present
    const heroBg = document.querySelector('.hero-parallax-bg');
    if (heroBg) {
      gsap.to(heroBg, {
        yPercent: 20,
        ease: 'none',
        scrollTrigger: {
          trigger: '.intro',
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    }
  });

  return () => ctx.revert();
}
