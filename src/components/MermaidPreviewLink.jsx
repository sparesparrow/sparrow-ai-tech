import React, { useState, useRef } from 'react';
import Tippy from '@tippyjs/react';
import mermaid from 'mermaid';
import 'tippy.js/dist/tippy.css';

const isMermaidFile = (url) => /\.(mmd|mermaid)$/i.test(url);

const MermaidPreviewLink = ({ href, children, ...props }) => {
  const [svg, setSvg] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const fetched = useRef(false);

  const handleShow = async () => {
    if (!isMermaidFile(href) || fetched.current) return;
    setLoading(true);
    setError(null);
    setSvg(null);
    try {
      const res = await fetch(href);
      if (!res.ok) throw new Error('Failed to fetch file');
      const text = await res.text();
      mermaid.initialize({ startOnLoad: false, theme: 'dark' });
      mermaid.render('mermaid-preview', text, (svgCode) => {
        setSvg(svgCode);
        setLoading(false);
        fetched.current = true;
      }, document.createElement('div'));
    } catch (e) {
      setError('Failed to load or render Mermaid diagram');
      setLoading(false);
      fetched.current = true;
    }
  };

  if (isMermaidFile(href)) {
    return (
      <Tippy
        content={
          loading ? 'Loading diagram...' :
          error ? <span style={{ color: 'red' }}>{error}</span> :
          svg ? <div className="mermaid-diagram" dangerouslySetInnerHTML={{ __html: svg }} /> :
          'Hover to preview Mermaid diagram'
        }
        interactive={true}
        maxWidth={400}
        onShow={handleShow}
        placement="top"
      >
        <a href={href} target="_blank" rel="noopener noreferrer" {...props}>{children}</a>
      </Tippy>
    );
  }
  return <a href={href} target="_blank" rel="noopener noreferrer" {...props}>{children}</a>;
};

export default MermaidPreviewLink; 