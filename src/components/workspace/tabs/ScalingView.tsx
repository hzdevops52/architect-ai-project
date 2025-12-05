import { motion } from "framer-motion";
import { ScalingData } from "@/types/architecture";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  TrendingUp, 
  Zap, 
  Database, 
  Server, 
  Gauge, 
  AlertTriangle,
  CheckCircle,
  ArrowUpRight,
  Layers,
  Activity,
  HardDrive,
  Cpu,
  MemoryStick,
  RefreshCw
} from "lucide-react";

interface ScalingViewProps {
  scaling: ScalingData;
}

const cardVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.06,
      duration: 0.4,
      ease: [0.16, 1, 0.3, 1]
    }
  })
};

const impactColors = {
  high: { bg: "bg-primary/15", text: "text-primary", border: "border-primary/25" },
  medium: { bg: "bg-accent/15", text: "text-accent", border: "border-accent/25" },
  low: { bg: "bg-muted/50", text: "text-muted-foreground", border: "border-border" }
};

const statusColors = {
  healthy: { bg: "bg-primary/15", text: "text-primary", icon: CheckCircle },
  warning: { bg: "bg-warning/15", text: "text-warning", icon: AlertTriangle },
  critical: { bg: "bg-destructive/15", text: "text-destructive", icon: AlertTriangle }
};

