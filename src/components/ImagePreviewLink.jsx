import React from 'react';

const ImagePreviewLink = ({ href, title, children, className = "" }) => {
  return (
    <div className={`image-preview-container ${className}`} title={title}>
      <a href={href} target="_blank" rel="noopener noreferrer" className="image-preview-link">
        {children}
      </a>
      <style jsx>{`
        .image-preview-container {
          position: relative;
          display: inline-block;
        }

        .image-preview-link {
          color: var(--color-cyber-blue);
          text-decoration: none;
          border-bottom: 1px dashed var(--color-cyber-blue);
          transition: all 0.3s ease;
        }

        .image-preview-link:hover {
          color: var(--color-cyber-green);
          border-color: var(--color-cyber-green);
          text-shadow: 0 0 5px var(--color-cyber-green);
        }

        .image-preview-container:hover::after {
          content: attr(title);
          position: absolute;
          bottom: 100%;
          left: 50%;
          transform: translateX(-50%);
          background: var(--color-cyber-bg);
          color: var(--color-cyber-text);
          padding: 0.5rem;
          border: 1px solid var(--color-cyber-green);
          border-radius: 4px;
          font-size: 0.8rem;
          white-space: nowrap;
          z-index: 1000;
          margin-bottom: 5px;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
        }
      `}</style>
    </div>
  );
};

export default ImagePreviewLink;
