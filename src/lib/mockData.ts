import { ArchitectureData, ScalingData } from "@/types/architecture";

const defaultScaling: ScalingData = {
  overview: "Designed for high availability and horizontal scalability with auto-scaling policies, distributed caching, and load balancing across multiple regions.",
  scalingConfig: {
    horizontal: {
      enabled: true,
      minInstances: 2,
      maxInstances: 50,
      targetCPU: 70,
      targetMemory: 75
    },
    vertical: {
      enabled: true,
      cpuLimit: "4 vCPU",
      memoryLimit: "8 GB"
    }
  },
  cachingStrategies: [
    {
      layer: "Application Cache",
      technology: "Redis Cluster",
      ttl: "15 minutes",
      invalidation: "Event-driven",
      useCase: "Session data, user preferences, frequently accessed queries"
    },
    {
      layer: "CDN Cache",
      technology: "CloudFront",
      ttl: "24 hours",
      invalidation: "Version-based",
      useCase: "Static assets, images, frontend bundles"
    },
    {
      layer: "Database Cache",
      technology: "Read Replicas",
      ttl: "Real-time",
      invalidation: "Replication lag",
      useCase: "Read-heavy queries, reporting data"
    }
  ],
  loadBalancing: {
    type: "Application Load Balancer",
    algorithm: "Round Robin with Health Checks",
    healthCheck: "/health",
    features: ["SSL Termination", "Path-based Routing", "Sticky Sessions", "Auto-failover", "DDoS Protection"]
  },
  performanceMetrics: [
    { name: "Response Time", target: "200ms", current: "145ms", status: "healthy" },
    { name: "Uptime", target: "99.9%", current: "99.95%", status: "healthy" },
    { name: "Error Rate", target: "<0.1%", current: "0.05%", status: "healthy" },
    { name: "Throughput", target: "10k/s", current: "8.5k/s", status: "warning" }
  ],
  optimizations: [
    {
      category: "Database",
      title: "Query Optimization",
      description: "Implement query caching and use prepared statements to reduce database load by 40%",
      impact: "high"
    },
    {
      category: "API",
      title: "Response Compression",
      description: "Enable gzip compression for API responses to reduce bandwidth by 70%",
      impact: "medium"
    },
    {
      category: "Infrastructure",
      title: "Connection Pooling",
      description: "Use connection pooling to reduce database connection overhead",
      impact: "high"
    }
  ],
  bottlenecks: [
    {
      component: "Database Writes",
      issue: "High write contention during peak hours causes increased latency",
      solution: "Implement write-behind caching and batch operations"
    },
    {
      component: "API Gateway",
      issue: "Single point of failure without proper redundancy",
      solution: "Deploy multi-region API gateways with automatic failover"
    }
  ]
};

const uberScaling: ScalingData = {
  overview: "Real-time location tracking and ride matching require sub-100ms latency. Architecture designed for 10M+ concurrent users with geographic sharding and edge computing.",
  scalingConfig: {
    horizontal: {
      enabled: true,
      minInstances: 5,
      maxInstances: 100,
      targetCPU: 60,
      targetMemory: 70
    },
    vertical: {
      enabled: true,
      cpuLimit: "8 vCPU",
      memoryLimit: "16 GB"
    }
  },
  cachingStrategies: [
    {
      layer: "Location Cache",
      technology: "Redis Geo",
      ttl: "5 seconds",
      invalidation: "Time-based",
      useCase: "Real-time driver locations, nearby driver queries"
    },
    {
      layer: "Surge Pricing",
      technology: "Redis",
      ttl: "1 minute",
      invalidation: "Event-driven",
      useCase: "Dynamic pricing calculations, demand zones"
    },
    {
      layer: "User Sessions",
      technology: "Redis Cluster",
      ttl: "30 minutes",
      invalidation: "Sliding expiry",
      useCase: "Active ride sessions, user authentication"
    }
  ],
  loadBalancing: {
    type: "Geographic Load Balancer",
    algorithm: "Latency-based Routing",
    healthCheck: "/api/health",
    features: ["Geo-routing", "WebSocket Support", "Rate Limiting", "Circuit Breaker", "Auto-failover"]
  },
  performanceMetrics: [
    { name: "Match Latency", target: "50ms", current: "42ms", status: "healthy" },
    { name: "Location Update", target: "100ms", current: "85ms", status: "healthy" },
    { name: "Availability", target: "99.99%", current: "99.97%", status: "warning" },
    { name: "Concurrent Rides", target: "1M", current: "850k", status: "healthy" }
  ],
  optimizations: [
    {
      category: "Real-time",
      title: "WebSocket Optimization",
      description: "Use binary protocols for location updates to reduce payload size by 60%",
      impact: "high"
    },
    {
      category: "Database",
      title: "Geographic Sharding",
      description: "Shard ride data by city/region to improve query performance",
      impact: "high"
    },
    {
      category: "Matching",
      title: "ML-based Matching",
      description: "Use machine learning for optimal driver-rider matching",
      impact: "medium"
    }
  ],
  bottlenecks: [
    {
      component: "Location Service",
      issue: "High-frequency updates create write amplification",
      solution: "Batch location updates and use append-only logs"
    },
    {
      component: "Payment Processing",
      issue: "Third-party payment gateway latency",
      solution: "Implement async payment processing with eventual consistency"
    },
    {
      component: "Notification Delivery",
      issue: "Push notification delays during peak hours",
      solution: "Priority queues and multi-provider failover"
    }
  ]
};

