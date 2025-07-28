// Custom type definitions for modules without @types packages

declare module 'eslint-plugin-cypress' {
  const plugin: any;
  export = plugin;
}

declare module 'react-helmet' {
  import { Component } from 'react';
  
  export interface HelmetProps {
    children?: React.ReactNode;
  }
  
  export class Helmet extends Component<HelmetProps> {}
}
