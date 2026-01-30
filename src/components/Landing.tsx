// Landing Component - Full viewport hero section

import { motion } from 'framer-motion';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { Section } from './Section';
import styles from './Landing.module.css';

interface LandingProps {
  onEnterArchive: () => void;
}

export function Landing({ onEnterArchive }: LandingProps) {
  const prefersReducedMotion = useReducedMotion();

  const titleVariants = {
    hidden: {
      opacity: 0,
      filter: prefersReducedMotion ? 'none' : 'blur(4px)'
    },
    visible: {
      opacity: 1,
      filter: 'blur(0px)'
    }
  };

  return (
    <Section id="signal" fullHeight centered>
      <div className={styles.landing}>
        <motion.h1
          className={styles.title}
          variants={titleVariants}
          initial="hidden"
          animate="visible"
          transition={{
            duration: prefersReducedMotion ? 0 : 1.2,
            ease: 'easeOut',
            delay: 0.3
          }}
        >
          You were not meant to read this yet.
        </motion.h1>

        <motion.button
          className={styles.enterButton}
          onClick={onEnterArchive}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: prefersReducedMotion ? 0 : 0.6,
            delay: prefersReducedMotion ? 0 : 1.0
          }}
        >
          Enter Archive
        </motion.button>

        <motion.div
          className={styles.timestamp}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: prefersReducedMotion ? 0 : 0.6,
            delay: prefersReducedMotion ? 0 : 1.4
          }}
        >
          <span className={styles.logLabel}>LOG:</span> 00:00:13
        </motion.div>
      </div>
    </Section>
  );
}
