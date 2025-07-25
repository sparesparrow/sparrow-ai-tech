import React from 'react';
import MarkdownViewer from '../components/MarkdownViewer';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const MarkdownTest = () => {
  const query = useQuery();
  let src = query.get('src') || `/articles/mcp-prompts.md`;
  // Normalize for local dev vs. production
  if (typeof window !== 'undefined') {
    const isProd = window.location.pathname.startsWith('/sparrow-ai-tech');
    if (src.startsWith('./articles/')) {
      src = isProd
        ? `/sparrow-ai-tech/articles/` + src.slice('./articles/'.length)
        : `/articles/` + src.slice('./articles/'.length);
    } else if (src.startsWith('/sparrow-ai-tech/articles/')) {
      if (!isProd) {
        src = src.replace('/sparrow-ai-tech', '');
      }
    }
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