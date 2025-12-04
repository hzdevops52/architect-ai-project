import { motion } from "framer-motion";
import { ArchitectureData } from "@/types/architecture";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Server, Database, Shield, TrendingUp, Layers, Box, ChevronRight } from "lucide-react";

interface ArchitectureOverviewProps {
  architecture: ArchitectureData;
}

export function ArchitectureOverview({ architecture }: ArchitectureOverviewProps) {
  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-start justify-between"
      >
        <div>
          <h1 className="text-2xl font-semibold text-foreground tracking-tight mb-2">
            Architecture Overview
          </h1>
          <p className="text-sm text-muted-foreground max-w-2xl">
            {architecture.summary}
          </p>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        {[
          { label: "Services", value: architecture.services.length, icon: Server, color: "text-blue-400" },
          { label: "Tables", value: architecture.databases.length, icon: Database, color: "text-emerald-400" },
          { label: "Endpoints", value: architecture.apiEndpoints.length, icon: Layers, color: "text-purple-400" },
          { label: "Tech Stack", value: new Set(architecture.services.flatMap(s => s.techStack)).size, icon: Box, color: "text-amber-400" },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.15 + i * 0.05 }}
            className="p-4 rounded-xl bg-card border border-border"
          >
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg bg-secondary ${stat.color}`}>
                <stat.icon className="w-4 h-4" />
              </div>
              <div>
                <p className="text-2xl font-semibold text-foreground">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Services */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex items-center gap-2 mb-4">
          <Server className="w-4 h-4 text-primary" />
          <h2 className="text-sm font-medium text-foreground uppercase tracking-wider">Services</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {architecture.services.map((service, i) => (
            <motion.div
              key={service.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 + i * 0.05 }}
              className="group p-5 rounded-xl bg-card border border-border hover:border-primary/30 transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-medium text-foreground group-hover:text-primary transition-colors">
                    {service.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-0.5">{service.description}</p>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              
              <div className="space-y-3">
                <div>
                  <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider mb-1.5">
                    Responsibilities
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {service.responsibilities.map((r) => (
                      <Badge key={r} variant="secondary" className="text-[10px] font-normal px-2 py-0.5">
                        {r}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider mb-1.5">
                    Tech Stack
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {service.techStack.map((t) => (
                      <Badge key={t} className="text-[10px] font-normal px-2 py-0.5 bg-primary/10 text-primary hover:bg-primary/20 border-0">
                        {t}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Database Schema */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="flex items-center gap-2 mb-4">
          <Database className="w-4 h-4 text-emerald-400" />
          <h2 className="text-sm font-medium text-foreground uppercase tracking-wider">Database Schema</h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {architecture.databases.map((table, i) => (
            <motion.div
              key={table.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 + i * 0.05 }}
              className="p-4 rounded-xl bg-card border border-border"
            >
              <div className="flex items-center gap-2 mb-3 pb-2 border-b border-border">
                <div className="w-2 h-2 rounded-full bg-emerald-400" />
                <h4 className="font-mono text-sm font-medium text-foreground">{table.name}</h4>
              </div>
              <div className="space-y-1.5">
                {table.columns.map((col) => (
                  <div
                    key={col.name}
                    className="flex items-center justify-between text-xs font-mono py-1 px-2 rounded hover:bg-secondary/50 transition-colors"
                  >
                    <span className="text-foreground">{col.name}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-muted-foreground">{col.type}</span>
                      {col.constraints && (
                        <Badge variant="outline" className="text-[9px] px-1 py-0 h-4 font-normal text-primary border-primary/30">
                          {col.constraints}
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              {table.relationships && (
                <div className="mt-3 pt-2 border-t border-border">
                  <p className="text-[10px] text-muted-foreground">
                    {table.relationships.join(" • ")}
                  </p>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Scaling & Fault Tolerance */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="grid md:grid-cols-2 gap-4"
      >
        <div className="p-5 rounded-xl bg-card border border-border">
          <div className="flex items-center gap-2 mb-3">
            <div className="p-2 rounded-lg bg-blue-500/10">
              <TrendingUp className="w-4 h-4 text-blue-400" />
            </div>
            <h3 className="font-medium text-foreground">Scaling Strategy</h3>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">{architecture.scalingStrategy}</p>
        </div>

        <div className="p-5 rounded-xl bg-card border border-border">
          <div className="flex items-center gap-2 mb-3">
            <div className="p-2 rounded-lg bg-emerald-500/10">
              <Shield className="w-4 h-4 text-emerald-400" />
            </div>
            <h3 className="font-medium text-foreground">Fault Tolerance</h3>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">{architecture.faultTolerance}</p>
        </div>
      </motion.div>
    </div>
  );
}
