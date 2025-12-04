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

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.4, ease: "easeOut" }
  })
};

export function ArchitectureOverview({ architecture }: ArchitectureOverviewProps) {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Summary */}
      <motion.div
        custom={0}
        initial="hidden"
        animate="visible"
        variants={cardVariants}
        whileHover={{ scale: 1.005 }}
        className="p-6 rounded-xl bg-card border border-border transition-shadow hover:shadow-lg hover:shadow-primary/5"
      >
        <h2 className="text-lg font-medium text-foreground mb-3">Architecture Summary</h2>
        <p className="text-muted-foreground leading-relaxed">{architecture.summary}</p>
      </motion.div>

      {/* Services */}
      <motion.div
        custom={1}
        initial="hidden"
        animate="visible"
        variants={cardVariants}
      >
        <Accordion type="single" collapsible defaultValue="services">
          <AccordionItem value="services" className="border border-border rounded-xl bg-card overflow-hidden">
            <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-secondary/50 transition-colors">
              <div className="flex items-center gap-3">
                <motion.div 
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center"
                >
                  <Server className="w-4 h-4 text-primary" />
                </motion.div>
                <span className="font-medium text-foreground">Services ({architecture.services.length})</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-6">
              <div className="grid gap-4 mt-2">
                {architecture.services.map((service, i) => (
                  <motion.div
                    key={service.name}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    whileHover={{ scale: 1.01, x: 4 }}
                    className="p-4 rounded-lg bg-background border border-border transition-shadow hover:shadow-md"
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
                            <motion.span
                              key={r}
                              whileHover={{ scale: 1.05 }}
                              className="px-2 py-0.5 rounded text-xs bg-secondary text-secondary-foreground cursor-default"
                            >
                              {r}
                            </motion.span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                          Tech Stack
                        </span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {service.techStack.map((t) => (
                            <motion.span
                              key={t}
                              whileHover={{ scale: 1.05 }}
                              className="px-2 py-0.5 rounded text-xs bg-primary/10 text-primary cursor-default"
                            >
                              {t}
                            </motion.span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </motion.div>

      {/* Databases */}
      <motion.div
        custom={2}
        initial="hidden"
        animate="visible"
        variants={cardVariants}
      >
        <Accordion type="single" collapsible>
          <AccordionItem value="databases" className="border border-border rounded-xl bg-card overflow-hidden">
            <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-secondary/50 transition-colors">
              <div className="flex items-center gap-3">
                <motion.div 
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center"
                >
                  <Database className="w-4 h-4 text-primary" />
                </motion.div>
                <span className="font-medium text-foreground">Database Schema ({architecture.databases.length} tables)</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-6">
              <div className="space-y-4 mt-2">
                {architecture.databases.map((table, i) => (
                  <motion.div
                    key={table.name}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    whileHover={{ scale: 1.01 }}
                    className="p-4 rounded-lg bg-background border border-border transition-shadow hover:shadow-md"
                  >
                    <h4 className="font-mono text-sm font-medium text-foreground mb-3">{table.name}</h4>
                    <div className="space-y-1">
                      {table.columns.map((col, j) => (
                        <motion.div
                          key={col.name}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: j * 0.02 }}
                          className="flex items-center gap-3 text-sm font-mono hover:bg-secondary/30 px-2 py-1 rounded transition-colors"
                        >
                          <span className="text-foreground">{col.name}</span>
                          <span className="text-muted-foreground">{col.type}</span>
                          {col.constraints && (
                            <span className="text-primary text-xs">{col.constraints}</span>
                          )}
                        </motion.div>
                      ))}
                    </div>
                    {table.relationships && (
                      <div className="mt-3 pt-3 border-t border-border">
                        <span className="text-xs text-muted-foreground">
                          {table.relationships.join(" • ")}
                        </span>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </motion.div>

      {/* Scaling Strategy */}
      <motion.div
        custom={3}
        initial="hidden"
        animate="visible"
        variants={cardVariants}
        whileHover={{ scale: 1.005 }}
        className="p-6 rounded-xl bg-card border border-border transition-shadow hover:shadow-lg hover:shadow-primary/5"
      >
        <div className="flex items-center gap-3 mb-3">
          <motion.div 
            whileHover={{ scale: 1.1 }}
            className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center"
          >
            <TrendingUp className="w-4 h-4 text-primary" />
          </motion.div>
          <h3 className="font-medium text-foreground">Scaling Strategy</h3>
        </div>
        <p className="text-muted-foreground leading-relaxed">{architecture.scalingStrategy}</p>
      </motion.div>

      {/* Fault Tolerance */}
      <motion.div
        custom={4}
        initial="hidden"
        animate="visible"
        variants={cardVariants}
        whileHover={{ scale: 1.005 }}
        className="p-6 rounded-xl bg-card border border-border transition-shadow hover:shadow-lg hover:shadow-primary/5"
      >
        <div className="flex items-center gap-3 mb-3">
          <motion.div 
            whileHover={{ scale: 1.1 }}
            className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center"
          >
            <Shield className="w-4 h-4 text-primary" />
          </motion.div>
          <h3 className="font-medium text-foreground">Fault Tolerance</h3>
        </div>
        <p className="text-muted-foreground leading-relaxed">{architecture.faultTolerance}</p>
      </motion.div>
    </div>
  );
}
