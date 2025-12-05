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
  GET: { bg: "bg-primary/15", text: "text-primary", border: "border-primary/25" },
  POST: { bg: "bg-accent/15", text: "text-accent", border: "border-accent/25" },
  PUT: { bg: "bg-warning/15", text: "text-warning", border: "border-warning/25" },
  DELETE: { bg: "bg-destructive/15", text: "text-destructive", border: "border-destructive/25" },
  PATCH: { bg: "bg-info/15", text: "text-info", border: "border-info/25" },
};

function EndpointCard({ endpoint, index }: { endpoint: ApiEndpoint; index: number }) {
  const [expanded, setExpanded] = useState(index === 0);
  const [copied, setCopied] = useState(false);
  const config = methodConfig[endpoint.method] || methodConfig.GET;

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
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -1, transition: { duration: 0.2 } }}
      className="rounded-xl bg-card border border-border overflow-hidden hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
    >
      {/* Header */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full px-5 py-4 flex items-center justify-between hover:bg-secondary/40 transition-colors duration-200"
      >
        <div className="flex items-center gap-4">
          <Badge className={`${config.bg} ${config.text} border ${config.border} font-mono text-xs px-2`}>
            {endpoint.method}
          </Badge>
          <span className="font-mono text-sm text-foreground">{endpoint.path}</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-muted-foreground hidden sm:block">{endpoint.description}</span>
          <motion.div
            animate={{ rotate: expanded ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown className="w-4 h-4 text-muted-foreground" />
          </motion.div>
        </div>
      </button>

      {/* Expanded Content */}
      {expanded && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="px-5 pb-5 border-t border-border"
        >
          <div className="pt-4 space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">{endpoint.description}</p>
              <Button variant="ghost" size="sm" onClick={handleCopy} className="h-7 hover:bg-primary/10 hover:text-primary transition-colors duration-200">
                {copied ? <Check className="w-3.5 h-3.5 mr-1" /> : <Copy className="w-3.5 h-3.5 mr-1" />}
                {copied ? "Copied" : "Copy"}
              </Button>
            </div>

            {endpoint.requestBody && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider mb-2">
                  Request Body
                </p>
                <pre className="p-4 rounded-lg bg-background border border-border text-xs font-mono text-foreground overflow-x-auto">
                  {endpoint.requestBody}
                </pre>
              </motion.div>
            )}

            {endpoint.responseModel && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
              >
                <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider mb-2">
                  Response
                </p>
                <pre className="p-4 rounded-lg bg-background border border-border text-xs font-mono text-foreground overflow-x-auto">
                  {endpoint.responseModel}
                </pre>
              </motion.div>
            )}

            {endpoint.statusCodes && endpoint.statusCodes.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider mb-2">
                  Status Codes
                </p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {endpoint.statusCodes.map((status) => (
                    <motion.div
                      key={status.code}
                      whileHover={{ scale: 1.02, transition: { duration: 0.15 } }}
                      className="flex items-center gap-2 p-2 rounded-lg bg-background border border-border hover:border-primary/20 transition-colors duration-200"
                    >
                      <span
                        className={`font-mono text-sm font-medium ${
                          status.code >= 200 && status.code < 300
                            ? "text-primary"
                            : status.code >= 400
                            ? "text-destructive"
                            : "text-warning"
                        }`}
                      >
                        {status.code}
                      </span>
                      <span className="text-xs text-muted-foreground truncate">{status.description}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}

export function ApiSpecsView({ endpoints }: ApiSpecsViewProps) {
  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
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
        transition={{ delay: 0.1, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="flex items-center gap-4 mb-6"
      >
        {Object.entries(
          endpoints.reduce((acc, e) => {
            acc[e.method] = (acc[e.method] || 0) + 1;
            return acc;
          }, {} as Record<string, number>)
        ).map(([method, count]) => {
          const config = methodConfig[method] || methodConfig.GET;
          return (
            <motion.div 
              key={method} 
              whileHover={{ scale: 1.05, transition: { duration: 0.15 } }}
              className="flex items-center gap-2"
            >
              <Badge className={`${config.bg} ${config.text} border ${config.border} font-mono text-xs`}>
                {method}
              </Badge>
              <span className="text-sm text-muted-foreground">{count}</span>
            </motion.div>
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