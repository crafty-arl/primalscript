// Access Component - Pay what you can section

import { useState, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Section } from './Section';
import { useReducedMotion } from '../hooks/useReducedMotion';
import styles from './Access.module.css';

type PriceOption = 5 | 10 | 20 | 'custom';

interface ToastMessage {
  id: number;
  text: string;
  type: 'success' | 'info';
}

export function Access() {
  const prefersReducedMotion = useReducedMotion();
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

    showToast('Access request logged. Delivery method: manual.', 'success');
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

        {/* Purchase Panel */}
        <div className={styles.panel}>
          <h3 className={styles.panelTitle}>Unseal the Manuscript</h3>
          <p className={styles.panelDesc}>
            Pay what you can: $5–$20
          </p>

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
            Request Access
          </button>
        </div>

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
