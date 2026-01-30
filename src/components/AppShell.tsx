// App Shell Component - Main layout wrapper with overlays and navigation

import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NoiseOverlay } from './NoiseOverlay';
import { ExposureMeter } from './ExposureMeter';
import { ScrollProgress } from './ScrollProgress';
import { useInViewSections } from '../hooks/useInViewSections';
import { useScrollToSection } from '../hooks/useScrollToSection';
import { useReducedMotion } from '../hooks/useReducedMotion';
import styles from '../styles/app.module.css';

interface AppShellProps {
  children: React.ReactNode;
}

const SECTION_IDS = ['signal', 'read', 'archive', 'access'];

const SECTION_LABELS: Record<string, string> = {
  signal: 'The Signal',
  read: 'Read',
  archive: 'Lore Archive',
  access: 'Access'
};

export function AppShell({ children }: AppShellProps) {
  const [isIndexOpen, setIsIndexOpen] = useState(false);
  const { scrollProgress } = useInViewSections(SECTION_IDS);
  const scrollToSection = useScrollToSection();
  const prefersReducedMotion = useReducedMotion();

  const handleIndexToggle = () => {
    setIsIndexOpen((prev) => !prev);
  };

  const handleSectionSelect = useCallback(
    (sectionId: string) => {
      setIsIndexOpen(false);
      // Small delay to allow overlay to close
      setTimeout(() => {
        scrollToSection(sectionId, { offset: 20 });
      }, 100);
    },
    [scrollToSection]
  );

  // Close overlay on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isIndexOpen) {
        setIsIndexOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isIndexOpen]);

  // Prevent body scroll when overlay is open
  useEffect(() => {
    if (isIndexOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isIndexOpen]);

  return (
    <div className={styles.shell}>
      {/* Noise Overlay */}
      <NoiseOverlay />

      {/* Exposure Meter */}
      <ExposureMeter progress={scrollProgress} />

      {/* Signal Strength Bar */}
      <ScrollProgress progress={scrollProgress} />

      {/* Index Toggle */}
      <button
        className={styles.indexToggle}
        onClick={handleIndexToggle}
        aria-expanded={isIndexOpen}
        aria-controls="index-overlay"
      >
        Index
      </button>

      {/* Index Overlay */}
      <AnimatePresence>
        {isIndexOpen && (
          <motion.div
            id="index-overlay"
            className={styles.indexOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.2 }}
            role="dialog"
            aria-modal="true"
            aria-label="Navigation index"
          >
            <div className={styles.indexContent}>
              <span className={styles.indexLabel}>Index</span>
              <nav className={styles.indexNav}>
                {SECTION_IDS.map((id) => (
                  <button
                    key={id}
                    className={styles.indexLink}
                    onClick={() => handleSectionSelect(id)}
                  >
                    {SECTION_LABELS[id]}
                  </button>
                ))}
              </nav>
              <button
                className={styles.closeIndex}
                onClick={() => setIsIndexOpen(false)}
              >
                [Close]
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className={styles.main}>
        {children}
      </main>
    </div>
  );
}
