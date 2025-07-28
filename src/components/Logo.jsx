import { withBase } from '../utils/base-path';

export default function Logo(props) {
  return (
    <img src={withBase('/assets/sparrow-ai-tech-favicon.png')} alt="Sparrow AI Tech" {...props} />
  );
}