export function generateMockArchitecture(prompt: string): ArchitectureData {
  const systemName = prompt.toLowerCase().includes("uber") ? "Uber" :
                     prompt.toLowerCase().includes("netflix") ? "Netflix" :
                     prompt.toLowerCase().includes("whatsapp") ? "WhatsApp" :
                     "Custom System";

  const architectureTemplates: Record<string, ArchitectureData> = {
    "Uber": {
      prompt,
      summary: "A ride-sharing platform architecture designed for high availability, real-time location tracking, and seamless payment processing. The system handles millions of concurrent users with distributed microservices.",
      services: [
        {
          name: "User Service",
          description: "Handles user authentication, profiles, and preferences",
          responsibilities: ["User registration", "Authentication", "Profile management", "Rating system"],
          techStack: ["Node.js", "PostgreSQL", "Redis", "JWT"]
        },
        {
          name: "Ride Service",
          description: "Core service for ride matching and management",
          responsibilities: ["Ride requests", "Driver matching", "Trip management", "Fare calculation"],
          techStack: ["Go", "MongoDB", "Kafka", "Redis"]
        },
        {
          name: "Location Service",
          description: "Real-time location tracking and geospatial queries",
          responsibilities: ["GPS tracking", "Geofencing", "ETA calculation", "Route optimization"],
          techStack: ["Go", "Redis", "PostGIS", "WebSocket"]
        },
        {
          name: "Payment Service",
          description: "Handles all financial transactions",
          responsibilities: ["Payment processing", "Wallet management", "Invoicing", "Refunds"],
          techStack: ["Java", "PostgreSQL", "Stripe API", "PCI DSS"]
        },
        {
          name: "Notification Service",
          description: "Push notifications and real-time updates",
          responsibilities: ["Push notifications", "SMS alerts", "Email notifications", "In-app messages"],
          techStack: ["Node.js", "Firebase", "Twilio", "SendGrid"]
        }
      ],
      databases: [
        {
          name: "users",
          columns: [
            { name: "id", type: "UUID", constraints: "PRIMARY KEY" },
            { name: "email", type: "VARCHAR(255)", constraints: "UNIQUE NOT NULL" },
            { name: "phone", type: "VARCHAR(20)", constraints: "UNIQUE" },
            { name: "name", type: "VARCHAR(100)" },
            { name: "role", type: "ENUM('rider', 'driver')" },
            { name: "rating", type: "DECIMAL(3,2)" },
            { name: "created_at", type: "TIMESTAMP" }
          ],
          relationships: ["One-to-Many with rides", "One-to-One with driver_details"]
        },
        {
          name: "rides",
          columns: [
            { name: "id", type: "UUID", constraints: "PRIMARY KEY" },
            { name: "rider_id", type: "UUID", constraints: "FOREIGN KEY" },
            { name: "driver_id", type: "UUID", constraints: "FOREIGN KEY" },
            { name: "pickup_location", type: "POINT" },
            { name: "dropoff_location", type: "POINT" },
            { name: "status", type: "ENUM('pending', 'accepted', 'in_progress', 'completed', 'cancelled')" },
            { name: "fare", type: "DECIMAL(10,2)" },
            { name: "created_at", type: "TIMESTAMP" }
          ],
          relationships: ["Many-to-One with users"]
        },
        {
          name: "payments",
          columns: [
            { name: "id", type: "UUID", constraints: "PRIMARY KEY" },
            { name: "ride_id", type: "UUID", constraints: "FOREIGN KEY" },
            { name: "amount", type: "DECIMAL(10,2)" },
            { name: "method", type: "ENUM('card', 'wallet', 'cash')" },
            { name: "status", type: "ENUM('pending', 'completed', 'failed')" },
            { name: "processed_at", type: "TIMESTAMP" }
          ]
        }
      ],
      apiEndpoints: [
        {
          method: "POST",
          path: "/api/v1/rides",
          description: "Request a new ride",
          requestBody: '{ "pickup": { "lat": 40.7128, "lng": -74.0060 }, "dropoff": { "lat": 40.7580, "lng": -73.9855 } }',
          responseModel: '{ "ride_id": "uuid", "estimated_fare": 25.50, "eta": 5 }',
          statusCodes: [
            { code: 201, description: "Ride created successfully" },
            { code: 400, description: "Invalid location data" },
            { code: 503, description: "No drivers available" }
          ]
        },
        {
          method: "GET",
          path: "/api/v1/rides/:id",
          description: "Get ride details",
          responseModel: '{ "id": "uuid", "status": "in_progress", "driver": {...}, "eta": 3 }',
          statusCodes: [
            { code: 200, description: "Success" },
            { code: 404, description: "Ride not found" }
          ]
        },
        {
          method: "PUT",
          path: "/api/v1/rides/:id/cancel",
          description: "Cancel an active ride",
          statusCodes: [
            { code: 200, description: "Ride cancelled" },
            { code: 400, description: "Cannot cancel completed ride" }
          ]
        },
        {
          method: "POST",
          path: "/api/v1/drivers/location",
          description: "Update driver location",
          requestBody: '{ "lat": 40.7128, "lng": -74.0060, "heading": 45 }',
          statusCodes: [
            { code: 200, description: "Location updated" }
          ]
        }
      ],
      scalingStrategy: "Horizontal scaling with auto-scaling groups based on CPU and request metrics. Location service uses Redis Cluster for distributed caching. Database sharding by geographic region. Event-driven architecture with Kafka for async processing.",
      faultTolerance: "Circuit breakers on all service-to-service calls. Retry with exponential backoff. Multi-region deployment with automatic failover. Health checks and self-healing containers. Event sourcing for critical business operations.",
      scaling: uberScaling,
      diagrams: {
        erd: `erDiagram
    USERS ||--o{ RIDES : requests
    USERS ||--o{ RIDES : drives
    USERS ||--|| DRIVER_DETAILS : has
    RIDES ||--|| PAYMENTS : has
    USERS ||--o{ RATINGS : gives
    USERS ||--o{ RATINGS : receives
    
    USERS {
        uuid id PK
        string email UK
        string phone UK
        string name
        enum role
        decimal rating
        timestamp created_at
    }
    
    RIDES {
        uuid id PK
        uuid rider_id FK
        uuid driver_id FK
        point pickup_location
        point dropoff_location
        enum status
        decimal fare
        timestamp created_at
    }
    
    PAYMENTS {
        uuid id PK
        uuid ride_id FK
        decimal amount
        enum method
        enum status
        timestamp processed_at
    }
    
    DRIVER_DETAILS {
        uuid id PK
        uuid user_id FK
        string license_number
        string vehicle_model
        boolean is_active
    }`,
        architecture: `flowchart TB
    subgraph Clients
        MA[Mobile App]
        WA[Web App]
    end
    
    subgraph Gateway
        LB[Load Balancer]
        AG[API Gateway]
    end
    
    subgraph Services
        US[User Service]
        RS[Ride Service]
        LS[Location Service]
        PS[Payment Service]
        NS[Notification Service]
    end
    
    subgraph Data
        PG[(PostgreSQL)]
        MG[(MongoDB)]
        RD[(Redis Cache)]
    end
    
    subgraph Messaging
        KF[Kafka]
    end
    
    MA --> LB
    WA --> LB
    LB --> AG
    AG --> US
    AG --> RS
    AG --> LS
    AG --> PS
    RS --> KF
    KF --> NS
    US --> PG
    RS --> MG
    LS --> RD
    PS --> PG`,
        sequence: `sequenceDiagram
    participant R as Rider App
    participant AG as API Gateway
    participant RS as Ride Service
    participant LS as Location Service
    participant NS as Notification Service
    participant D as Driver App
    
    R->>AG: Request Ride
    AG->>RS: Create Ride Request
    RS->>LS: Find Nearby Drivers
    LS-->>RS: Available Drivers
    RS->>RS: Match Best Driver
    RS->>NS: Notify Driver
    NS->>D: Push Notification
    D->>AG: Accept Ride
    AG->>RS: Update Status
    RS->>NS: Notify Rider
    NS->>R: Driver Assigned
    
    loop During Trip
        D->>LS: Update Location
        LS->>R: Real-time Updates
    end
    
    D->>AG: Complete Trip
    AG->>RS: Finalize Ride
    RS->>RS: Calculate Fare`
      }
    },
    "Netflix": {
      prompt,
      summary: "A global streaming platform architecture optimized for content delivery, personalization, and high availability across millions of concurrent streams.",
      services: [
        {
          name: "Content Service",
          description: "Manages video content metadata and catalog",
          responsibilities: ["Content catalog", "Metadata management", "Search indexing", "Content ingestion"],
          techStack: ["Java", "Cassandra", "Elasticsearch", "S3"]
        },
        {
          name: "Streaming Service",
          description: "Handles video streaming and adaptive bitrate",
          responsibilities: ["Video encoding", "Adaptive streaming", "DRM protection", "Playback management"],
          techStack: ["Go", "FFmpeg", "HLS/DASH", "CDN"]
        },
        {
          name: "Recommendation Service",
          description: "ML-powered content recommendations",
          responsibilities: ["User preferences", "Content similarity", "Trending analysis", "A/B testing"],
          techStack: ["Python", "TensorFlow", "Spark", "Redis"]
        }
      ],
      databases: [
        {
          name: "content",
          columns: [
            { name: "id", type: "UUID", constraints: "PRIMARY KEY" },
            { name: "title", type: "VARCHAR(255)" },
            { name: "type", type: "ENUM('movie', 'series')" },
            { name: "release_date", type: "DATE" },
            { name: "duration", type: "INTEGER" }
          ]
        }
      ],
      apiEndpoints: [
        {
          method: "GET",
          path: "/api/v1/content/:id/stream",
          description: "Get streaming manifest",
          responseModel: '{ "manifest_url": "...", "drm_token": "..." }',
          statusCodes: [{ code: 200, description: "Success" }]
        }
      ],
      scalingStrategy: "Global CDN with edge caching. Microservices with auto-scaling. Multi-region deployment.",
      faultTolerance: "Chaos engineering practices. Circuit breakers. Graceful degradation.",
      scaling: defaultScaling,
      diagrams: {
        erd: `erDiagram
    CONTENT ||--o{ EPISODES : contains
    USERS ||--o{ WATCH_HISTORY : has
    CONTENT ||--o{ WATCH_HISTORY : watched
    
    CONTENT {
        uuid id PK
        string title
        enum type
        date release_date
    }
    
    USERS {
        uuid id PK
        string email
        string subscription_tier
    }`,
        architecture: `flowchart TB
    subgraph Clients
        TV[Smart TV]
        MB[Mobile]
        WB[Web Browser]
    end
    
    subgraph CDN
        CF[CloudFront]
        OC[Open Connect]
    end
    
    subgraph Services
        CS[Content Service]
        SS[Streaming Service]
        RS[Recommendation Service]
    end
    
    TV --> CF
    MB --> CF
    WB --> CF
    CF --> OC
    OC --> SS
    SS --> CS
    CS --> RS`,
        sequence: `sequenceDiagram
    participant C as Client
    participant CDN as CDN
    participant SS as Streaming Service
    participant CS as Content Service
    
    C->>SS: Request Stream
    SS->>CS: Get Content Info
    CS-->>SS: Manifest + DRM
    SS-->>C: Stream URL
    C->>CDN: Fetch Video Chunks
    CDN-->>C: Video Data`
      }
    }
  };

  return architectureTemplates[systemName] || {
    prompt,
    summary: `A custom system architecture based on: "${prompt}". This design follows microservices principles with event-driven communication.`,
    services: [
      {
        name: "Core Service",
        description: "Main application logic and business rules",
        responsibilities: ["Business logic", "Data validation", "Orchestration"],
        techStack: ["Node.js", "TypeScript", "Express"]
      },
      {
        name: "API Gateway",
        description: "Entry point for all client requests",
        responsibilities: ["Rate limiting", "Authentication", "Request routing"],
        techStack: ["Kong", "JWT", "Redis"]
      }
    ],
    databases: [
      {
        name: "main_db",
        columns: [
          { name: "id", type: "UUID", constraints: "PRIMARY KEY" },
          { name: "created_at", type: "TIMESTAMP" },
          { name: "updated_at", type: "TIMESTAMP" }
        ]
      }
    ],
    apiEndpoints: [
      {
        method: "GET",
        path: "/api/v1/health",
        description: "Health check endpoint",
        statusCodes: [{ code: 200, description: "Service healthy" }]
      }
    ],
    scalingStrategy: "Horizontal scaling with container orchestration. Database read replicas for query distribution.",
    faultTolerance: "Health checks, automatic restarts, and circuit breakers for resilient operation.",
    scaling: defaultScaling,
    diagrams: {
      erd: `erDiagram
    ENTITY {
        uuid id PK
        timestamp created_at
        timestamp updated_at
    }`,
      architecture: `flowchart TB
    Client --> Gateway[API Gateway]
    Gateway --> Service[Core Service]
    Service --> DB[(Database)]`,
      sequence: `sequenceDiagram
    participant C as Client
    participant G as Gateway
    participant S as Service
    participant D as Database
    
    C->>G: Request
    G->>S: Process
    S->>D: Query
    D-->>S: Result
    S-->>G: Response
    G-->>C: Return`
    }
  };
}