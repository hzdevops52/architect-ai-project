import { useState } from "react";
import { motion } from "framer-motion";
import { ApiEndpoint } from "@/types/architecture";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Copy, Check, ChevronDown, ChevronUp } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface ApiSpecsViewProps {
  endpoints: ApiEndpoint[];
}

const methodConfig: Record<string, { bg: string; text: string; border: string }> = {
  GET: { bg: "bg-emerald-500/10", text: "text-emerald-400", border: "border-emerald-500/20" },
  POST: { bg: "bg-blue-500/10", text: "text-blue-400", border: "border-blue-500/20" },
  PUT: { bg: "bg-amber-500/10", text: "text-amber-400", border: "border-amber-500/20" },
  DELETE: { bg: "bg-red-500/10", text: "text-red-400", border: "border-red-500/20" },
  PATCH: { bg: "bg-purple-500/10", text: "text-purple-400", border: "border-purple-500/20" },
};

function EndpointCard({ endpoint, index }: { endpoint: ApiEndpoint; index: number }) {
  const [expanded, setExpanded] = useState(index === 0);
  const [copied, setCopied] = useState(false);
  const config = methodConfig[endpoint.method];

  const handleCopy = async () => {
    const spec = JSON.stringify({
      method: endpoint.method,
      path: endpoint.path,
      description: endpoint.description,
      requestBody: endpoint.requestBody,
      responseModel: endpoint.responseModel,
    }, null, 2);
    await navigator.clipboard.writeText(spec);
    setCopied(true);
    toast({ title: "Endpoint spec copied" });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="rounded-xl bg-card border border-border overflow-hidden"
    >
      {/* Header */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full px-5 py-4 flex items-center justify-between hover:bg-secondary/30 transition-colors"
      >
        <div className="flex items-center gap-4">
          <Badge className={`${config.bg} ${config.text} border ${config.border} font-mono text-xs px-2`}>
            {endpoint.method}
          </Badge>
          <span className="font-mono text-sm text-foreground">{endpoint.path}</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-muted-foreground hidden sm:block">{endpoint.description}</span>
          {expanded ? (
            <ChevronUp className="w-4 h-4 text-muted-foreground" />
          ) : (
            <ChevronDown className="w-4 h-4 text-muted-foreground" />
          )}
        </div>
      </button>

      {/* Expanded Content */}
      {expanded && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="px-5 pb-5 border-t border-border"
        >
          <div className="pt-4 space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">{endpoint.description}</p>
              <Button variant="ghost" size="sm" onClick={handleCopy} className="h-7">
                {copied ? <Check className="w-3.5 h-3.5 mr-1" /> : <Copy className="w-3.5 h-3.5 mr-1" />}
                {copied ? "Copied" : "Copy"}
              </Button>
            </div>

            {endpoint.requestBody && (
              <div>
                <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider mb-2">
                  Request Body
                </p>
                <pre className="p-4 rounded-lg bg-background border border-border text-xs font-mono text-foreground overflow-x-auto">
                  {endpoint.requestBody}
                </pre>
              </div>
            )}

            {endpoint.responseModel && (
              <div>
                <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider mb-2">
                  Response
                </p>
                <pre className="p-4 rounded-lg bg-background border border-border text-xs font-mono text-foreground overflow-x-auto">
                  {endpoint.responseModel}
                </pre>
              </div>
            )}

            {endpoint.statusCodes && endpoint.statusCodes.length > 0 && (
              <div>
                <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider mb-2">
                  Status Codes
                </p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {endpoint.statusCodes.map((status) => (
                    <div
                      key={status.code}
                      className="flex items-center gap-2 p-2 rounded-lg bg-background border border-border"
                    >
                      <span
                        className={`font-mono text-sm font-medium ${
                          status.code >= 200 && status.code < 300
                            ? "text-emerald-400"
                            : status.code >= 400
                            ? "text-red-400"
                            : "text-amber-400"
                        }`}
                      >
                        {status.code}
                      </span>
                      <span className="text-xs text-muted-foreground truncate">{status.description}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}

export function ApiSpecsView({ endpoints }: ApiSpecsViewProps) {
  const groupedEndpoints = endpoints.reduce((acc, endpoint) => {
    const base = endpoint.path.split('/').slice(0, 4).join('/');
    if (!acc[base]) acc[base] = [];
    acc[base].push(endpoint);
    return acc;
  }, {} as Record<string, ApiEndpoint[]>);

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <h1 className="text-2xl font-semibold text-foreground tracking-tight mb-1">
          API Specifications
        </h1>
        <p className="text-sm text-muted-foreground">
          {endpoints.length} endpoints auto-generated from your architecture
        </p>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex items-center gap-4 mb-6"
      >
        {Object.entries(
          endpoints.reduce((acc, e) => {
            acc[e.method] = (acc[e.method] || 0) + 1;
            return acc;
          }, {} as Record<string, number>)
        ).map(([method, count]) => {
          const config = methodConfig[method];
          return (
            <div key={method} className="flex items-center gap-2">
              <Badge className={`${config.bg} ${config.text} border ${config.border} font-mono text-xs`}>
                {method}
              </Badge>
              <span className="text-sm text-muted-foreground">{count}</span>
            </div>
          );
        })}
      </motion.div>

      {/* Endpoints */}
      <div className="space-y-3">
        {endpoints.map((endpoint, index) => (
          <EndpointCard key={`${endpoint.method}-${endpoint.path}`} endpoint={endpoint} index={index} />
        ))}
      </div>
    </div>
  );
}
