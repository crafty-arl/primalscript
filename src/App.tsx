// Main App Component - Midnight Sun

import { useCallback } from 'react';
import { AppShell } from './components/AppShell';
import { Landing } from './components/Landing';
import { Reader } from './components/Reader';
import { Archive } from './components/Archive';
import { Access } from './components/Access';
import { Footer } from './components/Footer';
import { useScrollToSection } from './hooks/useScrollToSection';
import { AccessProvider } from './context/AccessContext';

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

  const handleScrollToAccess = useCallback(() => {
    scrollToSection('access', { offset: 20 });
  }, [scrollToSection]);

  return (
    <AccessProvider>
      <AppShell>
        <Landing onEnterArchive={handleEnterArchive} />
        <Reader onContinue={handleContinueToArchive} onRequestAccess={handleScrollToAccess} />
        <Archive onCrossReference={handleCrossReference} />
        <Access />
        <Footer />
      </AppShell>
    </AccessProvider>
  );
}

export default App;
