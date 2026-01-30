// Glitch Text Component - Subtle glitch effect on hover

import { useState, type ElementType, type ReactNode } from 'react';
import { useReducedMotion } from '../hooks/useReducedMotion';
import styles from './GlitchText.module.css';

interface GlitchTextProps {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  intensity?: 'subtle' | 'medium';
}

export function GlitchText({
  children,
  as: Component = 'span',
  className = '',
  intensity = 'subtle'
}: GlitchTextProps) {
  const prefersReducedMotion = useReducedMotion();
  const [isGlitching, setIsGlitching] = useState(false);

  const handleMouseEnter = () => {
    if (prefersReducedMotion) return;
    setIsGlitching(true);
  };

  const handleMouseLeave = () => {
    setIsGlitching(false);
  };

  const handleAnimationEnd = () => {
    setIsGlitching(false);
  };

  return (
    <Component
      className={`${styles.glitch} ${isGlitching ? styles.active : ''} ${styles[intensity]} ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onAnimationEnd={handleAnimationEnd}
      data-text={typeof children === 'string' ? children : undefined}
    >
      {children}
    </Component>
  );
}
