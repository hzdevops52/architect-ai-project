import { motion } from "framer-motion";
import { ArchitectureData } from "@/types/architecture";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Server, Database, Shield, TrendingUp } from "lucide-react";

interface ArchitectureOverviewProps {
  architecture: ArchitectureData;
}

export function ArchitectureOverview({ architecture }: ArchitectureOverviewProps) {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-6 rounded-xl bg-card border border-border"
      >
        <h2 className="text-lg font-medium text-foreground mb-3">Architecture Summary</h2>
        <p className="text-muted-foreground leading-relaxed">{architecture.summary}</p>
      </motion.div>

      {/* Services */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Accordion type="single" collapsible defaultValue="services">
          <AccordionItem value="services" className="border border-border rounded-xl bg-card overflow-hidden">
            <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-secondary/50">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Server className="w-4 h-4 text-primary" />
                </div>
                <span className="font-medium text-foreground">Services ({architecture.services.length})</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-6">
              <div className="grid gap-4 mt-2">
                {architecture.services.map((service, i) => (
                  <div
                    key={service.name}
                    className="p-4 rounded-lg bg-background border border-border"
                  >
                    <h4 className="font-medium text-foreground mb-1">{service.name}</h4>
                    <p className="text-sm text-muted-foreground mb-3">{service.description}</p>
                    <div className="space-y-2">
                      <div>
                        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                          Responsibilities
                        </span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {service.responsibilities.map((r) => (
                            <span
                              key={r}
                              className="px-2 py-0.5 rounded text-xs bg-secondary text-secondary-foreground"
                            >
                              {r}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                          Tech Stack
                        </span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {service.techStack.map((t) => (
                            <span
                              key={t}
                              className="px-2 py-0.5 rounded text-xs bg-primary/10 text-primary"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </motion.div>

      {/* Databases */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Accordion type="single" collapsible>
          <AccordionItem value="databases" className="border border-border rounded-xl bg-card overflow-hidden">
            <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-secondary/50">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Database className="w-4 h-4 text-primary" />
                </div>
                <span className="font-medium text-foreground">Database Schema ({architecture.databases.length} tables)</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-6">
              <div className="space-y-4 mt-2">
                {architecture.databases.map((table) => (
                  <div
                    key={table.name}
                    className="p-4 rounded-lg bg-background border border-border"
                  >
                    <h4 className="font-mono text-sm font-medium text-foreground mb-3">{table.name}</h4>
                    <div className="space-y-1">
                      {table.columns.map((col) => (
                        <div
                          key={col.name}
                          className="flex items-center gap-3 text-sm font-mono"
                        >
                          <span className="text-foreground">{col.name}</span>
                          <span className="text-muted-foreground">{col.type}</span>
                          {col.constraints && (
                            <span className="text-primary text-xs">{col.constraints}</span>
                          )}
                        </div>
                      ))}
                    </div>
                    {table.relationships && (
                      <div className="mt-3 pt-3 border-t border-border">
                        <span className="text-xs text-muted-foreground">
                          {table.relationships.join(" • ")}
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </motion.div>

      {/* Scaling Strategy */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="p-6 rounded-xl bg-card border border-border"
      >
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <TrendingUp className="w-4 h-4 text-primary" />
          </div>
          <h3 className="font-medium text-foreground">Scaling Strategy</h3>
        </div>
        <p className="text-muted-foreground leading-relaxed">{architecture.scalingStrategy}</p>
      </motion.div>

      {/* Fault Tolerance */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="p-6 rounded-xl bg-card border border-border"
      >
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <Shield className="w-4 h-4 text-primary" />
          </div>
          <h3 className="font-medium text-foreground">Fault Tolerance</h3>
        </div>
        <p className="text-muted-foreground leading-relaxed">{architecture.faultTolerance}</p>
      </motion.div>
    </div>
  );
}
