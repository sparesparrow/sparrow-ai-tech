import { useEffect, useState, useRef, useCallback } from 'react';
import GithubPeek from '../GithubPeek.jsx';

const DEFAULT_MERMAID = `graph TD
  A[Start] --> B{Choice?};
  B -->|Yes| C[Happy Path];
  B -->|No| D[Alternative Path];
  C --> E[Success];
  D --> F[Handle Error];
  
  style A fill:#e1f5fe
  style C fill:#e8f5e8
  style D fill:#fff3e0
  style E fill:#f1f8e9
  style F fill:#fce4ec`;

const MERMAID_EXAMPLES = {
  Flowchart: `graph TD
    A[Start] --> B{Decision?};
    B -->|Yes| C[Action 1];
    B -->|No| D[Action 2];
    C --> E[End];
    D --> E;`,

  Sequence: `sequenceDiagram
    participant User
    participant System
    participant Database
    
    User->>System: Request Data
    System->>Database: Query
    Database-->>System: Results
    System-->>User: Response`,

  Class: `classDiagram
    class Animal {
      +String name
      +move()
    }
    class Dog {
      +bark()
    }
    class Bird {
      +fly()
    }
    Animal <|-- Dog
    Animal <|-- Bird`,

  Gantt: `gantt
    title Project Timeline
    dateFormat  YYYY-MM-DD
    section Phase 1
    Planning    :plan, 2024-01-01, 30d
    Design      :design, after plan, 20d
    section Phase 2
    Development :dev, after design, 45d
    Testing     :test, after dev, 15d`,
};

