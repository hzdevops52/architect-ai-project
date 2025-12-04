import { ArchitectureData } from "@/types/architecture";

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
