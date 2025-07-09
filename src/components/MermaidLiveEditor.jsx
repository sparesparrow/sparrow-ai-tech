import React, { useEffect, useRef, useState } from 'react';

const DEFAULT_MERMAID = `graph TD\n    A[Data input stream from external environment] --> B[Perception to update world model]\n    B --> C[preconscious workspace]\n    C --> D[chunks]\n    D --> E[structure building codelets]\n    E --> F[Motives]\n    F --> G[cycles to bias attentional set for controlled cognition]\n    G --> H[Spontaneously constructed Goal]\n    H --> I[active reasoning for high involvement backwards causation]\n    I --> J[scripts]\n    J --> K[goal decomposition]\n    K --> L[Care cycles as artificial conscience]\n    L --> M[Heuristic imperatives]\n    \n    N[Autobiographical Memory] --> C\n    O[Transient episodic memory] --> C\n    P[declarative memory] --> C\n    Q[multiassociative search steered by chunks] --> C\n    \n    R[Mind wandering cycle to broaden world model] --> N\n    S[event-relationship ontology] --> O\n    T[uncertainty estimation] --> P\n    U[Differentiation cycle to deepen world model] --> V[high involvement active reasoning]\n    \n    W[Careful Action cycle to impact world model] --> X[risk assessment]\n    Y[Instantiate mixed competencies team] --> Z[Personality and self]\n    Z --> AA[organizing idea]\n    AA --> F\n    \n    BB[Biology and situation] --> CC[Needs]\n    CC --> DD[Humanistic values]\n    DD --> EE[Truth Seeking]\n    EE --> L\n    \n    FF[Next focus goal / task / concept / imagination / action] --> K\n    \n    style A fill:#e1f5fe\n    style B fill:#f3e5f5\n    style C fill:#fff3e0\n    style H fill:#e8f5e8\n    style L fill:#fce4ec\n    style M fill:#f1f8e9`;

export default function MermaidLiveEditor() {
  const [code, setCode] = useState(DEFAULT_MERMAID);
  const [svg, setSvg] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const mermaidRef = useRef(null);
  const currentId = useRef(0);
  const timeoutRef = useRef();

  // Dynamic import of mermaid
  useEffect(() => {
    let isMounted = true;
    import('mermaid').then((m) => {
      if (!isMounted) return;
      mermaidRef.current = m.default;
      mermaidRef.current.initialize({
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
      renderDiagram(code);
    });
    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line
  }, []);

  // Debounced rendering
  useEffect(() => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      renderDiagram(code);
    }, 400);
    return () => clearTimeout(timeoutRef.current);
    // eslint-disable-next-line
  }, [code]);

  async function renderDiagram(diagramCode) {
    setError('');
    if (!diagramCode.trim() || !mermaidRef.current) {
      setSvg('<div style="color: #666; font-style: italic;">Enter Mermaid code to see preview</div>');
      return;
    }
    try {
      const id = `mermaid-${++currentId.current}`;
      const { svg } = await mermaidRef.current.render(id, diagramCode);
      setSvg(svg);
    } catch (err) {
      setError('Diagram syntax error: ' + (err?.message || err));
      setSvg('');
    }
  }

  function handleClear() {
    if (window.confirm('Are you sure you want to clear the editor?')) {
      setCode('');
      setSvg('<div style="color: #666; font-style: italic;">Enter Mermaid code to see preview</div>');
      setError('');
    }
  }

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1000);
    } catch (err) {
      setError('Failed to copy: ' + (err?.message || err));
    }
  }

  // Keyboard shortcut: Ctrl/Cmd+Enter to update
  function handleKeyDown(e) {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      renderDiagram(code);
    }
  }

  // Styles (inline for now, can be refactored to CSS/Tailwind later)
  const styles = {
    container: {
      maxWidth: 1400,
      margin: '0 auto',
      padding: 20,
    },
    header: {
      textAlign: 'center',
      marginBottom: 30,
      color: 'white',
    },
    h1: {
      fontSize: '2.5rem',
      marginBottom: 10,
      textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
    },
    p: {
      fontSize: '1.1rem',
      opacity: 0.9,
    },
    editorContainer: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 20,
      height: 'calc(100vh - 200px)',
    },
    panel: {
      background: 'white',
      borderRadius: 12,
      boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
    },
    panelHeader: {
      background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      color: 'white',
      padding: '15px 20px',
      fontWeight: 600,
      fontSize: '1.1rem',
      display: 'flex',
      alignItems: 'center',
      gap: 10,
    },
    editorContent: {
      flex: 1,
      padding: 0,
      display: 'flex',
      flexDirection: 'column',
    },
    textarea: {
      flex: 1,
      border: 'none',
      padding: 20,
      fontFamily: 'Monaco, Menlo, Ubuntu Mono, monospace',
      fontSize: 14,
      lineHeight: 1.5,
      resize: 'none',
      outline: 'none',
      background: '#f8f9fa',
      color: '#333',
    },
    controls: {
      padding: '15px 20px',
      background: '#f8f9fa',
      borderTop: '1px solid #e9ecef',
      display: 'flex',
      gap: 10,
    },
    btn: {
      padding: '8px 16px',
      border: 'none',
      borderRadius: 6,
      cursor: 'pointer',
      fontSize: 14,
      fontWeight: 500,
      transition: 'all 0.2s',
    },
    btnPrimary: {
      background: '#007bff',
      color: 'white',
    },
    btnPrimaryHover: {
      background: '#0056b3',
      transform: 'translateY(-1px)',
    },
    btnSecondary: {
      background: '#6c757d',
      color: 'white',
    },
    btnSecondaryHover: {
      background: '#545b62',
      transform: 'translateY(-1px)',
    },
    previewContent: {
      flex: 1,
      padding: 20,
      overflow: 'auto',
      background: '#fafafa',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    preview: {
      width: '100%',
      minHeight: 400,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'white',
      borderRadius: 8,
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    },
    error: {
      color: '#dc3545',
      background: '#f8d7da',
      padding: 10,
      borderRadius: 4,
      margin: '10px 20px',
      fontSize: 14,
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.h1}>Interactive Concept Map Editor</h1>
        <p style={styles.p}>Edit MermaidJS diagrams in real-time with live preview</p>
      </div>
      <div style={styles.editorContainer}>
        <div style={styles.panel}>
          <div style={styles.panelHeader}>⚡ Mermaid Source Code</div>
          <div style={styles.editorContent}>
            <textarea
              style={styles.textarea}
              value={code}
              onChange={e => setCode(e.target.value)}
              placeholder="Enter your Mermaid diagram code here..."
              onKeyDown={handleKeyDown}
            />
          </div>
          <div style={styles.controls}>
            <button
              style={{ ...styles.btn, ...styles.btnPrimary }}
              onClick={() => renderDiagram(code)}
            >Update Diagram</button>
            <button
              style={{ ...styles.btn, ...styles.btnSecondary }}
              onClick={handleClear}
            >Clear</button>
            <button
              style={{ ...styles.btn, ...styles.btnSecondary, background: copied ? '#28a745' : '#6c757d' }}
              onClick={handleCopy}
            >{copied ? 'Copied!' : 'Copy Code'}</button>
          </div>
          {error && <div style={styles.error}>{error}</div>}
        </div>
        <div style={styles.panel}>
          <div style={styles.panelHeader}>🎨 Live Preview</div>
          <div style={styles.previewContent}>
            <div
              style={styles.preview}
              dangerouslySetInnerHTML={{ __html: svg }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
