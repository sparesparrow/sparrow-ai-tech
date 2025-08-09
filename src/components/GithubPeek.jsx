import { useEffect, useMemo, useState } from 'react';

export default function GithubPeek({ onPickMermaid }) {
  const [repo, setRepo] = useState('sparesparrow/sparrow-ai-tech');
  const [mode, setMode] = useState('readme'); // 'readme' | 'actions'
  const [content, setContent] = useState('');
  const [workflows, setWorkflows] = useState([]);
  const [selectedWorkflow, setSelectedWorkflow] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const mermaidBlocks = useMemo(() => {
    if (!content) return [];
    const blocks = [];
    const re = /```\s*mermaid\s+([\s\S]*?)```/gi;
    let m;
    while ((m = re.exec(content)) !== null) {
      blocks.push(m[1].trim());
    }
    return blocks;
  }, [content]);

  useEffect(() => {
    let aborted = false;
    async function run() {
      setError('');
      setLoading(true);
      try {
        if (mode === 'readme') {
          const url = `https://raw.githubusercontent.com/${repo}/HEAD/README.md`;
          const res = await fetch(url);
          if (!res.ok) throw new Error(`Failed to load README: ${res.status}`);
          const text = await res.text();
          if (!aborted) setContent(text);
        } else {
          // actions
          const wf = await fetch(`https://api.github.com/repos/${repo}/actions/workflows`);
          if (!wf.ok) throw new Error(`Failed to list workflows: ${wf.status}`);
          const data = await wf.json();
          if (!aborted) setWorkflows(data.workflows || []);
          setContent('');
        }
      } catch (e) {
        if (!aborted) setError(e.message || String(e));
      } finally {
        if (!aborted) setLoading(false);
      }
    }
    run();
    return () => {
      aborted = true;
    };
  }, [repo, mode]);

  async function loadWorkflowById(id) {
    setLoading(true);
    setError('');
    try {
      const wf = workflows.find((w) => w.id === Number(id));
      if (!wf) return;
      const resp = await fetch(wf.url, { headers: { Accept: 'application/vnd.github+json' } });
      if (!resp.ok) throw new Error(`Failed to load workflow: ${resp.status}`);
      const json = await resp.json();
      if (json.path) {
        const raw = `https://raw.githubusercontent.com/${repo}/HEAD/${json.path}`;
        const rawResp = await fetch(raw);
        if (!rawResp.ok) throw new Error(`Failed to load raw workflow: ${rawResp.status}`);
        const text = await rawResp.text();
        setContent(text);
      }
    } catch (e) {
      setError(e.message || String(e));
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="cyber-card" style={{ marginBottom: '1rem' }}>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
        <input
          value={repo}
          onChange={(e) => setRepo(e.target.value)}
          placeholder="owner/name"
          className="form-control"
          style={{ maxWidth: 320 }}
        />
        <select
          value={mode}
          onChange={(e) => setMode(e.target.value)}
          className="form-control"
          style={{ maxWidth: 160 }}
        >
          <option value="readme">README.md</option>
          <option value="actions">GitHub Actions</option>
        </select>
        {mode === 'actions' && workflows.length > 0 && (
          <select
            value={selectedWorkflow}
            onChange={(e) => {
              setSelectedWorkflow(e.target.value);
              loadWorkflowById(e.target.value);
            }}
            className="form-control"
            style={{ maxWidth: 260 }}
          >
            <option value="">Select workflow</option>
            {workflows.map((w) => (
              <option key={w.id} value={w.id}>
                {w.name} ({w.state})
              </option>
            ))}
          </select>
        )}
      </div>

      {loading && <div style={{ marginTop: 12 }}>Loading…</div>}
      {error && (
        <div style={{ marginTop: 12, color: 'var(--color-cyber-orange)' }}>Error: {error}</div>
      )}

      {mode === 'readme' && content && (
        <div style={{ marginTop: 12 }}>
          <div style={{ marginBottom: 8, color: 'var(--color-cyber-text-dim)' }}>
            Found {mermaidBlocks.length} mermaid block(s) in README
          </div>
          <div style={{ display: 'grid', gap: 12 }}>
            {mermaidBlocks.map((block, idx) => (
              <div key={idx} className="cyber-card">
                <pre style={{ whiteSpace: 'pre-wrap' }}>{block}</pre>
                <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
                  <button className="cyber-btn cyber-btn-primary" onClick={() => onPickMermaid?.(block)}>
                    Use in editor
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {mode === 'actions' && content && (
        <div style={{ marginTop: 12 }}>
          <pre style={{ maxHeight: 300, overflow: 'auto' }}>{content}</pre>
        </div>
      )}
    </section>
  );
}
