import React from 'react';
import clsx from 'clsx';
import { ThemeClassNames } from '@docusaurus/theme-common';
import styles from './styles.module.css';

export default function DocItemContent({ children }) {
  return (
    <div className={clsx(ThemeClassNames.docs.docMarkdown, styles.docMarkdown)}>
      {children}
    </div>
  );
}