export function ScalingView({ scaling }: ScalingViewProps) {
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-foreground tracking-tight mb-2">
              Scaling & Optimization
            </h1>
            <p className="text-sm text-muted-foreground max-w-2xl leading-relaxed">
              {scaling.overview}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
              <Activity className="w-3 h-3 mr-1" />
              Live Metrics
            </Badge>
          </div>
        </div>
      </motion.div>

      {/* Performance Metrics */}
      <motion.div
        custom={0}
        variants={cardVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="flex items-center gap-2 mb-4">
          <Gauge className="w-4 h-4 text-primary" />
          <h2 className="text-sm font-medium text-foreground uppercase tracking-wider">Performance Metrics</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {scaling.performanceMetrics.map((metric, i) => {
            const status = statusColors[metric.status];
            const StatusIcon = status.icon;
            const progress = parseInt(metric.current) || 0;
            
            return (
              <motion.div
                key={metric.name}
                custom={i + 1}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                whileHover={{ y: -2, transition: { duration: 0.2 } }}
                className="p-4 rounded-xl bg-card border border-border hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                    {metric.name}
                  </span>
                  <div className={`p-1 rounded ${status.bg}`}>
                    <StatusIcon className={`w-3 h-3 ${status.text}`} />
                  </div>
                </div>
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="text-2xl font-bold text-foreground">{metric.current}</span>
                  <span className="text-xs text-muted-foreground">/ {metric.target}</span>
                </div>
                <Progress value={Math.min(progress, 100)} className="h-1.5" />
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Scaling Configuration */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Horizontal Scaling */}
        <motion.div
          custom={5}
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          whileHover={{ y: -2, transition: { duration: 0.2 } }}
          className="p-5 rounded-xl bg-card border border-border hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2.5 rounded-lg bg-primary/15">
              <Layers className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-medium text-foreground">Horizontal Scaling</h3>
              <p className="text-xs text-muted-foreground">Auto-scale based on demand</p>
            </div>
            <Badge className={`ml-auto ${scaling.scalingConfig.horizontal.enabled ? 'bg-primary/15 text-primary' : 'bg-muted text-muted-foreground'}`}>
              {scaling.scalingConfig.horizontal.enabled ? 'Enabled' : 'Disabled'}
            </Badge>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 rounded-lg bg-background border border-border">
              <div className="flex items-center gap-2 mb-1">
                <Server className="w-3.5 h-3.5 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">Instances</span>
              </div>
              <span className="text-lg font-semibold text-foreground">
                {scaling.scalingConfig.horizontal.minInstances} - {scaling.scalingConfig.horizontal.maxInstances}
              </span>
            </div>
            <div className="p-3 rounded-lg bg-background border border-border">
              <div className="flex items-center gap-2 mb-1">
                <Cpu className="w-3.5 h-3.5 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">Target CPU</span>
              </div>
              <span className="text-lg font-semibold text-foreground">{scaling.scalingConfig.horizontal.targetCPU}%</span>
            </div>
          </div>
        </motion.div>

        {/* Vertical Scaling */}
        <motion.div
          custom={6}
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          whileHover={{ y: -2, transition: { duration: 0.2 } }}
          className="p-5 rounded-xl bg-card border border-border hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5 transition-all duration-300"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2.5 rounded-lg bg-accent/15">
              <ArrowUpRight className="w-5 h-5 text-accent" />
            </div>
            <div>
              <h3 className="font-medium text-foreground">Vertical Scaling</h3>
              <p className="text-xs text-muted-foreground">Resource limits per instance</p>
            </div>
            <Badge className={`ml-auto ${scaling.scalingConfig.vertical.enabled ? 'bg-accent/15 text-accent' : 'bg-muted text-muted-foreground'}`}>
              {scaling.scalingConfig.vertical.enabled ? 'Enabled' : 'Disabled'}
            </Badge>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 rounded-lg bg-background border border-border">
              <div className="flex items-center gap-2 mb-1">
                <Cpu className="w-3.5 h-3.5 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">CPU Limit</span>
              </div>
              <span className="text-lg font-semibold text-foreground">{scaling.scalingConfig.vertical.cpuLimit}</span>
            </div>
            <div className="p-3 rounded-lg bg-background border border-border">
              <div className="flex items-center gap-2 mb-1">
                <MemoryStick className="w-3.5 h-3.5 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">Memory</span>
              </div>
              <span className="text-lg font-semibold text-foreground">{scaling.scalingConfig.vertical.memoryLimit}</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Caching Strategies */}
      <motion.div
        custom={7}
        variants={cardVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="flex items-center gap-2 mb-4">
          <Database className="w-4 h-4 text-accent" />
          <h2 className="text-sm font-medium text-foreground uppercase tracking-wider">Caching Strategies</h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {scaling.cachingStrategies.map((cache, i) => (
            <motion.div
              key={cache.layer}
              custom={i + 8}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              whileHover={{ y: -2, transition: { duration: 0.2 } }}
              className="p-4 rounded-xl bg-card border border-border hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5 transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-accent" />
                  <h4 className="font-medium text-foreground">{cache.layer}</h4>
                </div>
                <Badge variant="outline" className="text-[10px] border-accent/30 text-accent">
                  {cache.technology}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-3">{cache.useCase}</p>
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <RefreshCw className="w-3 h-3" />
                  <span>TTL: {cache.ttl}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Load Balancing */}
      <motion.div
        custom={11}
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        whileHover={{ y: -2, transition: { duration: 0.2 } }}
        className="p-5 rounded-xl bg-card border border-border hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2.5 rounded-lg bg-primary/15">
            <HardDrive className="w-5 h-5 text-primary" />
          </div>
          <div className="flex-1">
            <h3 className="font-medium text-foreground">Load Balancing</h3>
            <p className="text-xs text-muted-foreground">{scaling.loadBalancing.type} - {scaling.loadBalancing.algorithm}</p>
          </div>
          <Badge className="bg-primary/10 text-primary border-0">{scaling.loadBalancing.healthCheck}</Badge>
        </div>
        <div className="flex flex-wrap gap-2">
          {scaling.loadBalancing.features.map((feature, i) => (
            <motion.span
              key={feature}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 + i * 0.05 }}
              className="px-3 py-1.5 rounded-lg text-xs bg-secondary text-secondary-foreground border border-border"
            >
              {feature}
            </motion.span>
          ))}
        </div>
      </motion.div>

      {/* Optimizations & Bottlenecks */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Optimizations */}
        <motion.div
          custom={12}
          variants={cardVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="flex items-center gap-2 mb-4">
            <Zap className="w-4 h-4 text-primary" />
            <h2 className="text-sm font-medium text-foreground uppercase tracking-wider">Optimizations</h2>
          </div>
          <div className="space-y-3">
            {scaling.optimizations.map((opt, i) => {
              const impact = impactColors[opt.impact];
              return (
                <motion.div
                  key={opt.title}
                  custom={i + 13}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover={{ x: 4, transition: { duration: 0.2 } }}
                  className="p-4 rounded-xl bg-card border border-border hover:border-primary/30 transition-all duration-300"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">{opt.category}</span>
                      <h4 className="font-medium text-foreground">{opt.title}</h4>
                    </div>
                    <Badge className={`${impact.bg} ${impact.text} border ${impact.border} text-[10px]`}>
                      {opt.impact} impact
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{opt.description}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Bottlenecks */}
        <motion.div
          custom={16}
          variants={cardVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="w-4 h-4 text-warning" />
            <h2 className="text-sm font-medium text-foreground uppercase tracking-wider">Potential Bottlenecks</h2>
          </div>
          <div className="space-y-3">
            {scaling.bottlenecks.map((bottleneck, i) => (
              <motion.div
                key={bottleneck.component}
                custom={i + 17}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                whileHover={{ x: 4, transition: { duration: 0.2 } }}
                className="p-4 rounded-xl bg-card border border-border hover:border-warning/30 transition-all duration-300"
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 rounded-full bg-warning" />
                  <h4 className="font-medium text-foreground">{bottleneck.component}</h4>
                </div>
                <p className="text-sm text-muted-foreground mb-2">{bottleneck.issue}</p>
                <div className="flex items-start gap-2 p-2 rounded-lg bg-primary/5 border border-primary/10">
                  <CheckCircle className="w-3.5 h-3.5 text-primary mt-0.5 flex-shrink-0" />
                  <p className="text-xs text-primary">{bottleneck.solution}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}