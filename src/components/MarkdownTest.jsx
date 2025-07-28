import React from 'react';
import { useLocation } from 'react-router-dom';
import MarkdownViewer from '../components/MarkdownViewer';

function useQuery() {
  const location = useLocation();
  return new URLSearchParams(location.search);
}

const MarkdownTest = () => {
  const query = useQuery();
  let src = query.get('src') || '/articles/mcp-prompts.md';

  // Normalizace cesty pro lokální / produkční prostředí
  const isProd = typeof window !== 'undefined' && window.location.pathname.startsWith('/sparrow-ai-tech');
  if (src.startsWith('./articles/')) {
    src = (isProd ? '/sparrow-ai-tech' : '') + '/articles/' + src.slice('./articles/'.length);
  } else if (src.startsWith('/sparrow-ai-tech/articles/') && !isProd) {
    src = src.replace('/sparrow-ai-tech', '');
  }

  const className = query.get('className') || '';
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="w-full max-w-3xl p-4">
        <MarkdownViewer src={src} className={className} />
      </div>
    </div>
  );
};

export default MarkdownTest;
