import { Tooltip } from "react-tooltip";

const isMermaidFile = (url) => /\.(mmd|mermaid)$/i.test(url);

const MermaidPreviewLink = ({ href, children, ...props }) => {
  if (isMermaidFile(href)) {
    return (
      <Tooltip
        className="text-sm"
        // Use a custom content for Mermaid files
        // This will show a tooltip when hovering over the link
        // indicating that Mermaid diagrams are not supported
        // in the preview mode
        // This is useful for links that point to Mermaid files
        // so that users know they cannot preview them
        // and need to open them in a new tab
        // or download them to view
        // This is a workaround for the fact that Mermaid diagrams
        // are not supported in the preview mode
        // and will not render correctly
        content={
          <span style={{ color: "red" }}>
            Mermaid diagrams are not supported.
          </span>
        }
        interactive={true}
        maxWidth={400}
        placement="top"
      >
        <a href={href} target="blank" rel="noopener noreferrer" {...props}>
          {children}
        </a>
      </Tooltip>
    );
  }
  return (
    <a href={href} target="blank" rel="noopener noreferrer" {...props}>
      {children}
    </a>
  );
};

export default MermaidPreviewLink;
