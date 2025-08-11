import{j as e}from"./jsx-runtime.ByzIxTkC.js";import{r as i}from"./index.KtlXxVVf.js";import I from"./MermaidLiveEditor.DqL_Rg56.js";import"./_commonjsHelpers.CqkleIqs.js";import"./preload-helper.CTPbUAur.js";const d=JSON.parse('[{"id":1,"category":"architecture","name":"System Architecture Overview","description":"High-level system architecture showing main components and their interactions","tags":["architecture","system","overview"],"code":"graph TB\\n    subgraph \\"Client Layer\\"\\n        Web[Web Client]\\n        Mobile[Mobile App]\\n        API_Client[API Client]\\n    end\\n    \\n    subgraph \\"API Gateway\\"\\n        Gateway[API Gateway]\\n    end\\n    \\n    subgraph \\"Microservices\\"\\n        Auth[Authentication Service]\\n        User[User Service]\\n        Order[Order Service]\\n        Payment[Payment Service]\\n        Notification[Notification Service]\\n    end\\n    \\n    subgraph \\"Data Stores\\"\\n        UserDB[(User DB)]\\n        OrderDB[(Order DB)]\\n        PaymentDB[(Payment DB)]\\n        MessageQueue[Message Queue]\\n    end\\n    \\n    Web --> Gateway\\n    Mobile --> Gateway\\n    API_Client --> Gateway\\n    \\n    Gateway --> Auth\\n    Gateway --> User\\n    Gateway --> Order\\n    Gateway --> Payment\\n    \\n    Auth --> UserDB\\n    User --> UserDB\\n    Order --> OrderDB\\n    Payment --> PaymentDB\\n    \\n    Order --> MessageQueue\\n    Payment --> MessageQueue\\n    MessageQueue --> Notification\\n    \\n    style Gateway fill:#e1f5fe\\n    style Auth fill:#e8f5e8\\n    style MessageQueue fill:#fff3e0","usage":"system-overview"},{"id":2,"category":"workflow","name":"User Authentication Flow","description":"Complete user authentication and authorization workflow","tags":["authentication","workflow","security"],"code":"sequenceDiagram\\n    participant U as User\\n    participant F as Frontend\\n    participant A as Auth Service\\n    participant D as Database\\n    participant N as Notification\\n    \\n    U->>F: Login Request\\n    F->>A: Authenticate User\\n    A->>D: Verify Credentials\\n    D-->>A: User Data\\n    A->>A: Generate JWT Token\\n    A-->>F: Token + User Info\\n    F->>F: Store Token\\n    F-->>U: Redirect to Dashboard\\n    \\n    Note over U,N: User is now authenticated\\n    \\n    U->>F: Access Protected Resource\\n    F->>A: Validate Token\\n    A-->>F: Token Valid\\n    F-->>U: Show Resource\\n    \\n    Note over U,N: Token expires\\n    \\n    U->>F: Access Resource\\n    F->>A: Validate Token\\n    A-->>F: Token Invalid\\n    F-->>U: Redirect to Login","usage":"auth-flow"},{"id":3,"category":"database","name":"Database Schema","description":"Entity relationship diagram showing database structure","tags":["database","schema","er"],"code":"erDiagram\\n    USER {\\n        int id PK\\n        string username\\n        string email\\n        string password_hash\\n        datetime created_at\\n        datetime updated_at\\n        boolean is_active\\n    }\\n    \\n    PROFILE {\\n        int id PK\\n        int user_id FK\\n        string first_name\\n        string last_name\\n        string avatar_url\\n        text bio\\n        datetime created_at\\n    }\\n    \\n    POST {\\n        int id PK\\n        int user_id FK\\n        string title\\n        text content\\n        string status\\n        datetime published_at\\n        datetime created_at\\n        datetime updated_at\\n    }\\n    \\n    COMMENT {\\n        int id PK\\n        int post_id FK\\n        int user_id FK\\n        text content\\n        datetime created_at\\n        datetime updated_at\\n    }\\n    \\n    TAG {\\n        int id PK\\n        string name\\n        string slug\\n        datetime created_at\\n    }\\n    \\n    POST_TAG {\\n        int post_id FK\\n        int tag_id FK\\n    }\\n    \\n    USER ||--o{ PROFILE : \\"has\\"\\n    USER ||--o{ POST : \\"creates\\"\\n    USER ||--o{ COMMENT : \\"writes\\"\\n    POST ||--o{ COMMENT : \\"has\\"\\n    POST ||--o{ POST_TAG : \\"has\\"\\n    TAG ||--o{ POST_TAG : \\"belongs_to\\"","usage":"database-schema"},{"id":4,"category":"process","name":"CI/CD Pipeline","description":"Continuous Integration and Deployment workflow","tags":["ci-cd","pipeline","devops"],"code":"graph TD\\n    A[Code Commit] --> B[GitHub Actions]\\n    B --> C{Lint & Test}\\n    C -->|Pass| D[Build Application]\\n    C -->|Fail| E[Notify Developer]\\n    E --> F[Fix Issues]\\n    F --> A\\n    \\n    D --> G[Run Tests]\\n    G -->|Pass| H[Build Docker Image]\\n    G -->|Fail| E\\n    \\n    H --> I[Push to Registry]\\n    I --> J[Deploy to Staging]\\n    J --> K[Run E2E Tests]\\n    K -->|Pass| L[Deploy to Production]\\n    K -->|Fail| M[Rollback]\\n    M --> E\\n    \\n    L --> N[Health Check]\\n    N -->|Pass| O[Notify Success]\\n    N -->|Fail| M\\n    \\n    style A fill:#e1f5fe\\n    style L fill:#e8f5e8\\n    style E fill:#fce4ec\\n    style M fill:#fff3e0","usage":"ci-cd-pipeline"},{"id":5,"category":"timeline","name":"Project Development Timeline","description":"Gantt chart showing project phases and milestones","tags":["timeline","project","gantt"],"code":"gantt\\n    title Project Development Timeline\\n    dateFormat  YYYY-MM-DD\\n    \\n    section Planning\\n    Requirements Analysis    :req, 2024-01-01, 7d\\n    System Design          :design, after req, 10d\\n    Architecture Review    :arch, after design, 3d\\n    \\n    section Development\\n    Frontend Development   :frontend, after arch, 21d\\n    Backend Development    :backend, after arch, 21d\\n    API Integration       :api, after frontend, 7d\\n    \\n    section Testing\\n    Unit Testing          :unit, after backend, 7d\\n    Integration Testing   :integration, after api, 7d\\n    E2E Testing           :e2e, after integration, 5d\\n    \\n    section Deployment\\n    Staging Deployment    :staging, after e2e, 2d\\n    Production Deployment :deploy, after staging, 1d\\n    \\n    section Post-Launch\\n    Monitoring Setup      :monitor, deploy, 3d\\n    Documentation        :docs, deploy, 5d","usage":"project-timeline"},{"id":6,"category":"state","name":"Order Processing States","description":"State diagram showing order processing workflow","tags":["state","order","workflow"],"code":"stateDiagram-v2\\n    [*] --> Pending\\n    Pending --> Confirmed : Payment Received\\n    Pending --> Cancelled : User Cancels\\n    \\n    Confirmed --> Processing : Inventory Check\\n    Confirmed --> Cancelled : Out of Stock\\n    \\n    Processing --> Shipped : Order Prepared\\n    Processing --> Cancelled : Processing Failed\\n    \\n    Shipped --> Delivered : Package Received\\n    Shipped --> Returned : Customer Returns\\n    \\n    Delivered --> Completed : Order Closed\\n    Delivered --> Returned : Customer Returns\\n    \\n    Returned --> Refunded : Refund Processed\\n    \\n    Cancelled --> [*]\\n    Completed --> [*]\\n    Refunded --> [*]","usage":"order-states"},{"id":7,"category":"network","name":"Network Topology","description":"Network architecture showing security zones and connections","tags":["network","security","topology"],"code":"graph TB\\n    subgraph \\"Internet\\"\\n        Internet[Internet]\\n    end\\n    \\n    subgraph \\"DMZ\\"\\n        LB[Load Balancer]\\n        WAF[Web Application Firewall]\\n        VPN[VPN Gateway]\\n    end\\n    \\n    subgraph \\"Application Layer\\"\\n        Web[Web Servers]\\n        App[Application Servers]\\n        API[API Gateway]\\n    end\\n    \\n    subgraph \\"Data Layer\\"\\n        DB[(Primary Database)]\\n        Cache[(Redis Cache)]\\n        Backup[(Backup Database)]\\n        Storage[(File Storage)]\\n    end\\n    \\n    subgraph \\"Monitoring\\"\\n        Monitor[Monitoring System]\\n        Logs[Log Aggregator]\\n        Alert[Alert System]\\n    end\\n    \\n    Internet --> LB\\n    Internet --> VPN\\n    \\n    LB --> WAF\\n    WAF --> Web\\n    \\n    Web --> App\\n    App --> API\\n    \\n    API --> DB\\n    API --> Cache\\n    API --> Storage\\n    \\n    DB --> Backup\\n    \\n    App --> Monitor\\n    Monitor --> Logs\\n    Logs --> Alert\\n    \\n    style Internet fill:#e1f5fe\\n    style WAF fill:#fff3e0\\n    style DB fill:#e8f5e8\\n    style Monitor fill:#f3e5f5","usage":"network-topology"},{"id":8,"category":"mindmap","name":"Technology Stack","description":"Mind map of the complete technology stack","tags":["mindmap","technology","stack"],"code":"mindmap\\n  root((Technology Stack))\\n    Frontend\\n      React\\n        Hooks\\n        Context API\\n        Router\\n      TypeScript\\n        Type Safety\\n        Interfaces\\n      Styling\\n        Tailwind CSS\\n        CSS Modules\\n    Backend\\n      Node.js\\n        Express\\n        Fastify\\n      Python\\n        FastAPI\\n        Django\\n      Database\\n        PostgreSQL\\n        MongoDB\\n        Redis\\n    DevOps\\n      Docker\\n        Containers\\n        Orchestration\\n      Kubernetes\\n        Pods\\n        Services\\n      CI/CD\\n        GitHub Actions\\n        Jenkins\\n    Monitoring\\n      Logging\\n        ELK Stack\\n        Fluentd\\n      Metrics\\n        Prometheus\\n        Grafana\\n      Tracing\\n        Jaeger\\n        Zipkin","usage":"tech-stack"},{"id":9,"category":"flowchart","name":"Error Handling Flow","description":"Error handling and recovery workflow","tags":["error","handling","flowchart"],"code":"graph TD\\n    A[Request Received] --> B{Validate Input}\\n    B -->|Valid| C[Process Request]\\n    B -->|Invalid| D[Return 400 Error]\\n    \\n    C --> E{Process Success?}\\n    E -->|Yes| F[Return Success Response]\\n    E -->|No| G[Log Error]\\n    \\n    G --> H{Retryable Error?}\\n    H -->|Yes| I[Increment Retry Count]\\n    H -->|No| J[Return 500 Error]\\n    \\n    I --> K{Max Retries?}\\n    K -->|No| L[Wait & Retry]\\n    K -->|Yes| M[Return 500 Error]\\n    \\n    L --> C\\n    \\n    D --> N[Log Error]\\n    J --> N\\n    M --> N\\n    \\n    N --> O[Send Alert]\\n    O --> P[Monitor Dashboard]\\n    \\n    style A fill:#e1f5fe\\n    style F fill:#e8f5e8\\n    style D fill:#fce4ec\\n    style J fill:#fce4ec\\n    style M fill:#fce4ec","usage":"error-handling"},{"id":10,"category":"journey","name":"User Onboarding Journey","description":"User journey map for the onboarding process","tags":["journey","onboarding","user"],"code":"journey\\n    title User Onboarding Journey\\n    \\n    section Discovery\\n      Visit Website: 5: User\\n      Read About Features: 4: User\\n      Watch Demo Video: 3: User\\n    \\n    section Sign Up\\n      Create Account: 5: User\\n      Verify Email: 4: User\\n      Complete Profile: 3: User\\n    \\n    section Onboarding\\n      Welcome Tour: 5: User\\n      Setup Preferences: 4: User\\n      Import Data: 3: User\\n    \\n    section First Use\\n      Create First Project: 5: User\\n      Invite Team Members: 4: User\\n      Explore Features: 3: User\\n    \\n    section Adoption\\n      Regular Usage: 5: User\\n      Upgrade Plan: 4: User\\n      Provide Feedback: 3: User","usage":"user-journey"},{"id":11,"category":"class","name":"Domain Model","description":"Class diagram showing core domain entities and relationships","tags":["class","domain","model"],"code":"classDiagram\\n    class User {\\n        +String id\\n        +String email\\n        +String name\\n        +UserRole role\\n        +DateTime createdAt\\n        +DateTime updatedAt\\n        +authenticate(password)\\n        +updateProfile(data)\\n        +hasPermission(permission)\\n    }\\n    \\n    class Project {\\n        +String id\\n        +String name\\n        +String description\\n        +ProjectStatus status\\n        +DateTime createdAt\\n        +DateTime updatedAt\\n        +addMember(user)\\n        +removeMember(user)\\n        +updateStatus(status)\\n    }\\n    \\n    class Task {\\n        +String id\\n        +String title\\n        +String description\\n        +TaskPriority priority\\n        +TaskStatus status\\n        +DateTime dueDate\\n        +DateTime createdAt\\n        +assignTo(user)\\n        +updateStatus(status)\\n        +addComment(comment)\\n    }\\n    \\n    class Comment {\\n        +String id\\n        +String content\\n        +DateTime createdAt\\n        +User author\\n        +edit(content)\\n        +delete()\\n    }\\n    \\n    class Notification {\\n        +String id\\n        +String type\\n        +String message\\n        +Boolean isRead\\n        +DateTime createdAt\\n        +markAsRead()\\n        +delete()\\n    }\\n    \\n    User ||--o{ Project : \\"owns\\"\\n    User ||--o{ Task : \\"assigned_to\\"\\n    User ||--o{ Comment : \\"writes\\"\\n    User ||--o{ Notification : \\"receives\\"\\n    Project ||--o{ Task : \\"contains\\"\\n    Task ||--o{ Comment : \\"has\\"\\n    Task ||--o{ Notification : \\"triggers\\"","usage":"domain-model"},{"id":12,"category":"pie","name":"Technology Distribution","description":"Pie chart showing technology usage distribution","tags":["pie","technology","distribution"],"code":"pie title Technology Usage Distribution\\n    \\"Frontend Development\\" : 35\\n    \\"Backend Development\\" : 30\\n    \\"Database Management\\" : 15\\n    \\"DevOps & Infrastructure\\" : 12\\n    \\"Testing & Quality Assurance\\" : 8","usage":"tech-distribution"}]');function B(){return d}function A(t){return d.filter(a=>a.category===t)}function L(t){return d.filter(a=>a.tags.includes(t))}function O(t){const a=t.toLowerCase();return d.filter(l=>l.name.toLowerCase().includes(a)||l.description.toLowerCase().includes(a)||l.tags.some(c=>c.toLowerCase().includes(a)))}function N(){return[...new Set(d.map(t=>t.category))]}function k(){const t=d.flatMap(a=>a.tags);return[...new Set(t)]}function G(){const t=N(),a=k(),l=t.map(r=>({category:r,count:A(r).length})),c=a.map(r=>({tag:r,count:L(r).length}));return{total:d.length,categories:l,tags:c,mostUsedCategory:l.reduce((r,o)=>r.count>o.count?r:o),mostUsedTag:c.reduce((r,o)=>r.count>o.count?r:o)}}function W({onSelectDiagram:t=null,showEditor:a=!0,className:l=""}){const[c,r]=i.useState([]),[o,b]=i.useState([]),[g,x]=i.useState("all"),[m,v]=i.useState("all"),[u,w]=i.useState(""),[f,D]=i.useState(null),[h,T]=i.useState(null),[y,S]=i.useState("grid");i.useEffect(()=>{const n=B();r(n),b(n),T(G())},[]),i.useEffect(()=>{let n=c;g!=="all"&&(n=A(g)),m!=="all"&&(n=n.filter(s=>s.tags.includes(m))),u.trim()&&(n=O(u)),b(n)},[c,g,m,u]);const U=i.useMemo(()=>["all",...N()],[]),F=i.useMemo(()=>["all",...k()],[]),M=n=>{D(n),t&&t(n)},j=()=>{x("all"),v("all"),w("")},C=(n,s="json")=>{const R=s==="json"?JSON.stringify(n,null,2):`# ${n.name}

${n.description}

\`\`\`mermaid
${n.code}
\`\`\``,E=new Blob([R],{type:"text/plain"}),P=URL.createObjectURL(E),p=document.createElement("a");p.href=P,p.download=`${n.name.toLowerCase().replace(/\s+/g,"-")}.${s}`,document.body.appendChild(p),p.click(),document.body.removeChild(p),URL.revokeObjectURL(P)};return e.jsxs("div",{className:`diagram-gallery ${l}`,children:[h&&e.jsx("div",{className:"gallery-header",children:e.jsxs("div",{className:"stats-overview",children:[e.jsxs("div",{className:"stat-item",children:[e.jsx("span",{className:"stat-number",children:h.total}),e.jsx("span",{className:"stat-label",children:"Total Diagrams"})]}),e.jsxs("div",{className:"stat-item",children:[e.jsx("span",{className:"stat-number",children:h.categories.length}),e.jsx("span",{className:"stat-label",children:"Categories"})]}),e.jsxs("div",{className:"stat-item",children:[e.jsx("span",{className:"stat-number",children:h.tags.length}),e.jsx("span",{className:"stat-label",children:"Tags"})]})]})}),e.jsxs("div",{className:"gallery-filters",children:[e.jsxs("div",{className:"filter-group",children:[e.jsx("label",{htmlFor:"category-filter",children:"Category:"}),e.jsx("select",{id:"category-filter",value:g,onChange:n=>x(n.target.value),className:"filter-select",children:U.map(n=>e.jsx("option",{value:n,children:n==="all"?"All Categories":n.charAt(0).toUpperCase()+n.slice(1)},n))})]}),e.jsxs("div",{className:"filter-group",children:[e.jsx("label",{htmlFor:"tag-filter",children:"Tag:"}),e.jsx("select",{id:"tag-filter",value:m,onChange:n=>v(n.target.value),className:"filter-select",children:F.map(n=>e.jsx("option",{value:n,children:n==="all"?"All Tags":n.charAt(0).toUpperCase()+n.slice(1)},n))})]}),e.jsxs("div",{className:"filter-group",children:[e.jsx("label",{htmlFor:"search-filter",children:"Search:"}),e.jsx("input",{id:"search-filter",type:"text",placeholder:"Search diagrams...",value:u,onChange:n=>w(n.target.value),className:"filter-input"})]}),e.jsxs("div",{className:"filter-group",children:[e.jsx("label",{children:"View:"}),e.jsxs("div",{className:"view-toggle",children:[e.jsx("button",{className:`view-btn ${y==="grid"?"active":""}`,onClick:()=>S("grid"),title:"Grid View",children:e.jsx("svg",{width:"16",height:"16",viewBox:"0 0 16 16",fill:"currentColor",children:e.jsx("path",{d:"M1 1h6v6H1V1zm0 8h6v6H1V9zm8-8h6v6H9V1zm0 8h6v6H9V9z"})})}),e.jsx("button",{className:`view-btn ${y==="list"?"active":""}`,onClick:()=>S("list"),title:"List View",children:e.jsx("svg",{width:"16",height:"16",viewBox:"0 0 16 16",fill:"currentColor",children:e.jsx("path",{d:"M1 1h14v2H1V1zm0 6h14v2H1V7zm0 6h14v2H1v-2z"})})})]})]}),e.jsx("button",{onClick:j,className:"clear-filters-btn",disabled:g==="all"&&m==="all"&&!u,children:"Clear Filters"})]}),e.jsxs("div",{className:"results-info",children:[e.jsxs("span",{children:["Showing ",o.length," of ",c.length," diagrams"]}),(g!=="all"||m!=="all"||u)&&e.jsx("span",{className:"active-filters",children:"(filtered)"})]}),e.jsx("div",{className:`diagrams-container ${y}`,children:o.length===0?e.jsxs("div",{className:"no-results",children:[e.jsx("p",{children:"No diagrams found matching your criteria."}),e.jsx("button",{onClick:j,className:"clear-filters-btn",children:"Clear all filters"})]}):o.map(n=>e.jsxs("div",{className:`diagram-card ${f?.id===n.id?"selected":""}`,onClick:()=>M(n),children:[e.jsxs("div",{className:"diagram-header",children:[e.jsx("h3",{className:"diagram-title",children:n.name}),e.jsxs("div",{className:"diagram-actions",children:[e.jsx("button",{onClick:s=>{s.stopPropagation(),C(n,"json")},className:"action-btn",title:"Export as JSON",children:e.jsx("svg",{width:"14",height:"14",viewBox:"0 0 16 16",fill:"currentColor",children:e.jsx("path",{d:"M8 1v10.5L4.5 8 3 9.5 8 14l5-4.5L11.5 8 8 11.5V1H8z"})})}),e.jsx("button",{onClick:s=>{s.stopPropagation(),C(n,"markdown")},className:"action-btn",title:"Export as Markdown",children:e.jsx("svg",{width:"14",height:"14",viewBox:"0 0 16 16",fill:"currentColor",children:e.jsx("path",{d:"M2 2h12v12H2V2zm1 1v10h10V3H3zm2 2h6v1H5V5zm0 2h6v1H5V7zm0 2h4v1H5V9z"})})})]})]}),e.jsx("p",{className:"diagram-description",children:n.description}),e.jsxs("div",{className:"diagram-meta",children:[e.jsx("span",{className:"diagram-category",children:n.category}),e.jsxs("div",{className:"diagram-tags",children:[n.tags.slice(0,3).map(s=>e.jsx("span",{className:"tag",children:s},s)),n.tags.length>3&&e.jsxs("span",{className:"tag-more",children:["+",n.tags.length-3]})]})]}),e.jsx("div",{className:"diagram-preview",children:e.jsx("div",{className:"mermaid-preview",children:e.jsx("div",{className:"mermaid","data-preview":"true",children:n.code})})})]},n.id))}),a&&f&&e.jsxs("div",{className:"selected-diagram-editor",children:[e.jsxs("div",{className:"editor-header",children:[e.jsxs("h3",{children:["Editing: ",f.name]}),e.jsx("button",{onClick:()=>D(null),className:"close-btn",children:"×"})]}),e.jsx(I,{initialCode:f.code,readOnly:!1,className:"gallery-editor"})]}),e.jsx("style",{jsx:!0,children:`
        .diagram-gallery {
          max-width: 1200px;
          margin: 0 auto;
          padding: 1rem;
        }

        .gallery-header {
          margin-bottom: 2rem;
          padding: 1rem;
          background: #f8f9fa;
          border-radius: 8px;
        }

        .stats-overview {
          display: flex;
          gap: 2rem;
          justify-content: center;
        }

        .stat-item {
          text-align: center;
        }

        .stat-number {
          display: block;
          font-size: 2rem;
          font-weight: bold;
          color: #007bff;
        }

        .stat-label {
          font-size: 0.875rem;
          color: #6c757d;
        }

        .gallery-filters {
          display: flex;
          gap: 1rem;
          align-items: center;
          margin-bottom: 1.5rem;
          padding: 1rem;
          background: #fff;
          border: 1px solid #e9ecef;
          border-radius: 8px;
          flex-wrap: wrap;
        }

        .filter-group {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .filter-group label {
          font-weight: 500;
          font-size: 0.875rem;
        }

        .filter-select,
        .filter-input {
          padding: 0.5rem;
          border: 1px solid #ced4da;
          border-radius: 4px;
          font-size: 0.875rem;
        }

        .view-toggle {
          display: flex;
          border: 1px solid #ced4da;
          border-radius: 4px;
          overflow: hidden;
        }

        .view-btn {
          padding: 0.5rem;
          border: none;
          background: #fff;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .view-btn.active {
          background: #007bff;
          color: #fff;
        }

        .clear-filters-btn {
          padding: 0.5rem 1rem;
          background: #6c757d;
          color: #fff;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-size: 0.875rem;
        }

        .clear-filters-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .results-info {
          margin-bottom: 1rem;
          font-size: 0.875rem;
          color: #6c757d;
        }

        .active-filters {
          color: #007bff;
          font-weight: 500;
        }

        .diagrams-container {
          display: grid;
          gap: 1.5rem;
        }

        .diagrams-container.grid {
          grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
        }

        .diagrams-container.list {
          grid-template-columns: 1fr;
        }

        .diagram-card {
          background: #fff;
          border: 1px solid #e9ecef;
          border-radius: 8px;
          padding: 1rem;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .diagram-card:hover {
          border-color: #007bff;
          box-shadow: 0 2px 8px rgba(0, 123, 255, 0.1);
        }

        .diagram-card.selected {
          border-color: #007bff;
          background: #f8f9ff;
        }

        .diagram-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 0.5rem;
        }

        .diagram-title {
          margin: 0;
          font-size: 1.125rem;
          font-weight: 600;
          color: #212529;
        }

        .diagram-actions {
          display: flex;
          gap: 0.25rem;
        }

        .action-btn {
          padding: 0.25rem;
          background: none;
          border: none;
          cursor: pointer;
          color: #6c757d;
          border-radius: 4px;
        }

        .action-btn:hover {
          background: #e9ecef;
          color: #495057;
        }

        .diagram-description {
          margin: 0 0 1rem 0;
          font-size: 0.875rem;
          color: #6c757d;
          line-height: 1.4;
        }

        .diagram-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }

        .diagram-category {
          font-size: 0.75rem;
          font-weight: 500;
          color: #007bff;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .diagram-tags {
          display: flex;
          gap: 0.25rem;
        }

        .tag {
          font-size: 0.75rem;
          padding: 0.125rem 0.5rem;
          background: #e9ecef;
          color: #495057;
          border-radius: 12px;
        }

        .tag-more {
          font-size: 0.75rem;
          color: #6c757d;
          font-style: italic;
        }

        .diagram-preview {
          border: 1px solid #e9ecef;
          border-radius: 4px;
          overflow: hidden;
          max-height: 200px;
        }

        .mermaid-preview {
          padding: 0.5rem;
          background: #f8f9fa;
        }

        .no-results {
          grid-column: 1 / -1;
          text-align: center;
          padding: 3rem;
          color: #6c757d;
        }

        .selected-diagram-editor {
          margin-top: 2rem;
          border: 1px solid #e9ecef;
          border-radius: 8px;
          overflow: hidden;
        }

        .editor-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem;
          background: #f8f9fa;
          border-bottom: 1px solid #e9ecef;
        }

        .editor-header h3 {
          margin: 0;
          font-size: 1.125rem;
        }

        .close-btn {
          background: none;
          border: none;
          font-size: 1.5rem;
          cursor: pointer;
          color: #6c757d;
          padding: 0;
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .close-btn:hover {
          color: #dc3545;
        }

        @media (max-width: 768px) {
          .gallery-filters {
            flex-direction: column;
            align-items: stretch;
          }

          .filter-group {
            justify-content: space-between;
          }

          .diagrams-container.grid {
            grid-template-columns: 1fr;
          }

          .stats-overview {
            flex-direction: column;
            gap: 1rem;
          }
        }
      `})]})}export{W as default};
