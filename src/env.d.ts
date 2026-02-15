/// <reference path="../.astro/types.d.ts" />

interface Window {
  mermaid?: any;
  marked?: any;
  Prism?: any;
  toggleSearch?: () => void;
}

declare var mermaid: any;
declare var marked: any;
declare var Prism: any;
