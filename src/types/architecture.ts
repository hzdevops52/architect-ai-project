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

export interface ArchitectureData {
  prompt: string;
  summary: string;
  services: Service[];
  databases: DatabaseTable[];
  apiEndpoints: ApiEndpoint[];
  scalingStrategy: string;
  faultTolerance: string;
  diagrams: {
    erd: string;
    architecture: string;
    sequence: string;
  };
}
