# Skill: docusaurus_lang_toggle_injector

## Description
A skill to override the Docusaurus theme and insert a language toggle (English/Urdu) button at the start of every chapter.

## Functionality
1. Generates the necessary **Theme Overrides** (e.g., for `DocItem/Content/index.js`).
2. Generates a **React Toggle Component** (`UrduToggle.jsx`).
3. The button toggles between **"اردو ترجمہ کریں" (Urdu Translate)** and **"Switch to English"**.
4. The component includes placeholder logic for the translation function (which will call an external translation API or LLM).

## Implementation

### UrduToggle.jsx
```jsx
import React, { useState, useEffect } from 'react';
import './UrduToggle.css';

const UrduToggle = () => {
  const [isUrdu, setIsUrdu] = useState(false);
  const [originalContent, setOriginalContent] = useState('');
  const [translatedContent, setTranslatedContent] = useState('');

  // Get the current page content to translate
  useEffect(() => {
    const mainContent = document.querySelector('article');
    if (mainContent) {
      setOriginalContent(mainContent.innerHTML);
    }
  }, []);

  // Function to translate content to Urdu
  const translateToUrdu = async (text) => {
    // This is a placeholder for actual translation logic
    // In a real implementation, you would call an API or use an LLM
    console.log('Translating to Urdu:', text.substring(0, 100) + '...');

    // For demonstration, return a placeholder translated text
    // In a real implementation, you would use a translation service
    return 'یہ اردو میں ترجمہ کردہ مواد ہے';
  };

  // Function to switch language
  const toggleLanguage = async () => {
    const mainContent = document.querySelector('article');
    if (!mainContent) return;

    if (!isUrdu) {
      // Switch to Urdu
      try {
        let urduContent = translatedContent;
        if (!urduContent) {
          urduContent = await translateToUrdu(originalContent);
          setTranslatedContent(urduContent);
        }

        mainContent.innerHTML = urduContent;
        setIsUrdu(true);
      } catch (error) {
        console.error('Translation error:', error);
        alert('Translation service is temporarily unavailable');
      }
    } else {
      // Switch back to English
      mainContent.innerHTML = originalContent;
      setIsUrdu(false);
    }
  };

  return (
    <div className="urdu-toggle-container">
      <button
        className={`urdu-toggle-btn ${isUrdu ? 'urdu-mode' : 'english-mode'}`}
        onClick={toggleLanguage}
        title={isUrdu ? "Switch to English" : "اردو ترجمہ کریں"}
      >
        {isUrdu ? "Switch to English" : "اردو ترجمہ کریں"}
      </button>
    </div>
  );
};

export default UrduToggle;
```

### UrduToggle.css
```css
.urdu-toggle-container {
  margin-bottom: 20px;
  text-align: right;
}

.urdu-toggle-btn {
  background-color: #4361ee;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s ease;
}

.urdu-toggle-btn:hover {
  background-color: #3a56d4;
  transform: translateY(-1px);
}

.urdu-toggle-btn.urdu-mode {
  background-color: #f72585;
}

.urdu-toggle-btn.urdu-mode:hover {
  background-color: #d3166d;
}

/* Urdu text styling */
.urdu-text {
  direction: rtl;
  text-align: right;
  font-family: 'Jameel Noori Nastaleeq', 'Urdu Typesetting', serif;
}
```

### Docusaurus Theme Override: src/theme/DocItem/Content/index.js
```jsx
import React from 'react';
import clsx from 'clsx';
import { ThemeClassNames } from '@docusaurus/theme-common';
import { useDoc } from '@docusaurus/plugin-content-docs/client';
import UrduToggle from '@site/src/components/UrduToggle'; // Adjust path as needed
import styles from './styles.module.css';

export default function DocItemContent({ children }) {
  const { metadata } = useDoc();
  return (
    <div className={clsx(ThemeClassNames.docs.docMarkdown, styles.docMarkdown)}>
      {/* Add the Urdu toggle at the beginning of each doc content */}
      <UrduToggle />
      {children}
    </div>
  );
}
```

### Alternative Implementation: Using MDX for specific pages
If you prefer to add the toggle to specific pages using MDX, you can create an MDX component:

### UrduToggle.mdx
```
import UrduToggle from '../src/components/UrduToggle';

<UrduToggle />

{children}
```

### Placeholder Translation Service (for backend implementation)
```javascript
// This would be implemented in your backend service
const translateService = {
  async translateToUrdu(text, sourceLang = 'en') {
    // Placeholder for actual translation service
    // You could use Google Translate API, Azure Translator, or an LLM
    try {
      // Example API call to translation service
      const response = await fetch('https://translation-api.example.com/translate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer YOUR_API_KEY'
        },
        body: JSON.stringify({
          text: text,
          source_lang: sourceLang,
          target_lang: 'ur'
        })
      });

      const result = await response.json();
      return result.translated_text;
    } catch (error) {
      console.error('Translation API error:', error);
      throw error;
    }
  }
};

module.exports = translateService;
```

## Usage
1. Save the UrduToggle component and CSS to your Docusaurus project
2. Create the theme override file in `src/theme/DocItem/Content/index.js`
3. The toggle button will appear at the top of every documentation page
4. Implement the actual translation service as needed
5. The button will toggle between English and Urdu versions of the content
```