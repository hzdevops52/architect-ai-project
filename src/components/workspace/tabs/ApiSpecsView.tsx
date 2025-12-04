import { motion } from "framer-motion";
import { ApiEndpoint } from "@/types/architecture";

interface ApiSpecsViewProps {
  endpoints: ApiEndpoint[];
}

const methodColors: Record<string, string> = {
  GET: "bg-emerald-500/10 text-emerald-400",
  POST: "bg-blue-500/10 text-blue-400",
  PUT: "bg-amber-500/10 text-amber-400",
  DELETE: "bg-red-500/10 text-red-400",
  PATCH: "bg-purple-500/10 text-purple-400",
};

export function ApiSpecsView({ endpoints }: ApiSpecsViewProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto space-y-4"
    >
      <div className="mb-6">
        <h2 className="text-lg font-medium text-foreground">API Endpoints</h2>
        <p className="text-sm text-muted-foreground">Auto-generated API specifications</p>
      </div>

      {endpoints.map((endpoint, index) => (
        <motion.div
          key={`${endpoint.method}-${endpoint.path}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
          className="rounded-xl bg-card border border-border overflow-hidden"
        >
          {/* Header */}
          <div className="px-6 py-4 border-b border-border flex items-center gap-3">
            <span
              className={`px-2 py-1 rounded text-xs font-mono font-medium ${methodColors[endpoint.method]}`}
            >
              {endpoint.method}
            </span>
            <span className="font-mono text-sm text-foreground">{endpoint.path}</span>
          </div>

          {/* Content */}
          <div className="px-6 py-4 space-y-4">
            <p className="text-sm text-muted-foreground">{endpoint.description}</p>

            {endpoint.requestBody && (
              <div>
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide block mb-2">
                  Request Body
                </span>
                <pre className="p-3 rounded-lg bg-background border border-border text-sm font-mono text-foreground overflow-x-auto">
                  {endpoint.requestBody}
                </pre>
              </div>
            )}

            {endpoint.responseModel && (
              <div>
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide block mb-2">
                  Response
                </span>
                <pre className="p-3 rounded-lg bg-background border border-border text-sm font-mono text-foreground overflow-x-auto">
                  {endpoint.responseModel}
                </pre>
              </div>
            )}

            {endpoint.statusCodes && endpoint.statusCodes.length > 0 && (
              <div>
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide block mb-2">
                  Status Codes
                </span>
                <div className="space-y-1">
                  {endpoint.statusCodes.map((status) => (
                    <div key={status.code} className="flex items-center gap-3 text-sm">
                      <span
                        className={`font-mono ${
                          status.code >= 200 && status.code < 300
                            ? "text-emerald-400"
                            : status.code >= 400
                            ? "text-red-400"
                            : "text-amber-400"
                        }`}
                      >
                        {status.code}
                      </span>
                      <span className="text-muted-foreground">{status.description}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
