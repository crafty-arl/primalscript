// Hook to track which sections are in view and calculate scroll progress

import { useState, useEffect, useCallback } from 'react';

interface SectionVisibility {
  currentSection: string | null;
  scrollProgress: number;
  sectionProgress: Record<string, number>;
}

export function useInViewSections(sectionIds: string[]): SectionVisibility {
  const [currentSection, setCurrentSection] = useState<string | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [sectionProgress, setSectionProgress] = useState<Record<string, number>>({});

  const calculateProgress = useCallback(() => {
    const scrollTop = window.pageYOffset;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? Math.min((scrollTop / docHeight) * 100, 100) : 0;
    setScrollProgress(progress);
  }, []);

  useEffect(() => {
    const observerOptions: IntersectionObserverInit = {
      root: null,
      rootMargin: '-20% 0px -60% 0px',
      threshold: 0
    };

    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setCurrentSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Observe section visibility
    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    // Progress observer for individual sections
    const progressObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const ratio = Math.round(entry.intersectionRatio * 100);
          setSectionProgress((prev) => ({
            ...prev,
            [entry.target.id]: ratio
          }));
        });
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: Array.from({ length: 101 }, (_, i) => i / 100)
      }
    );

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        progressObserver.observe(element);
      }
    });

    // Scroll progress listener
    const handleScroll = () => {
      calculateProgress();
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial calculation

    return () => {
      observer.disconnect();
      progressObserver.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, [sectionIds, calculateProgress]);

  return {
    currentSection,
    scrollProgress,
    sectionProgress
  };
}
