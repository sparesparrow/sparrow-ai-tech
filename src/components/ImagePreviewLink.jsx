import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

const isImageUrl = (url) => /\.(png|jpe?g|gif|svg|webp)$/i.test(url);

const ImagePreviewLink = ({ href, children, ...props }) => {
  if (isImageUrl(href)) {
    // If href is not external or already starts with /sparrow-ai-tech/, prefix it
    let imgSrc = href;
    if (!imgSrc.startsWith('http') && !imgSrc.startsWith('/sparrow-ai-tech/')) {
      imgSrc = `/sparrow-ai-tech/${imgSrc.replace(/^\/+/, '')}`;
    }
    return (
      <Tippy
        content={<img src={imgSrc} alt="preview" style={{ maxWidth: 200, maxHeight: 200 }} />}
        placement="top"
      >
        <a href={imgSrc} target="_blank" rel="noopener noreferrer" {...props}>
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

export default ImagePreviewLink;
