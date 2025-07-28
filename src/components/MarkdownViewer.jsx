/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import MermaidPreviewLink from './MermaidPreviewLink.jsx';
import ImagePreviewLink from './ImagePreviewLink.jsx';
import GithubRepoTooltip from './GithubRepoTooltip.jsx';

const Mermaid = () => (
  <div className="mermaid-diagram text-red-500">Mermaid diagrams are not supported.</div>
);

const EditableMermaid = () => (
  <div className="mermaid-diagram text-red-500">Editable Mermaid diagrams are not supported.</div>
);

const MarkdownViewer = ({ src, className = '', editableDiagrams = true }) => {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch(src)
      .then((res) => {
        if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`);
        return res.text();
      })
      .then(setContent)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [src]);

  if (loading) return <div className="markdown-viewer-loading">Loading…</div>;
  if (error) return <div className="markdown-viewer-error">Error loading markdown.</div>;

  return (
    <div className={`prose prose-invert max-w-none ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={{
          a: ({ href, children, ...props }) => {
            if (/^https?:\/\/(www\.)?github\.com\/[^\/]+\/[^\/]+(\/|$|#|\?)/i.test(href)) {
              return (
                <GithubRepoTooltip href={href} {...props}>
                  {children}
                </GithubRepoTooltip>
              );
            }
            if (/\.(mmd|mermaid)$/i.test(href)) {
              return (
                <MermaidPreviewLink href={href} {...props}>
                  {children}
                </MermaidPreviewLink>
              );
            }
            return (
              <ImagePreviewLink href={href} {...props}>
                {children}
              </ImagePreviewLink>
            );
          },
          code({ inline, className, children, ...props }) {
            if (className === 'language-mermaid') return <Mermaid />;
            if (editableDiagrams && className === 'language-mermaid-edit')
              return <EditableMermaid />;
            return (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownViewer;
