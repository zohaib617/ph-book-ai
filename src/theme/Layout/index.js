import React from 'react';
import OriginalLayout from '@theme-original/Layout';
import RAGChatbotUI from '@site/src/components/RAGChatbotUI';

export default function Layout(props) {
  return (
    <>
      <OriginalLayout {...props} />
      <RAGChatbotUI />
    </>
  );
}