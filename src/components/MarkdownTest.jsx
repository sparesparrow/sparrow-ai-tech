import React from 'react';
import MarkdownViewer from '../components/MarkdownViewer';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const MarkdownTest = () => {
  const query = useQuery();
  const src = query.get('src') || `/sparrow-ai-tech/articles/mcp-prompts.md`;
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