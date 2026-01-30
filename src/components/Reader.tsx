// Reader Component - Chapter reading experience

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { Section } from './Section';
import { books, type Book, type Chapter } from '../content/allBooks';
import { useReducedMotion } from '../hooks/useReducedMotion';
import styles from './Reader.module.css';

interface ReaderProps {
  onContinue: () => void;
}

type FontSize = 'small' | 'medium' | 'large';

const FONT_SIZE_MAP: Record<FontSize, string> = {
  small: '0.9375rem',    // 15px
  medium: '1.0625rem',   // 17px
  large: '1.1875rem'     // 19px
};

const FONT_SIZE_KEY = 'midnight-sun-font-size';
const NIGHT_FILTER_KEY = 'midnight-sun-night-filter';
const BOOK_KEY = 'midnight-sun-book';
const CHAPTER_KEY = 'midnight-sun-chapter';

export function Reader({ onContinue }: ReaderProps) {
  const prefersReducedMotion = useReducedMotion();
  const [activeBook, setActiveBook] = useState<Book>(books[0]);
  const [activeChapter, setActiveChapter] = useState<Chapter>(books[0].chapters[0]);
  const [fontSize, setFontSize] = useState<FontSize>('medium');
  const [nightFilter, setNightFilter] = useState(false);

  // Load preferences from localStorage
  useEffect(() => {
    const savedFontSize = localStorage.getItem(FONT_SIZE_KEY) as FontSize;
    const savedNightFilter = localStorage.getItem(NIGHT_FILTER_KEY);
    const savedBookIndex = localStorage.getItem(BOOK_KEY);
    const savedChapterIndex = localStorage.getItem(CHAPTER_KEY);

    if (savedFontSize && FONT_SIZE_MAP[savedFontSize]) {
      setFontSize(savedFontSize);
    }
    if (savedNightFilter !== null) {
      setNightFilter(savedNightFilter === 'true');
    }
    if (savedBookIndex !== null) {
      const bookIdx = parseInt(savedBookIndex, 10);
      if (books[bookIdx]) {
        setActiveBook(books[bookIdx]);
        if (savedChapterIndex !== null) {
          const chapterIdx = parseInt(savedChapterIndex, 10);
          if (books[bookIdx].chapters[chapterIdx]) {
            setActiveChapter(books[bookIdx].chapters[chapterIdx]);
          }
        }
      }
    }
  }, []);

  const handleFontSizeChange = (size: FontSize) => {
    setFontSize(size);
    localStorage.setItem(FONT_SIZE_KEY, size);
  };

  const handleNightFilterToggle = () => {
    const newValue = !nightFilter;
    setNightFilter(newValue);
    localStorage.setItem(NIGHT_FILTER_KEY, String(newValue));
  };

  const handleBookSelect = (book: Book) => {
    setActiveBook(book);
    setActiveChapter(book.chapters[0]);
    const bookIndex = books.indexOf(book);
    localStorage.setItem(BOOK_KEY, String(bookIndex));
    localStorage.setItem(CHAPTER_KEY, '0');
  };

  const handleChapterSelect = (chapter: Chapter) => {
    setActiveChapter(chapter);
    const chapterIndex = activeBook.chapters.indexOf(chapter);
    localStorage.setItem(CHAPTER_KEY, String(chapterIndex));
  };

  const currentChapterIndex = activeBook.chapters.indexOf(activeChapter);
  const hasNextChapter = currentChapterIndex < activeBook.chapters.length - 1;
  const hasPrevChapter = currentChapterIndex > 0;

  const goToNextChapter = () => {
    if (hasNextChapter) {
      handleChapterSelect(activeBook.chapters[currentChapterIndex + 1]);
    }
  };

  const goToPrevChapter = () => {
    if (hasPrevChapter) {
      handleChapterSelect(activeBook.chapters[currentChapterIndex - 1]);
    }
  };

  const wordCount = activeChapter.text.split(/\s+/).length;

  return (
    <Section id="read">
      <div className={`${styles.reader} ${nightFilter ? styles.nightFilter : ''}`}>
        {/* Header */}
        <header className={styles.header}>
          <h2 className={styles.sectionTitle}>Read</h2>

          {/* Book Selector */}
          <nav className={styles.bookNav} aria-label="Book selection">
            {books.map((book) => (
              <button
                key={book.title}
                className={`${styles.bookPill} ${activeBook.title === book.title ? styles.active : ''}`}
                onClick={() => handleBookSelect(book)}
                aria-current={activeBook.title === book.title ? 'true' : undefined}
              >
                {book.title}
              </button>
            ))}
          </nav>

          {/* Chapter Selector */}
          <div className={styles.chapterSelectWrapper}>
            <label htmlFor="chapter-select" className={styles.chapterLabel}>Chapter:</label>
            <select
              id="chapter-select"
              className={styles.chapterSelect}
              value={currentChapterIndex}
              onChange={(e) => handleChapterSelect(activeBook.chapters[parseInt(e.target.value, 10)])}
            >
              {activeBook.chapters.map((chapter, index) => (
                <option key={index} value={index}>
                  {chapter.name}
                </option>
              ))}
            </select>
          </div>
        </header>

        {/* Controls */}
        <div className={styles.controls}>
          <div className={styles.fontControls}>
            <button
              className={`${styles.fontBtn} ${fontSize === 'small' ? styles.active : ''}`}
              onClick={() => handleFontSizeChange('small')}
              aria-label="Small font size"
            >
              A-
            </button>
            <button
              className={`${styles.fontBtn} ${fontSize === 'medium' ? styles.active : ''}`}
              onClick={() => handleFontSizeChange('medium')}
              aria-label="Medium font size"
            >
              A
            </button>
            <button
              className={`${styles.fontBtn} ${fontSize === 'large' ? styles.active : ''}`}
              onClick={() => handleFontSizeChange('large')}
              aria-label="Large font size"
            >
              A+
            </button>
          </div>

          <button
            className={`${styles.nightBtn} ${nightFilter ? styles.active : ''}`}
            onClick={handleNightFilterToggle}
            aria-pressed={nightFilter}
          >
            Night Filter
          </button>
        </div>

        {/* Reading Area */}
        <div className={styles.documentWrapper}>
          {/* Ruler markers */}
          <div className={styles.ruler} aria-hidden="true">
            <div className={styles.rulerMark} />
            <div className={styles.rulerMark} />
            <div className={styles.rulerMark} />
          </div>

          <AnimatePresence mode="wait">
            <motion.article
              key={`${activeBook.title}-${activeChapter.name}`}
              className={styles.document}
              style={{
                fontSize: FONT_SIZE_MAP[fontSize]
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                duration: prefersReducedMotion ? 0 : 0.4
              }}
            >
              <header className={styles.chapterHeader}>
                <span className={styles.bookLabel}>{activeBook.title}</span>
                <h3 className={styles.chapterTitle}>{activeChapter.name}</h3>
                <span className={styles.wordCount}>{wordCount.toLocaleString()} words</span>
              </header>

              <div className={styles.body}>
                <ReactMarkdown
                  components={{
                    p: ({ children }) => <p>{children}</p>,
                    em: ({ children }) => <em>{children}</em>,
                    strong: ({ children }) => <strong>{children}</strong>,
                    hr: () => <hr className={styles.divider} />,
                    blockquote: ({ children }) => <blockquote className={styles.blockquote}>{children}</blockquote>,
                  }}
                >
                  {activeChapter.text}
                </ReactMarkdown>
              </div>
            </motion.article>
          </AnimatePresence>
        </div>

        {/* Chapter Navigation */}
        <div className={styles.chapterNav}>
          <button
            className={styles.navBtn}
            onClick={goToPrevChapter}
            disabled={!hasPrevChapter}
          >
            ← Previous
          </button>
          <span className={styles.chapterIndicator}>
            {currentChapterIndex + 1} / {activeBook.chapters.length}
          </span>
          <button
            className={styles.navBtn}
            onClick={goToNextChapter}
            disabled={!hasNextChapter}
          >
            Next →
          </button>
        </div>

        {/* Continue */}
        <div className={styles.continueWrapper}>
          <button className={styles.continueBtn} onClick={onContinue}>
            Continue to Archive
          </button>
        </div>
      </div>
    </Section>
  );
}
