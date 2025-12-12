import React, { useEffect } from 'react';
import clsx from 'clsx';
import { ThemeClassNames } from '@docusaurus/theme-common';
import { useDoc } from '@docusaurus/plugin-content-docs/client';
import UrduToggle from '@site/src/components/UrduToggle';
import styles from './styles.module.css';

export default function DocItemContent({ children }) {
  const { metadata } = useDoc();

  // Handle translation when component mounts and when metadata changes (page navigation)
  useEffect(() => {
    const initTranslation = async () => {
      // Wait for content to load, then apply translation if needed
      await new Promise(resolve => setTimeout(resolve, 300));

      // Check if we should apply Urdu translation based on stored preference
      const currentLang = localStorage.getItem('preferred-language') || 'en';
      if (currentLang === 'ur') {
        // Wait for the UrduToggle component to be available in DOM
        await new Promise(resolve => setTimeout(resolve, 100));

        // Clear any previous translation data to ensure fresh translation for new chapter
        const elements = document.querySelectorAll('[data-translated]');
        elements.forEach(el => {
          if (!el.classList.contains('urdu-toggle-btn')) {
            el.removeAttribute('data-translated');
            el.classList.remove('urdu-text');
            el.style.direction = '';
            el.style.textAlign = '';

            // Restore original text if available
            const originalText = el.getAttribute('data-original-text');
            if (originalText) {
              el.textContent = originalText;
              el.removeAttribute('data-original-text');
            }
          }
        });

        // Now trigger a translation update by accessing the stored preference
        const event = new Event('translationRequired');
        document.dispatchEvent(event);
      }
    };

    initTranslation();
  }, [metadata]);

  return (
    <div className={clsx(ThemeClassNames.docs.docMarkdown, styles.docMarkdown)}>
      <div className="urdu-toggle-wrapper" style={{ marginBottom: '1rem', textAlign: 'right' }}>
        <UrduToggle />
      </div>
      {children}
    </div>
  );
}