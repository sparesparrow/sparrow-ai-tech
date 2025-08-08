import { withBase } from '../utils/url';

export default function Logo(props) {
  return <img src={withBase('/assets/ai-hero.png')} alt="Sparrow AI Tech" {...props} />;
}
