import React, { useState } from 'react';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

const isGithubRepoUrl = (url) => {
  const match = url.match(/^https?:\/\/(www\.)?github\.com\/([^\/]+)\/([^\/]+)(\/?$|#|\?)/i);
  return match ? { owner: match[2], repo: match[3] } : null;
};

const GithubRepoTooltip = ({ href, children, ...props }) => {
  const repoInfo = isGithubRepoUrl(href);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchRepo = async () => {
    if (!repoInfo || data || loading) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`https://api.github.com/repos/${repoInfo.owner}/${repoInfo.repo}`);
      if (!res.ok) throw new Error('Failed to fetch repo');
      const json = await res.json();
      setData(json);
    } catch (e) {
      setError('Failed to load repo metadata');
    } finally {
      setLoading(false);
    }
  };

  if (repoInfo) {
    return (
      <Tippy
        content={
          loading ? 'Loading repo...' :
          error ? <span style={{ color: 'red' }}>{error}</span> :
          data ? (
            <div style={{ minWidth: 220 }}>
              <strong>{data.full_name}</strong><br />
              ⭐ {data.stargazers_count} | 🍴 {data.forks_count}<br />
              {data.language && <span>📝 {data.language}<br /></span>}
              {data.open_issues_count !== undefined && <span>🐞 {data.open_issues_count} issues<br /></span>}
              {data.license && <span>📄 {data.license.spdx_id}<br /></span>}
              {data.description && <span>{data.description}<br /></span>}
              <span>👀 {data.watchers_count} watchers</span>
            </div>
          ) : 'Hover to load repo info'
        }
        interactive={true}
        maxWidth={350}
        onShow={fetchRepo}
        placement="top"
      >
        <a href={href} target="_blank" rel="noopener noreferrer" {...props}>{children}</a>
      </Tippy>
    );
  }
  return <a href={href} target="_blank" rel="noopener noreferrer" {...props}>{children}</a>;
};

export default GithubRepoTooltip; 