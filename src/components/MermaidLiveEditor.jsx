 
import React, { useEffect, useState, useRef } from 'react';

const DEFAULT_MERMAID = `graph TD
  A[Start] --> B[Choice];
  B -->|Yes| C[Happy];
  B -->|No| D[Sad];`;

export default function MermaidLiveEditor() {
  const [code, setCode] = useState(DEFAULT_MERMAID);
  const [svg, setSvg] = useState('');
  const [error, setError] = useState('');
  const mermaidRef = useRef(null);
  const idRef = useRef(0);

  // Dynamický import Mermaid
  useEffect(() => {
    let active = true;
    import('mermaid').then(({ default: mermaid }) => {
      if (!active) return;
      mermaid.initialize({ startOnLoad: false });
      mermaidRef.current = mermaid;
      render(code);
    });
    return () => {
      active = false;
    };
  }, []);

  // Debounce rendering
  useEffect(() => {
    const t = setTimeout(() => render(code), 400);
    return () => clearTimeout(t);
  }, [code]);

  async function render(text) {
    if (!text.trim() || !mermaidRef.current) return;
    try {
      const id = `m-${++idRef.current}`;
      const { svg } = await mermaidRef.current.render(id, text);
      setSvg(svg);
      setError('');
    } catch (e) {
      setError(e.message);
      setSvg('');
    }
  }

  return (
    <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        style={{ minHeight: 300, fontFamily: 'monospace' }}
      />
      <div dangerouslySetInnerHTML={{ __html: svg }} />
      {error && <pre style={{ color: 'red' }}>{error}</pre>}
    </section>
  );
}
