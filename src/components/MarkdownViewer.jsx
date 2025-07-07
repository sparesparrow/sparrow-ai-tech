import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import mermaid from 'mermaid';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import MermaidPreviewLink from './MermaidPreviewLink';
import ImagePreviewLink from './ImagePreviewLink';
import GithubRepoTooltip from './GithubRepoTooltip';

// Mermaid renderer for code blocks
const Mermaid = ({ chart }) => {
  const [svg, setSvg] = useState('');
  useEffect(() => {
    mermaid.initialize({ startOnLoad: false, theme: 'dark' });
    mermaid.render('mermaid-svg', chart, (svgCode) => setSvg(svgCode));
  }, [chart]);
  return <div className="mermaid-diagram" dangerouslySetInnerHTML={{ __html: svg }} />;
};

const MarkdownViewer = ({ src, className = '' }) => {
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

  if (loading) return <div className="markdown-viewer-loading">Loading...</div>;
  if (error) return <div className="markdown-viewer-error">Error loading markdown.</div>;

  return (
    <div className={`prose prose-invert max-w-none ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={{
          a: ({ href, children, ...props }) => {
            if (/^https?:\/\/(www\.)?github\.com\/[^\/]+\/[^\/]+(\/?$|#|\?)/i.test(href)) {
              return <GithubRepoTooltip href={href} {...props}>{children}</GithubRepoTooltip>;
            }
            if (/\.(mmd|mermaid)$/i.test(href)) {
              return <MermaidPreviewLink href={href} {...props}>{children}</MermaidPreviewLink>;
            }
            return <ImagePreviewLink href={href} {...props}>{children}</ImagePreviewLink>;
          },
          code({node, inline, className, children, ...props}) {
            if (className === 'language-mermaid') {
              return <Mermaid chart={String(children).trim()} />;
            }
            return <code className={className} {...props}>{children}</code>;
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownViewer; 