const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["_astro/mermaid.core.B7cF0BWW.js","_astro/preload-helper.CTPbUAur.js","_astro/_commonjsHelpers.CqkleIqs.js"])))=>i.map(i=>d[i]);
import{_ as R}from"./preload-helper.CTPbUAur.js";import{j as e}from"./jsx-runtime.ByzIxTkC.js";import{r as t}from"./index.KtlXxVVf.js";import"./_commonjsHelpers.CqkleIqs.js";function A({onPickMermaid:w}){const[i,C]=t.useState("sparesparrow/sparrow-ai-tech"),[p,s]=t.useState("readme"),[d,c]=t.useState(""),[g,x]=t.useState([]),[k,y]=t.useState(""),[E,b]=t.useState(!1),[v,u]=t.useState(""),S=t.useMemo(()=>{if(!d)return[];const r=[],n=/```\s*mermaid\s+([\s\S]*?)```/gi;let o;for(;(o=n.exec(d))!==null;)r.push(o[1].trim());return r},[d]);t.useEffect(()=>{let r=!1;async function n(){u(""),b(!0);try{if(p==="readme"){const o=`https://raw.githubusercontent.com/${i}/HEAD/README.md`,m=await fetch(o);if(!m.ok)throw new Error(`Failed to load README: ${m.status}`);const h=await m.text();r||c(h)}else{const o=await fetch(`https://api.github.com/repos/${i}/actions/workflows`);if(!o.ok)throw new Error(`Failed to list workflows: ${o.status}`);const m=await o.json();r||x(m.workflows||[]),c("")}}catch(o){r||u(o.message||String(o))}finally{r||b(!1)}}return n(),()=>{r=!0}},[i,p]);async function D(r){b(!0),u("");try{const n=g.find(h=>h.id===Number(r));if(!n)return;const o=await fetch(n.url,{headers:{Accept:"application/vnd.github+json"}});if(!o.ok)throw new Error(`Failed to load workflow: ${o.status}`);const m=await o.json();if(m.path){const h=`https://raw.githubusercontent.com/${i}/HEAD/${m.path}`,j=await fetch(h);if(!j.ok)throw new Error(`Failed to load raw workflow: ${j.status}`);const N=await j.text();c(N)}}catch(n){u(n.message||String(n))}finally{b(!1)}}return e.jsxs("section",{className:"cyber-card",style:{marginBottom:"1rem"},children:[e.jsxs("div",{style:{display:"flex",gap:8,alignItems:"center",flexWrap:"wrap"},children:[e.jsx("input",{value:i,onChange:r=>C(r.target.value),placeholder:"owner/name",className:"form-control",style:{maxWidth:320}}),e.jsxs("select",{value:p,onChange:r=>s(r.target.value),className:"form-control",style:{maxWidth:160},children:[e.jsx("option",{value:"readme",children:"README.md"}),e.jsx("option",{value:"actions",children:"GitHub Actions"})]}),p==="actions"&&g.length>0&&e.jsxs("select",{value:k,onChange:r=>{y(r.target.value),D(r.target.value)},className:"form-control",style:{maxWidth:260},children:[e.jsx("option",{value:"",children:"Select workflow"}),g.map(r=>e.jsxs("option",{value:r.id,children:[r.name," (",r.state,")"]},r.id))]})]}),E&&e.jsx("div",{style:{marginTop:12},children:"Loading…"}),v&&e.jsxs("div",{style:{marginTop:12,color:"var(--color-cyber-orange)"},children:["Error: ",v]}),p==="readme"&&d&&e.jsxs("div",{style:{marginTop:12},children:[e.jsxs("div",{style:{marginBottom:8,color:"var(--color-cyber-text-dim)"},children:["Found ",S.length," mermaid block(s) in README"]}),e.jsx("div",{style:{display:"grid",gap:12},children:S.map((r,n)=>e.jsxs("div",{className:"cyber-card",children:[e.jsx("pre",{style:{whiteSpace:"pre-wrap"},children:r}),e.jsx("div",{style:{display:"flex",gap:8,marginTop:8},children:e.jsx("button",{className:"cyber-btn cyber-btn-primary",onClick:()=>w?.(r),children:"Use in editor"})})]},n))})]}),p==="actions"&&d&&e.jsx("div",{style:{marginTop:12},children:e.jsx("pre",{style:{maxHeight:300,overflow:"auto"},children:d})})]})}const T=`graph TD
  A[Start] --> B{Choice?};
  B -->|Yes| C[Happy Path];
  B -->|No| D[Alternative Path];
  C --> E[Success];
  D --> F[Handle Error];
  
  style A fill:#e1f5fe
  style C fill:#e8f5e8
  style D fill:#fff3e0
  style E fill:#f1f8e9
  style F fill:#fce4ec`,M={Flowchart:`graph TD
    A[Start] --> B{Decision?};
    B -->|Yes| C[Action 1];
    B -->|No| D[Action 2];
    C --> E[End];
    D --> E;`,Sequence:`sequenceDiagram
    participant User
    participant System
    participant Database
    
    User->>System: Request Data
    System->>Database: Query
    Database-->>System: Results
    System-->>User: Response`,Class:`classDiagram
    class Animal {
      +String name
      +move()
    }
    class Dog {
      +bark()
    }
    class Bird {
      +fly()
    }
    Animal <|-- Dog
    Animal <|-- Bird`,Gantt:`gantt
    title Project Timeline
    dateFormat  YYYY-MM-DD
    section Phase 1
    Planning    :plan, 2024-01-01, 30d
    Design      :design, after plan, 20d
    section Phase 2
    Development :dev, after design, 45d
    Testing     :test, after dev, 15d`};function P({initialCode:w=T,readOnly:i=!1,className:C="",onCodeChange:p=null}){const[s,d]=t.useState(w),[c,g]=t.useState(""),[x,k]=t.useState(""),[y,E]=t.useState(!1),[b,v]=t.useState(""),u=t.useRef(null),S=t.useRef(0),D=t.useRef(null);t.useEffect(()=>{let a=!0;return R(async()=>{const{default:l}=await import("./mermaid.core.B7cF0BWW.js").then(f=>f.bB);return{default:l}},__vite__mapDeps([0,1,2])).then(({default:l})=>{a&&(l.initialize({startOnLoad:!1,theme:"default",flowchart:{useMaxWidth:!0,htmlLabels:!0,curve:"basis"},themeVariables:{primaryColor:"#4facfe",primaryTextColor:"#333",primaryBorderColor:"#007bff",lineColor:"#666",secondaryColor:"#f8f9fa",tertiaryColor:"#e9ecef"}}),u.current=l,r(s))}),()=>{a=!1}},[]),t.useEffect(()=>{const a=setTimeout(()=>{s!==w&&(r(s),p?.(s))},500);return()=>clearTimeout(a)},[s,w,p]);const r=t.useCallback(async a=>{if(!(!a.trim()||!u.current)){E(!0),k("");try{const l=`mermaid-${++S.current}`,{svg:f}=await u.current.render(l,a);g(f)}catch(l){k(l.message),g("")}finally{E(!1)}}},[]),n=t.useCallback(a=>{i||d(a.target.value)},[i]),o=t.useCallback(a=>{if(!i){const l=M[a];d(l),v(a)}},[i]),m=t.useCallback(()=>{!i&&window.confirm("Are you sure you want to clear the editor?")&&(d(""),v(""))},[i]),h=t.useCallback(async()=>{try{await navigator.clipboard.writeText(s)}catch(a){console.error("Failed to copy:",a)}},[s]),j=t.useCallback(()=>{if(c){const a=new Blob([c],{type:"image/svg+xml"}),l=URL.createObjectURL(a),f=document.createElement("a");f.href=l,f.download="mermaid-diagram.svg",document.body.appendChild(f),f.click(),document.body.removeChild(f),URL.revokeObjectURL(l)}},[c]),N=t.useCallback(a=>{(a.ctrlKey||a.metaKey)&&a.key==="Enter"&&(a.preventDefault(),r(s))},[s,r]);return e.jsxs("div",{className:`mermaid-editor ${C}`,children:[e.jsxs("div",{className:"mermaid-editor-header",children:[e.jsxs("div",{className:"mermaid-examples",children:[e.jsx("label",{htmlFor:"example-select",className:"sr-only",children:"Select example diagram"}),e.jsxs("select",{id:"example-select",value:b,onChange:a=>o(a.target.value),disabled:i,className:"mermaid-example-select","aria-label":"Select example diagram",children:[e.jsx("option",{value:"",children:"Choose Example..."}),Object.keys(M).map(a=>e.jsx("option",{value:a,children:a},a))]})]}),e.jsxs("div",{className:"mermaid-controls",children:[e.jsx("button",{onClick:()=>r(s),disabled:i||y,className:"mermaid-btn mermaid-btn-primary","aria-label":"Update diagram",children:y?"Updating...":"Update"}),!i&&e.jsxs(e.Fragment,{children:[e.jsx("button",{onClick:m,className:"mermaid-btn mermaid-btn-secondary","aria-label":"Clear editor",children:"Clear"}),e.jsx("button",{onClick:h,className:"mermaid-btn mermaid-btn-secondary","aria-label":"Copy code to clipboard",children:"Copy Code"})]}),c&&e.jsx("button",{onClick:j,className:"mermaid-btn mermaid-btn-secondary","aria-label":"Download SVG",children:"Download SVG"})]})]}),e.jsxs("div",{className:"mermaid-editor-grid",children:[e.jsxs("div",{className:"mermaid-editor-panel",children:[e.jsxs("div",{className:"mermaid-panel-header",children:[e.jsx("span",{className:"mermaid-panel-icon",children:"⚡"}),"Mermaid Source Code"]}),e.jsx("div",{className:"mermaid-editor-content",children:e.jsx("textarea",{ref:D,value:s,onChange:n,onKeyDown:N,disabled:i,className:"mermaid-textarea",placeholder:"Enter your Mermaid diagram code here...","aria-label":"Mermaid diagram code",rows:15})})]}),e.jsxs("div",{className:"mermaid-preview-panel",children:[e.jsxs("div",{className:"mermaid-panel-header",children:[e.jsx("span",{className:"mermaid-panel-icon",children:"🎨"}),"Live Preview"]}),e.jsx("div",{className:"mermaid-preview-content",children:y?e.jsxs("div",{className:"mermaid-loading",children:[e.jsx("div",{className:"mermaid-spinner"}),e.jsx("span",{children:"Rendering diagram..."})]}):x?e.jsxs("div",{className:"mermaid-error",children:[e.jsx("strong",{children:"Syntax Error:"}),e.jsx("pre",{children:x})]}):c?e.jsx("div",{className:"mermaid-diagram-container",dangerouslySetInnerHTML:{__html:c}}):e.jsx("div",{className:"mermaid-empty",children:"Enter Mermaid code to see preview"})})]})]}),x&&e.jsxs("div",{className:"mermaid-error-banner",role:"alert",children:[e.jsx("strong",{children:"Diagram Error:"})," ",x]}),!i&&e.jsx("div",{className:"mermaid-github-peek",children:e.jsx(A,{onPickMermaid:a=>d(a)})}),e.jsx("style",{jsx:!0,children:`
        .mermaid-editor {
          background: white;
          border-radius: 12px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          overflow: hidden;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        .mermaid-editor-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem 1.5rem;
          background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
          color: white;
        }

        .mermaid-examples {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .mermaid-example-select {
          padding: 0.5rem;
          border: none;
          border-radius: 6px;
          background: rgba(255, 255, 255, 0.9);
          color: #333;
          font-size: 0.875rem;
          cursor: pointer;
        }

        .mermaid-controls {
          display: flex;
          gap: 0.5rem;
        }

        .mermaid-btn {
          padding: 0.5rem 1rem;
          border: none;
          border-radius: 6px;
          font-size: 0.875rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
          background: rgba(255, 255, 255, 0.9);
          color: #333;
        }

        .mermaid-btn:hover:not(:disabled) {
          background: white;
          transform: translateY(-1px);
        }

        .mermaid-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .mermaid-btn-primary {
          background: #007bff;
          color: white;
        }

        .mermaid-btn-primary:hover:not(:disabled) {
          background: #0056b3;
        }

        .mermaid-editor-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0;
          height: 600px;
        }

        .mermaid-editor-panel,
        .mermaid-preview-panel {
          display: flex;
          flex-direction: column;
          border-right: 1px solid #e9ecef;
        }

        .mermaid-preview-panel {
          border-right: none;
        }

        .mermaid-panel-header {
          padding: 1rem 1.5rem;
          background: #f8f9fa;
          border-bottom: 1px solid #e9ecef;
          font-weight: 600;
          font-size: 1rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .mermaid-panel-icon {
          font-size: 1.2rem;
        }

        .mermaid-editor-content {
          flex: 1;
          padding: 0;
        }

        .mermaid-textarea {
          width: 100%;
          height: 100%;
          border: none;
          padding: 1.5rem;
          font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
          font-size: 14px;
          line-height: 1.5;
          resize: none;
          outline: none;
          background: #f8f9fa;
          color: #333;
        }

        .mermaid-textarea:focus {
          background: white;
        }

        .mermaid-textarea:disabled {
          background: #f1f3f4;
          color: #666;
          cursor: not-allowed;
        }

        .mermaid-preview-content {
          flex: 1;
          padding: 1.5rem;
          overflow: auto;
          background: #fafafa;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .mermaid-diagram-container {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: white;
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          padding: 1rem;
        }

        .mermaid-diagram-container svg {
          max-width: 100%;
          height: auto;
        }

        .mermaid-loading {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
          color: #666;
        }

        .mermaid-spinner {
          width: 2rem;
          height: 2rem;
          border: 3px solid #f3f3f3;
          border-top: 3px solid #4facfe;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        .mermaid-error {
          color: #dc3545;
          background: #f8d7da;
          padding: 1rem;
          border-radius: 6px;
          border: 1px solid #f5c6cb;
        }

        .mermaid-error pre {
          margin: 0.5rem 0 0 0;
          font-size: 0.875rem;
          white-space: pre-wrap;
        }

        .mermaid-empty {
          color: #666;
          font-style: italic;
          text-align: center;
        }

        .mermaid-error-banner {
          background: #f8d7da;
          color: #721c24;
          padding: 1rem 1.5rem;
          border-top: 1px solid #f5c6cb;
          font-size: 0.875rem;
        }

        .mermaid-github-peek {
          border-top: 1px solid #e9ecef;
          padding: 1rem 1.5rem;
          background: #f8f9fa;
        }

        .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border: 0;
        }

        @media (max-width: 768px) {
          .mermaid-editor-grid {
            grid-template-columns: 1fr;
            height: auto;
          }

          .mermaid-editor-panel,
          .mermaid-preview-panel {
            border-right: none;
            border-bottom: 1px solid #e9ecef;
          }

          .mermaid-preview-panel {
            border-bottom: none;
          }

          .mermaid-editor-header {
            flex-direction: column;
            gap: 1rem;
            align-items: stretch;
          }

          .mermaid-controls {
            justify-content: center;
            flex-wrap: wrap;
          }
        }
      `})]})}export{P as default};
