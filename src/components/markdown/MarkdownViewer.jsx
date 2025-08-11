/* eslint-disable no-unused-vars */
import { useEffect, useState, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import MermaidPreviewLink from '../MermaidPreviewLink.jsx';
import ImagePreviewLink from '../ImagePreviewLink.jsx';
import GithubRepoTooltip from '../GithubRepoTooltip.jsx';
import MermaidLiveEditor from './MermaidLiveEditor.jsx';

// Mermaid component for static diagrams
const Mermaid = ({ children, className, ...props }) => {
  const [svg, setSvg] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const mermaidRef = useRef(null);
  const idRef = useRef(0);

  useEffect(() => {
    let active = true;
    import('mermaid').then(({ default: mermaid }) => {
      if (!active) return;

      mermaid.initialize({
        startOnLoad: false,
        theme: 'default',
        flowchart: {
          useMaxWidth: true,
          htmlLabels: true,
          curve: 'basis',
        },
      });

      mermaidRef.current = mermaid;
      renderDiagram();
    });

    return () => {
      active = false;
    };
  }, []);

  const renderDiagram = async () => {
    if (!children || !mermaidRef.current) return;

    try {
      const id = `mermaid-${++idRef.current}`;
      const { svg } = await mermaidRef.current.render(id, children);
      setSvg(svg);
      setError('');
    } catch (e) {
      setError(e.message);
      setSvg('');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="mermaid-diagram mermaid-loading">
        <div className="mermaid-spinner"></div>
        <span>Rendering diagram...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mermaid-diagram mermaid-error" role="alert">
        <strong>Diagram Error:</strong>
        <pre>{error}</pre>
      </div>
    );
  }

  return (
    <div className="mermaid-diagram">
      <div className="mermaid-diagram-container" dangerouslySetInnerHTML={{ __html: svg }} />
    </div>
  );
};

// Editable Mermaid component
const EditableMermaid = ({ children, ...props }) => {
  return (
    <div className="mermaid-editable">
      <MermaidLiveEditor
        initialCode={children}
        readOnly={false}
        className="mermaid-editor-embedded"
      />
    </div>
  );
};

const MarkdownViewer = ({ src, className = '', editableDiagrams = true }) => {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch(src)
      .then(res => {
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
            if (className === 'language-mermaid') {
              return <Mermaid {...props}>{children}</Mermaid>;
            }
            if (editableDiagrams && className === 'language-mermaid-edit') {
              return <EditableMermaid {...props}>{children}</EditableMermaid>;
            }
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

      <style jsx>{`
        .mermaid-diagram {
          margin: 2rem 0;
          padding: 1.5rem;
          border: 1px solid #e2e8f0;
          border-radius: 0.75rem;
          background: #fafafa;
          transition: all 0.2s ease;
        }

        .mermaid-diagram:hover {
          border-color: #cbd5e1;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
        }

        .mermaid-diagram-container {
          display: flex;
          justify-content: center;
          align-items: center;
          background: white;
          border-radius: 0.5rem;
          padding: 1rem;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }

        .mermaid-diagram-container svg {
          max-width: 100%;
          height: auto;
        }

        .mermaid-loading {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
          color: #666;
          min-height: 200px;
          justify-content: center;
        }

        .mermaid-spinner {
          width: 2rem;
          height: 2rem;
          border: 3px solid #f3f3f3;
          border-top: 3px solid #4facfe;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        .mermaid-error {
          color: #dc3545;
          background: #f8d7da;
          padding: 1rem;
          border-radius: 6px;
          border: 1px solid #f5c6cb;
        }

        .mermaid-error pre {
          margin: 0.5rem 0 0 0;
          font-size: 0.875rem;
          white-space: pre-wrap;
        }

        .mermaid-editable {
          margin: 2rem 0;
        }

        .mermaid-editor-embedded {
          border-radius: 0.75rem;
          overflow: hidden;
        }

        .markdown-viewer-loading {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 200px;
          color: #666;
          font-style: italic;
        }

        .markdown-viewer-error {
          color: #dc3545;
          background: #f8d7da;
          padding: 1rem;
          border-radius: 6px;
          border: 1px solid #f5c6cb;
          text-align: center;
        }

        @media (max-width: 768px) {
          .mermaid-diagram {
            padding: 1rem;
            margin: 1rem 0;
          }

          .mermaid-diagram-container {
            padding: 0.75rem;
          }
        }
      `}</style>
    </div>
  );
};

export default MarkdownViewer;
