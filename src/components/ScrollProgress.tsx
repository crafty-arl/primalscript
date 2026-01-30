// Scroll Progress / Signal Strength Bar Component

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useReducedMotion } from '../hooks/useReducedMotion';
import styles from './ScrollProgress.module.css';

interface ScrollProgressProps {
  progress: number;
}

export function ScrollProgress({ progress }: ScrollProgressProps) {
  const prefersReducedMotion = useReducedMotion();
  const [jitter, setJitter] = useState(0);
  const progressValue = useMotionValue(progress / 100);
  const smoothProgress = useSpring(progressValue, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Update spring value when progress changes
  useEffect(() => {
    progressValue.set(progress / 100);
  }, [progress, progressValue]);

  // Subtle jitter effect
  useEffect(() => {
    if (prefersReducedMotion) return;

    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        setJitter(Math.random() * 2 - 1);
        setTimeout(() => setJitter(0), 100);
      }
    }, 500);

    return () => clearInterval(interval);
  }, [prefersReducedMotion]);

  return (
    <div
      className={styles.container}
      role="progressbar"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Signal strength"
    >
      <div className={styles.track}>
        <motion.div
          className={styles.fill}
          style={{
            scaleY: smoothProgress,
            x: jitter
          }}
        />
      </div>
      <span className={styles.label}>Signal</span>
    </div>
  );
}
