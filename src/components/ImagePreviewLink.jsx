import React from 'react';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

const isImageUrl = (url) => /\.(png|jpe?g|gif|svg|webp)$/i.test(url);

const ImagePreviewLink = ({ href, children, ...props }) => {
  if (isImageUrl(href)) {
    return (
      <Tippy content={<img src={href} alt="preview" style={{ maxWidth: 200, maxHeight: 200 }} />} placement="top">
        <a href={href} target="_blank" rel="noopener noreferrer" {...props}>{children}</a>
      </Tippy>
    );
  }
  return <a href={href} target="_blank" rel="noopener noreferrer" {...props}>{children}</a>;
};

export default ImagePreviewLink; 