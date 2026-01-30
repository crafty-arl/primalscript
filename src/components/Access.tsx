// Access Component - Pay what you can section

import { useState, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Section } from './Section';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { useAccess } from '../context/AccessContext';
import styles from './Access.module.css';

type PriceOption = 5 | 10 | 20 | 'custom';

interface ToastMessage {
  id: number;
  text: string;
  type: 'success' | 'info';
}

export function Access() {
  const prefersReducedMotion = useReducedMotion();
  const { hasPaidAccess, setPaidAccess } = useAccess();
  const [selectedPrice, setSelectedPrice] = useState<PriceOption | null>(null);
  const [customPrice, setCustomPrice] = useState('');
  const [email, setEmail] = useState('');
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [emailError, setEmailError] = useState('');

  const showToast = (text: string, type: 'success' | 'info' = 'info') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, text, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const handlePriceSelect = (price: PriceOption) => {
    setSelectedPrice(price);
    if (price !== 'custom') {
      setCustomPrice('');
    }
  };

  const handlePurchase = () => {
    if (selectedPrice === null) {
      showToast('Select an access tier.', 'info');
      return;
    }

    if (selectedPrice === 'custom' && (!customPrice || Number(customPrice) < 1)) {
      showToast('Enter a valid amount.', 'info');
      return;
    }

    // Grant access (in production, this would verify payment)
    setPaidAccess(true);
    showToast('Full access granted. The complete trilogy is now unlocked.', 'success');
    setSelectedPrice(null);
    setCustomPrice('');
  };

  const validateEmail = (email: string): boolean => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleEmailSubmit = (e: FormEvent) => {
    e.preventDefault();
    setEmailError('');

    if (!email.trim()) {
      setEmailError('Email required.');
      return;
    }

    if (!validateEmail(email)) {
      setEmailError('Invalid email format.');
      return;
    }

    showToast('Notification registered. You will be contacted.', 'success');
    setEmail('');
  };

  return (
    <Section id="access">
      <div className={styles.access}>
        {/* Toast Container */}
        <div className={styles.toastContainer} aria-live="polite">
          <AnimatePresence>
            {toasts.map((toast) => (
              <motion.div
                key={toast.id}
                className={`${styles.toast} ${styles[toast.type]}`}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: prefersReducedMotion ? 0 : 0.2 }}
              >
                {toast.text}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <header className={styles.header}>
          <h2 className={styles.sectionTitle}>Access</h2>
        </header>

        {/* Free Book Panel */}
        <div className={styles.panel}>
          <div className={styles.freeHeader}>
            <span className={styles.freeTag}>FREE</span>
            <h3 className={styles.panelTitle}>Midnight Sun</h3>
          </div>
          <p className={styles.panelDesc}>
            Experience the complete first book. FBI Agent Maya Thorne's headaches reveal more than migraines—they reveal truths that will fracture reality itself.
          </p>
          <ul className={styles.includesList}>
            <li>The complete Midnight Sun manuscript</li>
            <li>All Book 1 archive materials</li>
            <li>No account required</li>
          </ul>
          <div className={styles.freeStatus}>
            Available now — Start reading above
          </div>
        </div>

        {/* Purchase Panel */}
        {hasPaidAccess ? (
          <div className={styles.panel}>
            <div className={styles.unlockedHeader}>
              <span className={styles.unlockedTag}>UNLOCKED</span>
              <h3 className={styles.panelTitle}>Full Trilogy Access</h3>
            </div>
            <p className={styles.panelDesc}>
              You have complete access to the entire Midnight Sun trilogy.
            </p>
            <ul className={styles.includesList}>
              <li>Book 2: Project Chimera — The signal spreads</li>
              <li>Book 3: PERFECT — The signal ends</li>
              <li>All classified archive entries</li>
              <li>Complete lore documentation</li>
            </ul>
          </div>
        ) : (
          <div className={styles.panel}>
            <div className={styles.paidHeader}>
              <span className={styles.paidTag}>UNLOCK</span>
              <h3 className={styles.panelTitle}>Complete the Journey</h3>
            </div>
            <p className={styles.panelDesc}>
              Unlock Books 2 & 3 plus all classified archive entries. Pay what you can.
            </p>
            <ul className={styles.includesList}>
              <li>Book 2: Project Chimera — The signal spreads</li>
              <li>Book 3: PERFECT — The signal ends</li>
              <li>All classified archive entries</li>
              <li>Complete lore documentation</li>
            </ul>

            <div className={styles.priceOptions}>
              {[5, 10, 20].map((price) => (
                <button
                  key={price}
                  className={`${styles.priceBtn} ${selectedPrice === price ? styles.selected : ''}`}
                  onClick={() => handlePriceSelect(price as PriceOption)}
                >
                  ${price}
                </button>
              ))}
              <button
                className={`${styles.priceBtn} ${selectedPrice === 'custom' ? styles.selected : ''}`}
                onClick={() => handlePriceSelect('custom')}
              >
                Custom
              </button>
            </div>

            <AnimatePresence>
              {selectedPrice === 'custom' && (
                <motion.div
                  className={styles.customInput}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: prefersReducedMotion ? 0 : 0.2 }}
                >
                  <span className={styles.currencySymbol}>$</span>
                  <input
                    type="number"
                    min="1"
                    placeholder="Amount"
                    value={customPrice}
                    onChange={(e) => setCustomPrice(e.target.value)}
                    className={styles.input}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            <button className={styles.purchaseBtn} onClick={handlePurchase}>
              Unlock Full Trilogy
            </button>
          </div>
        )}

        {/* Mailing List Panel */}
        <div className={styles.panel}>
          <h3 className={styles.panelTitle}>Stay Informed</h3>
          <p className={styles.panelDesc}>
            Receive transmissions when new archives are unsealed.
          </p>

          <form onSubmit={handleEmailSubmit} className={styles.emailForm}>
            <div className={styles.inputWrapper}>
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setEmailError('');
                }}
                className={`${styles.input} ${styles.emailInput} ${emailError ? styles.error : ''}`}
                aria-describedby={emailError ? 'email-error' : undefined}
              />
              {emailError && (
                <span id="email-error" className={styles.errorText}>
                  {emailError}
                </span>
              )}
            </div>
            <button type="submit" className={styles.notifyBtn}>
              Notify Me
            </button>
          </form>
        </div>
      </div>
    </Section>
  );
}
