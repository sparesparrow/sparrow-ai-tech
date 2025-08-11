# Mermaid Diagram Test Page

This page demonstrates the comprehensive Mermaid diagram capabilities of the
sparrow-ai-tech platform.

## Flowchart Example

```mermaid
graph TD
    A[Start] --> B{Decision?};
    B -->|Yes| C[Action 1];
    B -->|No| D[Action 2];
    C --> E[Success];
    D --> F[Handle Error];
    E --> G[End];
    F --> G;

    style A fill:#e1f5fe
    style C fill:#e8f5e8
    style D fill:#fff3e0
    style E fill:#f1f8e9
    style F fill:#fce4ec
```

## Sequence Diagram Example

```mermaid
sequenceDiagram
    participant User
    participant Frontend
    participant Backend
    participant Database

    User->>Frontend: Submit Request
    Frontend->>Backend: API Call
    Backend->>Database: Query Data
    Database-->>Backend: Return Results
    Backend-->>Frontend: Process Response
    Frontend-->>User: Display Result
```

## Class Diagram Example

```mermaid
classDiagram
    class Animal {
        +String name
        +int age
        +move()
        +makeSound()
    }
    class Dog {
        +String breed
        +bark()
        +fetch()
    }
    class Bird {
        +String wingSpan
        +fly()
        +sing()
    }
    class Fish {
        +String habitat
        +swim()
        +breathe()
    }

    Animal <|-- Dog
    Animal <|-- Bird
    Animal <|-- Fish
```

## Gantt Chart Example

```mermaid
gantt
    title Project Development Timeline
    dateFormat  YYYY-MM-DD
    section Planning
    Requirements Analysis    :req, 2024-01-01, 7d
    System Design          :design, after req, 10d
    section Development
    Frontend Development   :frontend, after design, 21d
    Backend Development    :backend, after design, 21d
    section Testing
    Unit Testing          :unit, after frontend, 7d
    Integration Testing   :integration, after unit, 7d
    section Deployment
    Production Deployment :deploy, after integration, 3d
```

## State Diagram Example

```mermaid
stateDiagram-v2
    [*] --> Idle
    Idle --> Processing : Start Task
    Processing --> Success : Task Complete
    Processing --> Error : Task Failed
    Success --> Idle : Reset
    Error --> Idle : Reset
    Error --> Processing : Retry
```

## Entity Relationship Diagram Example

```mermaid
erDiagram
    USER {
        int id PK
        string name
        string email
        datetime created_at
    }
    POST {
        int id PK
        int user_id FK
        string title
        string content
        datetime published_at
    }
    COMMENT {
        int id PK
        int post_id FK
        int user_id FK
        string content
        datetime created_at
    }

    USER ||--o{ POST : "creates"
    POST ||--o{ COMMENT : "has"
    USER ||--o{ COMMENT : "writes"
```

## Pie Chart Example

```mermaid
pie title Technology Stack Distribution
    "Frontend" : 35
    "Backend" : 30
    "Database" : 20
    "DevOps" : 15
```

## Git Graph Example

```mermaid
gitgraph
    commit
    branch develop
    checkout develop
    commit
    commit
    checkout main
    merge develop
    commit
```

## Journey Diagram Example

```mermaid
journey
    title User Journey: Online Shopping
    section Discovery
      Browse Products: 5: User
      Search Items: 3: User
    section Purchase
      Add to Cart: 4: User
      Checkout: 5: User
      Payment: 4: User
    section Post-Purchase
      Order Confirmation: 5: User
      Delivery Tracking: 4: User
      Product Review: 3: User
```

## Mindmap Example

```mermaid
mindmap
  root((AI Development))
    Frontend
      React
      Vue
      Angular
    Backend
      Node.js
      Python
      Java
    Database
      PostgreSQL
      MongoDB
      Redis
    DevOps
      Docker
      Kubernetes
      CI/CD
```

## Timeline Example

```mermaid
timeline
    title AI Development Timeline
    2020 : AI Research Begins
    2021 : First Prototype
    2022 : Beta Testing
    2023 : Production Release
    2024 : Advanced Features
    2025 : Future Plans
```

