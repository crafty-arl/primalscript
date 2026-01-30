// Noise Overlay Component - CSS-only grain effect

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '../hooks/useReducedMotion';
import styles from './NoiseOverlay.module.css';

interface NoiseOverlayProps {
  initialIntensity?: number;
  finalIntensity?: number;
}

export function NoiseOverlay({
  initialIntensity = 0.14,
  finalIntensity = 0.08
}: NoiseOverlayProps) {
  const prefersReducedMotion = useReducedMotion();
  const [intensity, setIntensity] = useState(initialIntensity);

  useEffect(() => {
    // Signal lock effect on initial load
    const timer = setTimeout(() => {
      setIntensity(finalIntensity);
    }, 800);

    return () => clearTimeout(timer);
  }, [finalIntensity]);

  return (
    <motion.div
      className={styles.overlay}
      initial={{ opacity: initialIntensity }}
      animate={{ opacity: intensity }}
      transition={{
        duration: prefersReducedMotion ? 0 : 0.8,
        ease: 'easeOut'
      }}
      style={{
        '--noise-intensity': intensity
      } as React.CSSProperties}
      aria-hidden="true"
    />
  );
}
