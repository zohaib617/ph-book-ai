import React, { useEffect, useState } from 'react';

const UrduToggle = () => {
  const [isUrdu, setIsUrdu] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedLang = localStorage.getItem('preferred-language');
      setIsUrdu(savedLang === 'ur');
    }
  }, []);

  const toggleLanguage = () => {
    const newLang = !isUrdu;
    setIsUrdu(newLang);

    if (typeof window !== 'undefined') {
      localStorage.setItem(
        'preferred-language',
        newLang ? 'ur' : 'en'
      );
    }
  };

  return (
    <button onClick={toggleLanguage}>
      {isUrdu ? 'اردو' : 'English'}
    </button>
  );
};

export default UrduToggle;
