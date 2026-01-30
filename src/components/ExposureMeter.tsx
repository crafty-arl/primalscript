// Exposure Meter Component - Shows scroll progress percentage

import { motion } from 'framer-motion';
import styles from './ExposureMeter.module.css';

interface ExposureMeterProps {
  progress: number;
}

export function ExposureMeter({ progress }: ExposureMeterProps) {
  const displayProgress = Math.round(progress);

  return (
    <div className={styles.meter} role="status" aria-live="polite">
      <span className={styles.label}>Exposure</span>
      <motion.span
        className={styles.value}
        key={displayProgress}
        initial={{ opacity: 0.6 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
      >
        {displayProgress.toString().padStart(3, '0')}%
      </motion.span>
    </div>
  );
}