export default function MermaidLiveEditor({
  initialCode = DEFAULT_MERMAID,
  readOnly = false,
  className = '',
  onCodeChange = null,
}) {
  const [code, setCode] = useState(initialCode);
  const [svg, setSvg] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedExample, setSelectedExample] = useState('');
  const mermaidRef = useRef(null);
  const idRef = useRef(0);
  const textareaRef = useRef(null);

  // Initialize Mermaid
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
        themeVariables: {
          primaryColor: '#4facfe',
          primaryTextColor: '#333',
          primaryBorderColor: '#007bff',
          lineColor: '#666',
          secondaryColor: '#f8f9fa',
          tertiaryColor: '#e9ecef',
        },
      });

      mermaidRef.current = mermaid;
      render(code);
    });

    return () => {
      active = false;
    };
  }, []);

  // Debounced rendering
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (code !== initialCode) {
        render(code);
        onCodeChange?.(code);
      }
    }, 500);

    return () => clearTimeout(timeout);
  }, [code, initialCode, onCodeChange]);

  const render = useCallback(async text => {
    if (!text.trim() || !mermaidRef.current) return;

    setIsLoading(true);
    setError('');

    try {
      const id = `mermaid-${++idRef.current}`;
      const { svg } = await mermaidRef.current.render(id, text);
      setSvg(svg);
    } catch (e) {
      setError(e.message);
      setSvg('');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleCodeChange = useCallback(
    e => {
      if (!readOnly) {
        setCode(e.target.value);
      }
    },
    [readOnly]
  );

  const handleExampleSelect = useCallback(
    exampleKey => {
      if (!readOnly) {
        const exampleCode = MERMAID_EXAMPLES[exampleKey];
        setCode(exampleCode);
        setSelectedExample(exampleKey);
      }
    },
    [readOnly]
  );

  const clearEditor = useCallback(() => {
    if (!readOnly && window.confirm('Are you sure you want to clear the editor?')) {
      setCode('');
      setSelectedExample('');
    }
  }, [readOnly]);

  const copyToClipboard = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(code);
      // Could add a toast notification here
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  }, [code]);

  const downloadSVG = useCallback(() => {
    if (svg) {
      const blob = new Blob([svg], { type: 'image/svg+xml' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'mermaid-diagram.svg';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  }, [svg]);

  const handleKeyDown = useCallback(
    e => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        render(code);
      }
    },
    [code, render]
  );

  return (
    <div className={`mermaid-editor ${className}`}>
      {/* Header with examples and controls */}
      <div className="mermaid-editor-header">
        <div className="mermaid-examples">
          <label htmlFor="example-select" className="sr-only">
            Select example diagram
          </label>
          <select
            id="example-select"
            value={selectedExample}
            onChange={e => handleExampleSelect(e.target.value)}
            disabled={readOnly}
            className="mermaid-example-select"
            aria-label="Select example diagram"
          >
            <option value="">Choose Example...</option>
            {Object.keys(MERMAID_EXAMPLES).map(key => (
              <option key={key} value={key}>
                {key}
              </option>
            ))}
          </select>
        </div>

        <div className="mermaid-controls">
          <button
            onClick={() => render(code)}
            disabled={readOnly || isLoading}
            className="mermaid-btn mermaid-btn-primary"
            aria-label="Update diagram"
          >
            {isLoading ? 'Updating...' : 'Update'}
          </button>

          {!readOnly && (
            <>
              <button
                onClick={clearEditor}
                className="mermaid-btn mermaid-btn-secondary"
                aria-label="Clear editor"
              >
                Clear
              </button>
              <button
                onClick={copyToClipboard}
                className="mermaid-btn mermaid-btn-secondary"
                aria-label="Copy code to clipboard"
              >
                Copy Code
              </button>
            </>
          )}

          {svg && (
            <button
              onClick={downloadSVG}
              className="mermaid-btn mermaid-btn-secondary"
              aria-label="Download SVG"
            >
              Download SVG
            </button>
          )}
        </div>
      </div>

      {/* Main editor grid */}
      <div className="mermaid-editor-grid">
        {/* Code editor panel */}
        <div className="mermaid-editor-panel">
          <div className="mermaid-panel-header">
            <span className="mermaid-panel-icon">⚡</span>
            Mermaid Source Code
          </div>
          <div className="mermaid-editor-content">
            <textarea
              ref={textareaRef}
              value={code}
              onChange={handleCodeChange}
              onKeyDown={handleKeyDown}
              disabled={readOnly}
              className="mermaid-textarea"
              placeholder="Enter your Mermaid diagram code here..."
              aria-label="Mermaid diagram code"
              rows={15}
            />
          </div>
        </div>

        {/* Preview panel */}
        <div className="mermaid-preview-panel">
          <div className="mermaid-panel-header">
            <span className="mermaid-panel-icon">🎨</span>
            Live Preview
          </div>
          <div className="mermaid-preview-content">
            {isLoading ? (
              <div className="mermaid-loading">
                <div className="mermaid-spinner"></div>
                <span>Rendering diagram...</span>
              </div>
            ) : error ? (
              <div className="mermaid-error">
                <strong>Syntax Error:</strong>
                <pre>{error}</pre>
              </div>
            ) : svg ? (
              <div
                className="mermaid-diagram-container"
                dangerouslySetInnerHTML={{ __html: svg }}
              />
            ) : (
              <div className="mermaid-empty">Enter Mermaid code to see preview</div>
            )}
          </div>
        </div>
      </div>

      {/* Error display */}
      {error && (
        <div className="mermaid-error-banner" role="alert">
          <strong>Diagram Error:</strong> {error}
        </div>
      )}

      {/* GithubPeek integration */}
      {!readOnly && (
        <div className="mermaid-github-peek">
          <GithubPeek onPickMermaid={block => setCode(block)} />
        </div>
      )}

      <style jsx>{`
        .mermaid-editor {
          background: white;
          border-radius: 12px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          overflow: hidden;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        .mermaid-editor-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem 1.5rem;
          background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
          color: white;
        }

        .mermaid-examples {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .mermaid-example-select {
          padding: 0.5rem;
          border: none;
          border-radius: 6px;
          background: rgba(255, 255, 255, 0.9);
          color: #333;
          font-size: 0.875rem;
          cursor: pointer;
        }

        .mermaid-controls {
          display: flex;
          gap: 0.5rem;
        }

        .mermaid-btn {
          padding: 0.5rem 1rem;
          border: none;
          border-radius: 6px;
          font-size: 0.875rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
          background: rgba(255, 255, 255, 0.9);
          color: #333;
        }

        .mermaid-btn:hover:not(:disabled) {
          background: white;
          transform: translateY(-1px);
        }

        .mermaid-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .mermaid-btn-primary {
          background: #007bff;
          color: white;
        }

        .mermaid-btn-primary:hover:not(:disabled) {
          background: #0056b3;
        }

        .mermaid-editor-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0;
          height: 600px;
        }

        .mermaid-editor-panel,
        .mermaid-preview-panel {
          display: flex;
          flex-direction: column;
          border-right: 1px solid #e9ecef;
        }

        .mermaid-preview-panel {
          border-right: none;
        }

        .mermaid-panel-header {
          padding: 1rem 1.5rem;
          background: #f8f9fa;
          border-bottom: 1px solid #e9ecef;
          font-weight: 600;
          font-size: 1rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .mermaid-panel-icon {
          font-size: 1.2rem;
        }

        .mermaid-editor-content {
          flex: 1;
          padding: 0;
        }

        .mermaid-textarea {
          width: 100%;
          height: 100%;
          border: none;
          padding: 1.5rem;
          font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
          font-size: 14px;
          line-height: 1.5;
          resize: none;
          outline: none;
          background: #f8f9fa;
          color: #333;
        }

        .mermaid-textarea:focus {
          background: white;
        }

        .mermaid-textarea:disabled {
          background: #f1f3f4;
          color: #666;
          cursor: not-allowed;
        }

        .mermaid-preview-content {
          flex: 1;
          padding: 1.5rem;
          overflow: auto;
          background: #fafafa;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .mermaid-diagram-container {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: white;
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          padding: 1rem;
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

        .mermaid-empty {
          color: #666;
          font-style: italic;
          text-align: center;
        }

        .mermaid-error-banner {
          background: #f8d7da;
          color: #721c24;
          padding: 1rem 1.5rem;
          border-top: 1px solid #f5c6cb;
          font-size: 0.875rem;
        }

        .mermaid-github-peek {
          border-top: 1px solid #e9ecef;
          padding: 1rem 1.5rem;
          background: #f8f9fa;
        }

        .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border: 0;
        }

        @media (max-width: 768px) {
          .mermaid-editor-grid {
            grid-template-columns: 1fr;
            height: auto;
          }

          .mermaid-editor-panel,
          .mermaid-preview-panel {
            border-right: none;
            border-bottom: 1px solid #e9ecef;
          }

          .mermaid-preview-panel {
            border-bottom: none;
          }

          .mermaid-editor-header {
            flex-direction: column;
            gap: 1rem;
            align-items: stretch;
          }

          .mermaid-controls {
            justify-content: center;
            flex-wrap: wrap;
          }
        }
      `}</style>
    </div>
  );
}
