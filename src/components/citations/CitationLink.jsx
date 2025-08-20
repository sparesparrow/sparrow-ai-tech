import React from 'react';

const CitationLink = ({ refId, number, children }) => {
  return (
    <span className="citation-inline">
      {children && <span>{children}</span>}
      <sup className="ml-1">
        <a 
          href={`#ref-${refId}`}
          className="text-cyber-orange hover:text-cyber-blue transition-colors duration-200 text-xs no-underline"
          onClick={(e) => {
            e.preventDefault();
            const element = document.getElementById(`ref-${refId}`);
            if (element) {
              element.scrollIntoView({ behavior: 'smooth' });
            }
          }}
        >
          [{number}]
        </a>
      </sup>
    </span>
  );
};

export default CitationLink;
