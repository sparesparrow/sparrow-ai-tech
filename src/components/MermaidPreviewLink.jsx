import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

const isMermaidFile = (url) => /\.(mmd|mermaid)$/i.test(url);

const MermaidPreviewLink = ({ href, children, ...props }) => {
  if (isMermaidFile(href)) {
    return (
      <Tippy
        content={<span style={{ color: 'red' }}>Mermaid diagrams are not supported.</span>}
        interactive={true}
        maxWidth={400}
        placement="top"
      >
        <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
          {children}
        </a>
      </Tippy>
    );
  }
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
      {children}
    </a>
  );
};

export default MermaidPreviewLink;