## C4 Context Diagram Example

```mermaid
C4Context
    title System Context diagram for Internet Banking System

    Person(customer, "Banking Customer", "A customer of the bank, with personal bank accounts.")
    System(bankingSystem, "Internet Banking System", "Allows customers to view information about their bank accounts, and make payments.")

    Rel(customer, bankingSystem, "Uses", "HTTPS")

    UpdateLayoutConfig($c4ShapeInRow="3", $c4BoundaryInRow="1")
```

## Editable Diagram Example

```mermaid-edit
graph TD
    A[Start] --> B{Edit Me?};
    B -->|Yes| C[Make Changes];
    B -->|No| D[Keep Original];
    C --> E[Save Changes];
    D --> F[Continue];
    E --> G[End];
    F --> G;

    style A fill:#e1f5fe
    style C fill:#e8f5e8
    style E fill:#f1f8e9
```

## Complex Workflow Example

```mermaid
graph TD
    subgraph "Data Processing Pipeline"
        A[Raw Data] --> B[Data Validation]
        B --> C{Valid?}
        C -->|Yes| D[Data Cleaning]
        C -->|No| E[Error Logging]
        D --> F[Feature Engineering]
        F --> G[Model Training]
        G --> H[Model Evaluation]
        H --> I{Performance OK?}
        I -->|Yes| J[Model Deployment]
        I -->|No| K[Hyperparameter Tuning]
        K --> G
        E --> L[Data Correction]
        L --> B
    end

    subgraph "Monitoring"
        J --> M[Performance Monitoring]
        M --> N{Drift Detected?}
        N -->|Yes| O[Retrain Model]
        N -->|No| M
        O --> G
    end

    style A fill:#e1f5fe
    style J fill:#e8f5e8
    style E fill:#fce4ec
    style M fill:#fff3e0
```

## Security Architecture Example

```mermaid
graph TB
    subgraph "External"
        User[User]
        Attacker[Attacker]
    end

    subgraph "DMZ"
        LB[Load Balancer]
        WAF[Web Application Firewall]
    end

    subgraph "Application Layer"
        Web[Web Server]
        App[Application Server]
        API[API Gateway]
    end

    subgraph "Data Layer"
        DB[(Database)]
        Cache[(Cache)]
        Storage[(File Storage)]
    end

    User --> LB
    Attacker --> WAF
    LB --> WAF
    WAF --> Web
    Web --> App
    App --> API
    API --> DB
    API --> Cache
    API --> Storage

    style User fill:#e8f5e8
    style Attacker fill:#fce4ec
    style WAF fill:#fff3e0
    style DB fill:#e1f5fe
```

## Microservices Architecture Example

```mermaid
graph TB
    subgraph "Client Layer"
        Web[Web Client]
        Mobile[Mobile App]
        API_Client[API Client]
    end

    subgraph "API Gateway"
        Gateway[API Gateway]
    end

    subgraph "Microservices"
        Auth[Authentication Service]
        User[User Service]
        Order[Order Service]
        Payment[Payment Service]
        Notification[Notification Service]
    end

    subgraph "Data Stores"
        UserDB[(User DB)]
        OrderDB[(Order DB)]
        PaymentDB[(Payment DB)]
        MessageQueue[Message Queue]
    end

    Web --> Gateway
    Mobile --> Gateway
    API_Client --> Gateway

    Gateway --> Auth
    Gateway --> User
    Gateway --> Order
    Gateway --> Payment

    Auth --> UserDB
    User --> UserDB
    Order --> OrderDB
    Payment --> PaymentDB

    Order --> MessageQueue
    Payment --> MessageQueue
    MessageQueue --> Notification

    style Gateway fill:#e1f5fe
    style Auth fill:#e8f5e8
    style MessageQueue fill:#fff3e0
```

This comprehensive test page demonstrates the full range of Mermaid diagram
capabilities available in the sparrow-ai-tech platform. Each diagram type
showcases different aspects of diagram creation and can be used as templates for
your own diagrams.
