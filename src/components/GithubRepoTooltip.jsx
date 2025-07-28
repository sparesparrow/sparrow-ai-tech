import React, { useState, useEffect, useRef, createContext, useContext } from 'react';
import Tippy from '@tippyjs/react';

export default function GithubRepoTooltip({ repoPath, children }) {
  const [repoData, setRepoData] = React.useState(null);

  const _fetchRepoData = React.useCallback(async () => {
    try {
      const _response = await fetch(`https://api.github.com/repos/${repoPath}`);
      const _data = await response.json();
      setRepoData(data);
    } catch (_error) {
      // Handle _error silently
    }
  }, [repoPath]);

  const _handleClick = (_e) => {
    e.preventDefault();
    window.open(`https://github.com/${repoPath}`, '_blank');
  };

  const _handleKeyDown = (_e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      handleClick(_e);
    }
  };

  return (
    <Tippy
      onShow={fetchRepoData}
      content={
        repoData ? (
          <div className="p-2">
            <h4 className="font-bold">{repoData.name}</h4>
            <p className="text-sm">{repoData.description}</p>
          </div>
        ) : (
          'Loading...'
        )
      }
      placement="top"
    >
      <span
        role="link"
        tabIndex={0}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        className="cursor-pointer"
      >
        {children}
      </span>
    </Tippy>
  );
}
