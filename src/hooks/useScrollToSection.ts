// Hook for smooth scrolling to sections with offset handling

import { useCallback } from 'react';
import { useReducedMotion } from './useReducedMotion';

interface ScrollOptions {
  offset?: number;
  behavior?: ScrollBehavior;
}

export function useScrollToSection() {
  const prefersReducedMotion = useReducedMotion();

  const scrollToSection = useCallback(
    (sectionId: string, options: ScrollOptions = {}) => {
      const { offset = 0 } = options;
      const behavior = prefersReducedMotion ? 'auto' : 'smooth';

      const element = document.getElementById(sectionId);
      if (!element) return;

      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior
      });
    },
    [prefersReducedMotion]
  );

  return scrollToSection;
}
