// Main App Component - Midnight Sun

import { useCallback } from 'react';
import { AppShell } from './components/AppShell';
import { Landing } from './components/Landing';
import { Reader } from './components/Reader';
import { Archive } from './components/Archive';
import { Access } from './components/Access';
import { Footer } from './components/Footer';
import { useScrollToSection } from './hooks/useScrollToSection';

function App() {
  const scrollToSection = useScrollToSection();

  const handleEnterArchive = useCallback(() => {
    scrollToSection('read', { offset: 20 });
  }, [scrollToSection]);

  const handleContinueToArchive = useCallback(() => {
    scrollToSection('archive', { offset: 20 });
  }, [scrollToSection]);

  const handleCrossReference = useCallback(() => {
    scrollToSection('read', { offset: 20 });
  }, [scrollToSection]);

  return (
    <AppShell>
      <Landing onEnterArchive={handleEnterArchive} />
      <Reader onContinue={handleContinueToArchive} />
      <Archive onCrossReference={handleCrossReference} />
      <Access />
      <Footer />
    </AppShell>
  );
}

export default App;
