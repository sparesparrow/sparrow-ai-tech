import React, { useEffect, useRef, useState } from 'react';

const DEFAULT_MERMAID = `graph TD
  A[Start] --> B[Choice];
  B -->|Yes| C[Happy];
  B -->|No| D[Sad];`;

const MermaidLiveEditor = () => {
  const [code, setCode] = useState(DEFAULT_MERMAID);
  const [svg, setSvg] = useState('');
  const [error, setError] = useState('');
  const mermaidRef = useRef(null);
  const idRef = useRef(0);

  // Dynamic import Mermaid
  useEffect(() => {
    let active = true;

    import('mermaid')
      .then(({ default: mermaid }) => {
        if (!active) return;
        mermaid.initialize({ startOnLoad: false });
        mermaidRef.current = mermaid;
        render(code);
      })
      .catch((err) => {
        if (active) {
          setError(`Failed to load Mermaid: ${err.message}`);
        }
      });

    return () => {
      active = false;
    };
  }, []);

  // Debounce rendering
  useEffect(() => {
    const timer = setTimeout(() => render(code), 400);
    return () => clearTimeout(timer);
  }, [code]);

  async function render(text) {
    if (!text.trim() || !mermaidRef.current) return;

    try {
      const id = `mermaid-${++idRef.current}`;
      const { svg } = await mermaidRef.current.render(id, text);
      setSvg(svg);
      setError('');
    } catch (err) {
      setError(err.message);
      setSvg('');
    }
  }

  return (
    <section className="grid grid-cols-1 gap-6 md:grid-cols-2">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Mermaid Code</h3>
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="h-80 w-full rounded border border-gray-300 p-4 font-mono text-sm focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-800"
          placeholder="Enter Mermaid diagram code..."
        />
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Preview</h3>
        <div className="h-80 overflow-auto rounded border border-gray-300 bg-white p-4 dark:border-gray-600 dark:bg-gray-800">
          {svg && <div dangerouslySetInnerHTML={{ __html: svg }} />}
          {error && <pre className="text-sm text-red-600 dark:text-red-400">{error}</pre>}
          {!svg && !error && (
            <div className="flex h-full items-center justify-center text-gray-500">
              Loading preview...
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

MermaidLiveEditor.displayName = 'MermaidLiveEditor';

export default MermaidLiveEditor;
