import { motion } from "framer-motion";
import { ApiEndpoint } from "@/types/architecture";

interface ApiSpecsViewProps {
  endpoints: ApiEndpoint[];
}

const methodColors: Record<string, string> = {
  GET: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  POST: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  PUT: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  DELETE: "bg-red-500/10 text-red-400 border-red-500/20",
  PATCH: "bg-purple-500/10 text-purple-400 border-purple-500/20",
};

export function ApiSpecsView({ endpoints }: ApiSpecsViewProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-4xl mx-auto space-y-4"
    >
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <h2 className="text-lg font-medium text-foreground">API Endpoints</h2>
        <p className="text-sm text-muted-foreground">Auto-generated API specifications</p>
      </motion.div>

      {endpoints.map((endpoint, index) => (
        <motion.div
          key={`${endpoint.method}-${endpoint.path}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.08 }}
          whileHover={{ scale: 1.01, y: -2 }}
          className="rounded-xl bg-card border border-border overflow-hidden transition-shadow hover:shadow-lg hover:shadow-primary/5"
        >
          {/* Header */}
          <div className="px-6 py-4 border-b border-border flex items-center gap-3">
            <motion.span
              whileHover={{ scale: 1.05 }}
              className={`px-2.5 py-1 rounded border text-xs font-mono font-medium ${methodColors[endpoint.method]}`}
            >
              {endpoint.method}
            </motion.span>
            <span className="font-mono text-sm text-foreground">{endpoint.path}</span>
          </div>

          {/* Content */}
          <div className="px-6 py-4 space-y-4">
            <p className="text-sm text-muted-foreground">{endpoint.description}</p>

            {endpoint.requestBody && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide block mb-2">
                  Request Body
                </span>
                <pre className="p-3 rounded-lg bg-background border border-border text-sm font-mono text-foreground overflow-x-auto hover:border-primary/20 transition-colors">
                  {endpoint.requestBody}
                </pre>
              </motion.div>
            )}

            {endpoint.responseModel && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.15 }}
              >
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide block mb-2">
                  Response
                </span>
                <pre className="p-3 rounded-lg bg-background border border-border text-sm font-mono text-foreground overflow-x-auto hover:border-primary/20 transition-colors">
                  {endpoint.responseModel}
                </pre>
              </motion.div>
            )}

            {endpoint.statusCodes && endpoint.statusCodes.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide block mb-2">
                  Status Codes
                </span>
                <div className="space-y-1">
                  {endpoint.statusCodes.map((status, i) => (
                    <motion.div 
                      key={status.code} 
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + i * 0.05 }}
                      className="flex items-center gap-3 text-sm p-2 rounded hover:bg-secondary/30 transition-colors"
                    >
                      <span
                        className={`font-mono font-medium ${
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
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
