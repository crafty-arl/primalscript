// Section Component - Animated section wrapper

import { motion } from 'framer-motion';
import { useReducedMotion } from '../hooks/useReducedMotion';
import styles from './Section.module.css';

interface SectionProps {
  id: string;
  children: React.ReactNode;
  className?: string;
  fullHeight?: boolean;
  centered?: boolean;
}

export function Section({
  id,
  children,
  className = '',
  fullHeight = false,
  centered = false
}: SectionProps) {
  const prefersReducedMotion = useReducedMotion();

  const variants = {
    hidden: {
      opacity: 0,
      y: prefersReducedMotion ? 0 : 12
    },
    visible: {
      opacity: 1,
      y: 0
    }
  };

  return (
    <motion.section
      id={id}
      className={`${styles.section} ${fullHeight ? styles.fullHeight : ''} ${centered ? styles.centered : ''} ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-10%' }}
      variants={variants}
      transition={{
        duration: prefersReducedMotion ? 0 : 0.7,
        ease: 'easeOut'
      }}
    >
      <div className={styles.content}>
        {children}
      </div>
    </motion.section>
  );
}
