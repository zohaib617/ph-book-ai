import React, { useState, useEffect } from 'react';
import './UrduToggle.css';

const UrduToggle = () => {
  const [isUrdu, setIsUrdu] = useState(() => {
    // Check if Urdu was previously selected
    return localStorage.getItem('preferred-language') === 'ur';
  });

  // Function to translate text to Urdu (placeholder with better implementation)
  const translateToUrdu = async (text) => {
    // In a real implementation, you would call an API or use an LLM
    // For now, we'll use a simple placeholder mapping for demonstration
    const translationMap = {
      'Physical AI & Humanoid Robotics': 'فزکل ای آئی اور ہیومنوائڈ روبوٹکس',
      'An Educational Book on End-to-End Robotics Pipeline': 'اینڈ ٹو اینڈ روبوٹکس پائپ لائن پر ایک تعلیمی کتاب',
      'Physical AI': 'فزکل ای آئی',
      'Humanoid Robotics': 'ہیومنوائڈ روبوٹکس',
      'End-to-End Pipeline': 'اینڈ ٹو اینڈ پائپ لائن',
      'Exploring the intersection of artificial intelligence and physical systems.': 'مصنوعی ذہانت اور جسمانی نظام کے تقاطع کو تلاش کرنا.',
      'Advanced robotics focusing on human-like form and functionality.': 'ہیومن لائیک شکل اور افعال پر توجہ مرکوز کرتے ہوئے اعلیٰ روبوٹکس.',
      'Complete educational journey from theory to practical implementation.': 'نظریہ سے عملی نفاذ تک مکمل تعلیمی سفر.',
      'Book Content': 'کتاب کا مواد',
      'Introduction to Physical AI': 'فزکل ای آئی کا تعارف',
      'Understanding the fundamentals of artificial intelligence applied to physical systems, including sensors, actuators, and real-world interaction challenges.': 'سینسرز، ایکچو ایٹرز اور حقیقی دنیا کے تعامل کی چیلنجز سمیت جسمانی نظام پر لاگو ہونے والی مصنوعی ذہانت کے بنیادیات کو سمجھنا.',
      'Humanoid Robotics Design': 'ہیومنوائڈ روبوٹکس کی ڈیزائن',
      'Exploring the principles of designing humanoid robots, including kinematics, dynamics, and biomechanical considerations.': 'کنیمیٹکس، ڈائنیمکس اور بائیو میکانیکل ا considerations سمیت ہیومنوائڈ روبوٹس کی ڈیزائن کے اصولوں کو تلاش کرنا.',
      'Control Systems': 'کنٹرول سسٹم',
      'Advanced control algorithms for humanoid robots, including balance, locomotion, and manipulation strategies.': 'ہیومنوائڈ روبوٹس کے لیے اعلیٰ کنٹرول الگورتھم، بشمول توازن، لوکوموشن اور مینیپولیشن کی حکمت عملی.',
      'Machine Learning for Robotics': 'روبوٹکس کے لیے مشین لرننگ',
      'Applying modern machine learning techniques to robotic systems, including reinforcement learning and neural networks.': 'ریفورسمنٹ لرننگ اور نیورل نیٹ ورکس سمیت روبوٹک نظام پر جدید مشین لرننگ کی تکنیکوں کو لاگو کرنا.',
      'Hardware Integration': 'ہارڈ ویئر کا انضمام',
      'Practical implementation of robotic systems, including component selection, assembly, and testing procedures.': 'جزو کے انتخاب، ایسیمبلی اور ٹیسٹنگ کی کارروائیوں سمیت روبوٹک نظام کا عملی نفاذ.',
      'Ethics and Safety': 'اخلاقیات اور حفاظت',
      'Addressing ethical considerations and safety protocols in humanoid robotics development and deployment.': 'ہیومنوائڈ روبوٹکس کی ترقی اور انتظام میں اخلاقیات کے جاتے اور حفاظتی پروٹوکول کا احاطہ کرنا.',
      'Read the Book': 'کتاب پڑھیں',
      'Learn More': 'مزید سیکھیں',
      'Introduction': 'تعارف',
      'Table of Contents': 'فہرست',
      'Getting Started': 'شروع کریں',
      'Basics': 'بنیادیں',
      'Advanced Concepts': 'اعلیٰ تصورات',
      'Practical Applications': 'عملی اطلاق',
      'Future of Physical AI': 'فزکل ای آئی کا مستقبل',
      'Components': 'جزو',
      'Assembly': 'ایسیمبلی',
      'Testing': 'ٹیسٹنگ',
      'Safety Guidelines': 'حفاظتی ہدایات',
      'Best Practices': 'بہترین طریقے',
      'Home': 'ہوم',
      'Modules': 'ماڈیولز',
      'Next': 'اگلا',
      'Previous': 'پچھلا',
      'On this page': 'اس صفحے پر',
      'Was this page helpful?': 'کیا یہ صفحہ مددگار تھا؟',
      'Yes': 'جی ہاں',
      'No': 'نہیں',
      'Last updated': 'آخری بار تازہ کاری',
      'Edit this page': 'اس صفحے میں ترمیم کریں'
    };

    // Check if exact translation exists
    if (translationMap[text]) {
      return translationMap[text];
    }

    // For content that's not in the map, return the original text
    // In a real implementation, you would call an actual translation API here
    return text;
  };

  // Function to translate content of the current page/chapter only
  const translateCurrentPageContent = async (toUrdu = true) => {
    // Focus on translating content within the main documentation content area
    // More specific selectors for Docusaurus documentation pages
    const selectors = [
      '.theme-doc-markdown',
      '.docItemContainer',
      '.docItemWrapper',
      '.theme-doc-content',
      '.markdown',
      'article',
      '.container'
    ];

    let mainContent = null;
    for (const selector of selectors) {
      mainContent = document.querySelector(selector);
      if (mainContent) break;
    }

    if (!mainContent) {
      // Fallback to body if no specific content container found
      mainContent = document.body;
    }

    // Select all text-containing elements within the main content area
    const elements = mainContent.querySelectorAll('h1, h2, h3, h4, h5, h6, p, li, .hero__title, .hero__subtitle, .card__header, .card__body, .button, .table-of-contents__link, .pagination-nav__link, .theme-edit-this-page, .theme-last-updated, .breadcrumbs__item, .pagination-nav__label, .markdown, .container, .col, .row, .docItemContainer, .docItemWrapper, .theme-doc-content, .doc-markdown, .content, .hero, .hero__subtitle, .hero__title');

    // Create an array to store elements that need translation
    const elementsToTranslate = [];

    for (const element of elements) {
      if (element.classList.contains('urdu-toggle-btn') ||
          element.classList.contains('urdu-toggle-container')) continue; // Skip the toggle button itself

      const originalText = element.textContent.trim();
      if (originalText) {
        elementsToTranslate.push({
          element,
          originalText,
          translated: false
        });
      }
    }

    // Process translations
    for (const item of elementsToTranslate) {
      const { element, originalText } = item;

      if (toUrdu) {
        // Translate to Urdu
        if (!element.hasAttribute('data-translated')) {
          const translatedText = await translateToUrdu(originalText);
          if (translatedText && translatedText !== originalText) {
            // Store original text as data attribute for later restoration
            element.setAttribute('data-original-text', originalText);
            element.textContent = translatedText;
            element.setAttribute('data-translated', 'true');
            element.classList.add('urdu-text');
            element.style.direction = 'rtl';
            element.style.textAlign = 'right';
          } else if (translatedText === originalText) {
            // Mark as translated even if no translation exists, so we don't try again
            element.setAttribute('data-translated', 'true');
          }
        }
      } else {
        // Restore to English
        const originalText = element.getAttribute('data-original-text');
        if (originalText) {
          element.textContent = originalText;
          element.removeAttribute('data-translated');
          element.classList.remove('urdu-text');
          element.style.direction = '';
          element.style.textAlign = '';
        }
      }
    }
  };

  // Function to switch language
  const toggleLanguage = async () => {
    try {
      // Force re-render by updating state
      if (!isUrdu) {
        // Switch to Urdu
        await translateCurrentPageContent(true);
        setIsUrdu(true);
        localStorage.setItem('preferred-language', 'ur');
      } else {
        // Switch back to English
        await translateCurrentPageContent(false);
        setIsUrdu(false);
        localStorage.setItem('preferred-language', 'en');
      }
    } catch (error) {
      console.error('Translation error:', error);
      alert('Translation service is temporarily unavailable');
    }
  };

  // Add CSS for Urdu text if not already present
  useEffect(() => {
    const styleId = 'urdu-text-styles';
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style');
      style.id = styleId;
      style.textContent = `
        .urdu-text {
          direction: rtl;
          text-align: right;
          font-family: 'Jameel Noori Nastaleeq', 'Urdu Typesetting', serif;
        }
      `;
      document.head.appendChild(style);
    }
  }, []);

  // Apply initial translation based on stored preference when component mounts
  useEffect(() => {
    const initTranslation = async () => {
      // Wait for the DOM to be fully loaded
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', async () => {
          if (isUrdu) {
            await new Promise(resolve => setTimeout(resolve, 500)); // Wait a bit more for content
            await translateCurrentPageContent(true);
          }
        });
      } else {
        if (isUrdu) {
          await new Promise(resolve => setTimeout(resolve, 500)); // Wait for content to load
          await translateCurrentPageContent(true);
        }
      }
    };

    initTranslation();
  }, []); // Only run once when component mounts

  return (
    <div className="urdu-toggle-container">
      <button
        className={`urdu-toggle-btn ${isUrdu ? 'urdu-mode' : 'english-mode'}`}
        onClick={toggleLanguage}
        title={isUrdu ? "Switch to English" : "اردو میں ترجمہ کریں"}
      >
        {isUrdu ? "Switch to English" : "اردو میں ترجمہ کریں"}
      </button>
    </div>
  );
};

export default UrduToggle;