// Archive Component - Lore entries with accordion expansion

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Section } from './Section';
import { GlitchText } from './GlitchText';
import { archiveEntries, readingOrder, type ArchiveEntry } from '../content/archive';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { useAccess } from '../context/AccessContext';
import styles from './Archive.module.css';

interface ArchiveProps {
  onCrossReference: () => void;
}

type BookFilter = 'All' | 'Series' | 'Midnight Sun' | 'Project Chimera' | 'PERFECT';

// Check if a lore entry is free (from Book 1 or Series-wide)
function isEntryFree(entry: ArchiveEntry): boolean {
  return entry.book === 'Series' || entry.book === 'Midnight Sun';
}

function formatDate(isoDate: string): string {
  const date = new Date(isoDate);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: '2-digit'
  }).toUpperCase();
}

function renderWithRedactions(text: string, redactions: Array<{ start: number; end: number }>): React.ReactNode {
  if (redactions.length === 0) return text;

  const sortedRedactions = [...redactions].sort((a, b) => a.start - b.start);
  const parts: React.ReactNode[] = [];
  let lastEnd = 0;

  sortedRedactions.forEach((redaction, index) => {
    if (redaction.start > lastEnd) {
      parts.push(text.slice(lastEnd, redaction.start));
    }
    parts.push(
      <span key={index} className="redacted" aria-label="Redacted content">
        {text.slice(redaction.start, redaction.end)}
      </span>
    );
    lastEnd = redaction.end;
  });

  if (lastEnd < text.length) {
    parts.push(text.slice(lastEnd));
  }

  return parts;
}

function ArchiveEntryCard({
  entry,
  isExpanded,
  onToggle,
  onCrossReference
}: {
  entry: ArchiveEntry;
  isExpanded: boolean;
  onToggle: () => void;
  onCrossReference: () => void;
}) {
  const prefersReducedMotion = useReducedMotion();

  const tagColorClass = {
    CLASSIFIED: styles.tagClassified,
    EVIDENCE: styles.tagEvidence,
    INCIDENT: styles.tagIncident,
    PERSONNEL: styles.tagPersonnel,
    SIGNAL: styles.tagSignal,
    RECOVERED: styles.tagRecovered,
    BRIEFING: styles.tagBriefing
  }[entry.tag];

  const bookColorClass = {
    'Midnight Sun': styles.bookMidnightSun,
    'Project Chimera': styles.bookChimera,
    'PERFECT': styles.bookPerfect,
    'Series': styles.bookSeries
  }[entry.book];

  return (
    <div className={`${styles.entry} ${isExpanded ? styles.expanded : ''}`}>
      <button
        className={styles.entryHeader}
        onClick={onToggle}
        aria-expanded={isExpanded}
        aria-controls={`entry-content-${entry.id}`}
      >
        <div className={styles.entryMeta}>
          <GlitchText className={`${styles.tag} ${tagColorClass}`}>
            {entry.tag}
          </GlitchText>
          <span className={`${styles.bookTag} ${bookColorClass}`}>{entry.book}</span>
          <span className={styles.date}>{formatDate(entry.dateISO)}</span>
        </div>
        <h3 className={styles.entryTitle}>{entry.title}</h3>
        <p className={styles.entrySummary}>{entry.summary}</p>
        <span className={styles.expandIcon} aria-hidden="true">
          {isExpanded ? '−' : '+'}
        </span>
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            id={`entry-content-${entry.id}`}
            className={styles.entryContent}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              duration: prefersReducedMotion ? 0 : 0.3,
              ease: 'easeOut'
            }}
          >
            <div className={styles.entryBody}>
              {entry.body.split('\n\n').map((paragraph, index) => (
                <p key={index}>
                  {renderWithRedactions(paragraph, entry.redactions)}
                </p>
              ))}
            </div>
            <button className={styles.crossRef} onClick={onCrossReference}>
              Cross-reference: Return to manuscript
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Archive({ onCrossReference }: ArchiveProps) {
  const { hasPaidAccess } = useAccess();
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [bookFilter, setBookFilter] = useState<BookFilter>('All');

  const handleToggle = useCallback((id: string) => {
    setExpandedId((current) => (current === id ? null : id));
  }, []);

  // Only show entries the user has access to
  const availableEntries = hasPaidAccess
    ? archiveEntries
    : archiveEntries.filter(entry => isEntryFree(entry));

  // Available filters based on access
  const availableFilters: BookFilter[] = hasPaidAccess
    ? ['All', 'Series', 'Midnight Sun', 'Project Chimera', 'PERFECT']
    : ['All', 'Series', 'Midnight Sun'];

  const filteredEntries = bookFilter === 'All'
    ? availableEntries
    : availableEntries.filter(entry => entry.book === bookFilter);

  return (
    <Section id="archive">
      <div className={styles.archive}>
        {/* Current Book Info - Only show Book 1 for free users */}
        {!hasPaidAccess ? (
          <div className={styles.currentBook}>
            <h3 className={styles.currentBookTitle}>Midnight Sun</h3>
            <p className={styles.currentBookTagline}>Where the signal began.</p>
            <p className={styles.currentBookDesc}>
              Explore recovered documentation from the Midnight Sun investigation.
              These files contain classified materials related to Agent Thorne's case.
            </p>
          </div>
        ) : (
          <div className={styles.readingOrder}>
            <h3 className={styles.readingOrderTitle}>Complete Archive</h3>
            <div className={styles.readingOrderGrid}>
              {readingOrder.map((book) => (
                <div key={book.order} className={styles.readingOrderCard}>
                  <span className={styles.orderNumber}>{book.order}</span>
                  <div className={styles.orderContent}>
                    <h4 className={styles.orderTitle}>{book.title}</h4>
                    <span className={styles.orderTagline}>{book.tagline}</span>
                    <p className={styles.orderDesc}>{book.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <header className={styles.header}>
          <h2 className={styles.sectionTitle}>Lore Archive</h2>
          <p className={styles.sectionDesc}>
            Recovered documentation. Some records remain incomplete.
          </p>
        </header>

        {/* Book Filter */}
        <div className={styles.filterBar}>
          <span className={styles.filterLabel}>Filter by source:</span>
          <div className={styles.filterButtons}>
            {availableFilters.map((filter) => (
              <button
                key={filter}
                className={`${styles.filterBtn} ${bookFilter === filter ? styles.active : ''}`}
                onClick={() => setBookFilter(filter)}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.grid}>
          {filteredEntries.map((entry) => (
            <ArchiveEntryCard
              key={entry.id}
              entry={entry}
              isExpanded={expandedId === entry.id}
              onToggle={() => handleToggle(entry.id)}
              onCrossReference={onCrossReference}
            />
          ))}
        </div>

        {filteredEntries.length === 0 && (
          <p className={styles.noResults}>No entries found for this filter.</p>
        )}
      </div>
    </Section>
  );
}
