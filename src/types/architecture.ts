export interface Service {
  name: string;
  description: string;
  responsibilities: string[];
  techStack: string[];
}

export interface DatabaseTable {
  name: string;
  columns: {
    name: string;
    type: string;
    constraints?: string;
  }[];
  relationships?: string[];
}

export interface ApiEndpoint {
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  path: string;
  description: string;
  requestBody?: string;
  responseModel?: string;
  statusCodes?: { code: number; description: string }[];
}

export interface ScalingConfig {
  horizontal: {
    enabled: boolean;
    minInstances: number;
    maxInstances: number;
    targetCPU: number;
    targetMemory: number;
  };
  vertical: {
    enabled: boolean;
    cpuLimit: string;
    memoryLimit: string;
  };
}

export interface CachingStrategy {
  layer: string;
  technology: string;
  ttl: string;
  invalidation: string;
  useCase: string;
}

export interface LoadBalancing {
  type: string;
  algorithm: string;
  healthCheck: string;
  features: string[];
}

export interface PerformanceMetric {
  name: string;
  target: string;
  current: string;
  status: "healthy" | "warning" | "critical";
}

export interface ScalingData {
  overview: string;
  scalingConfig: ScalingConfig;
  cachingStrategies: CachingStrategy[];
  loadBalancing: LoadBalancing;
  performanceMetrics: PerformanceMetric[];
  optimizations: {
    category: string;
    title: string;
    description: string;
    impact: "high" | "medium" | "low";
  }[];
  bottlenecks: {
    component: string;
    issue: string;
    solution: string;
  }[];
}

export interface ArchitectureData {
  prompt: string;
  summary: string;
  services: Service[];
  databases: DatabaseTable[];
  apiEndpoints: ApiEndpoint[];
  scalingStrategy: string;
  faultTolerance: string;
  scaling: ScalingData;
  diagrams: {
    erd: string;
    architecture: string;
    sequence: string;
  };
}