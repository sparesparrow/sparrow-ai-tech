import { useState, useEffect, useRef } from 'react';

const GithubRepoTooltip = ({ repoUrl = 'https://github.com/sparesparrow/sparrow-ai-tech' }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [repoData, setRepoData] = useState(null);
  const [error, setError] = useState(null);
  const tooltipRef = useRef(null);

  useEffect(() => {
    if (isVisible && !repoData && !error) {
      // Extract owner and repo from URL
      const match = repoUrl.match(/github\.com\/([^\/]+)\/([^\/]+)/);
      if (match) {
        const [, owner, repo] = match;
        fetch(`https://api.github.com/repos/${owner}/${repo}`)
          .then((res) => res.json())
          .then((data) => {
            if (data.message) {
              setError(data.message);
            } else {
              setRepoData(data);
            }
          })
          .catch((err) => setError(err.message));
      }
    }
  }, [isVisible, repoData, error, repoUrl]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (tooltipRef.current && !tooltipRef.current.contains(event.target)) {
        setIsVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block" ref={tooltipRef}>
      <button
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        onClick={() => setIsVisible(!isVisible)}
        className="text-blue-600 hover:text-blue-800"
      >
        📚 Repository Info
      </button>

      {isVisible && (
        <div className="absolute z-10 mt-2 w-64 rounded-lg border border-gray-200 bg-white p-4 shadow-lg">
          {repoData ? (
            <div>
              <h3 className="text-lg font-bold">{repoData.name}</h3>
              <p className="mb-2 text-sm text-gray-600">{repoData.description}</p>
              <div className="flex justify-between text-sm">
                <span>⭐ {repoData.stargazers_count}</span>
                <span>🍴 {repoData.forks_count}</span>
                <span>{repoData.language}</span>
              </div>
            </div>
          ) : error ? (
            <div className="text-red-600">Error: {error}</div>
          ) : (
            <div>Loading repository info...</div>
          )}
        </div>
      )}
    </div>
  );
};

export default GithubRepoTooltip;
