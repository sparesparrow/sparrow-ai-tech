import { useEffect, useMemo, useState } from 'react';

const ALL_TECH = ['C++', 'JavaScript', 'Python', 'Rust', 'MCP', 'Linux', 'Docker'];
const GITHUB_USER = 'sparesparrow';

function useStreamingText(text, enabled = true, speedMs = 16) {
  const [output, setOutput] = useState('');
  useEffect(() => {
    if (!enabled) return;
    let index = 0;
    setOutput('');
    const id = setInterval(() => {
      index += 1;
      setOutput(text.slice(0, index));
      if (index >= text.length) clearInterval(id);
    }, speedMs);
    return () => clearInterval(id);
  }, [text, enabled, speedMs]);
  return output;
}

export default function RepoGallery() {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedTech, setSelectedTech] = useState(() => {
    try {
      const raw = localStorage.getItem('selectedTech');
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('selectedTech', JSON.stringify(selectedTech));
  }, [selectedTech]);

  useEffect(() => {
    setLoading(true);
    fetch(`https://api.github.com/users/${GITHUB_USER}/repos?per_page=100&sort=updated`)
      .then((r) => {
        if (!r.ok) throw new Error('Failed to load repos');
        return r.json();
      })
      .then((data) => {
        const mapped = data.map((repo) => ({
          id: repo.id,
          name: repo.name,
          description: repo.description || '',
          url: repo.html_url,
          language: repo.language || '',
          topics: repo.topics || [],
          pushed_at: repo.pushed_at,
        }));
        setRepos(mapped);
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    if (selectedTech.length === 0) return repos;
    const techLower = selectedTech.map((t) => t.toLowerCase());
    return repos.filter((r) => {
      const fields = [r.language, ...(r.topics || []), r.name, r.description]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();
      return techLower.every((t) => fields.includes(t));
    });
  }, [repos, selectedTech]);

  const toggleTech = (tech) => {
    setSelectedTech((prev) => (prev.includes(tech) ? prev.filter((t) => t !== tech) : [...prev, tech]));
  };

  return (
    <section id="projects" className="cyber-section">
      <div className="cyber-container">
        <h2 className="cyber-section-title">GitHub Projects</h2>

        <div className="cyber-card" style={{ marginBottom: '1rem' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {ALL_TECH.map((tech) => (
              <button
                key={tech}
                onClick={() => toggleTech(tech)}
                className="cyber-btn cyber-btn-outline"
                data-cy={`tech-${tech}`}
                aria-pressed={selectedTech.includes(tech)}
                style={{
                  opacity: selectedTech.includes(tech) ? 1 : 0.7,
                  borderColor: selectedTech.includes(tech) ? 'var(--color-cyber-blue)' : undefined,
                }}
              >
                {tech}
              </button>
            ))}
            {selectedTech.length > 0 && (
              <button
                className="cyber-btn cyber-btn-outline"
                onClick={() => setSelectedTech([])}
                data-cy="tech-clear"
                style={{ marginLeft: 'auto' }}
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {loading && <div>Loading repositories...</div>}
        {error && <div style={{ color: 'var(--color-cyber-orange)' }}>Error: {error}</div>}

        <div
          className="cyber-cards-grid"
          style={{ gridAutoRows: '1fr' }}
          data-cy="repo-grid"
        >
          {filtered.map((repo) => (
            <RepoCard key={repo.id} repo={repo} highlight={selectedTech} />
          ))}
          {!loading && filtered.length === 0 && (
            <div className="cyber-card" style={{ gridColumn: '1 / -1' }}>
              No repositories match selected technologies.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function RepoCard({ repo, highlight }) {
  const title = useStreamingText(repo.name, true, 20);
  const description = useStreamingText(repo.description || '', true, 8);
  const topics = (repo.topics || []).slice(0, 6);
  return (
    <div className="cyber-card" data-cy="repo-card">
      <div className="cyber-card-title" title={repo.name}>
        {title || repo.name}
      </div>
      <div className="cyber-card-description" style={{ minHeight: '3.25rem' }}>
        {description || repo.description}
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.5rem' }}>
        {repo.language && <span className="tech-tag">{repo.language}</span>}
        {topics.map((t) => (
          <span key={t} className="feature-tag">
            {t}
          </span>
        ))}
      </div>
      <div style={{ marginTop: '1rem' }}>
        <a className="cyber-btn cyber-btn-primary" href={repo.url} target="_blank" rel="noreferrer">
          View Repo
        </a>
      </div>
    </div>
  );
}
