import { motion } from "framer-motion";

const shimmer = {
  initial: { x: "-100%" },
  animate: { x: "100%" },
  transition: { repeat: Infinity, duration: 1.5, ease: "linear" }
};

function SkeletonLine({ width = "100%", height = "h-4", delay = 0 }: { width?: string; height?: string; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay }}
      className={`${height} rounded-md bg-secondary relative overflow-hidden`}
      style={{ width }}
    >
      <motion.div
        {...shimmer}
        className="absolute inset-0 bg-gradient-to-r from-transparent via-muted/50 to-transparent"
      />
    </motion.div>
  );
}

function SkeletonCard({ delay = 0 }: { delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      className="p-6 rounded-xl bg-card border border-border"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="w-8 h-8 rounded-lg bg-secondary relative overflow-hidden">
          <motion.div {...shimmer} className="absolute inset-0 bg-gradient-to-r from-transparent via-muted/50 to-transparent" />
        </div>
        <SkeletonLine width="40%" height="h-5" />
      </div>
      <div className="space-y-3">
        <SkeletonLine width="100%" />
        <SkeletonLine width="90%" />
        <SkeletonLine width="75%" />
      </div>
    </motion.div>
  );
}

export function OverviewSkeleton() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Summary Skeleton */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-6 rounded-xl bg-card border border-border"
      >
        <SkeletonLine width="30%" height="h-6" />
        <div className="space-y-3 mt-4">
          <SkeletonLine width="100%" />
          <SkeletonLine width="95%" />
          <SkeletonLine width="85%" />
        </div>
      </motion.div>

      {/* Services Skeleton */}
      <SkeletonCard delay={0.1} />
      
      {/* Database Skeleton */}
      <SkeletonCard delay={0.2} />
      
      {/* Scaling Skeleton */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="p-6 rounded-xl bg-card border border-border"
      >
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 rounded-lg bg-secondary relative overflow-hidden">
            <motion.div {...shimmer} className="absolute inset-0 bg-gradient-to-r from-transparent via-muted/50 to-transparent" />
          </div>
          <SkeletonLine width="35%" height="h-5" />
        </div>
        <div className="space-y-3">
          <SkeletonLine width="100%" />
          <SkeletonLine width="80%" />
        </div>
      </motion.div>
    </div>
  );
}

export function DiagramsSkeleton() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Tabs Skeleton */}
      <div className="flex gap-2">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-9 w-28 rounded-lg bg-secondary relative overflow-hidden">
            <motion.div {...shimmer} className="absolute inset-0 bg-gradient-to-r from-transparent via-muted/50 to-transparent" />
          </div>
        ))}
      </div>
      
      {/* Diagram Area Skeleton */}
      <div className="rounded-xl bg-card border border-border p-8 min-h-[400px] flex items-center justify-center">
        <div className="text-center space-y-4">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto"
          >
            <div className="w-6 h-6 rounded bg-primary/30" />
          </motion.div>
          <div className="space-y-2">
            <SkeletonLine width="160px" height="h-4" />
            <SkeletonLine width="120px" height="h-3" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function ApiSpecsSkeleton() {
  return (
    <div className="max-w-4xl mx-auto space-y-4">
      <div className="mb-6">
        <SkeletonLine width="30%" height="h-6" />
        <div className="mt-2">
          <SkeletonLine width="50%" height="h-4" />
        </div>
      </div>

      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          className="rounded-xl bg-card border border-border overflow-hidden"
        >
          <div className="px-6 py-4 border-b border-border flex items-center gap-3">
            <div className="w-12 h-6 rounded bg-secondary relative overflow-hidden">
              <motion.div {...shimmer} className="absolute inset-0 bg-gradient-to-r from-transparent via-muted/50 to-transparent" />
            </div>
            <SkeletonLine width="40%" height="h-4" />
          </div>
          <div className="px-6 py-4 space-y-3">
            <SkeletonLine width="70%" />
            <div className="p-3 rounded-lg bg-background border border-border">
              <SkeletonLine width="90%" height="h-3" />
              <div className="mt-2">
                <SkeletonLine width="80%" height="h-3" />
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export function ChatSkeleton() {
  return (
    <div className="max-w-3xl mx-auto h-full flex flex-col">
      <div className="flex-1 space-y-4">
        {/* AI Message Skeleton */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex gap-3"
        >
          <div className="w-8 h-8 rounded-lg bg-primary/10 relative overflow-hidden flex-shrink-0">
            <motion.div {...shimmer} className="absolute inset-0 bg-gradient-to-r from-transparent via-muted/30 to-transparent" />
          </div>
          <div className="flex-1 rounded-xl bg-card border border-border p-4 space-y-3">
            <SkeletonLine width="90%" />
            <SkeletonLine width="85%" />
            <SkeletonLine width="70%" />
          </div>
        </motion.div>
      </div>
      
      {/* Input Skeleton */}
      <div className="border-t border-border pt-4 mt-auto">
        <div className="flex gap-3">
          <div className="flex-1 h-10 rounded-lg bg-card border border-border relative overflow-hidden">
            <motion.div {...shimmer} className="absolute inset-0 bg-gradient-to-r from-transparent via-muted/30 to-transparent" />
          </div>
          <div className="w-20 h-10 rounded-lg bg-secondary relative overflow-hidden">
            <motion.div {...shimmer} className="absolute inset-0 bg-gradient-to-r from-transparent via-muted/50 to-transparent" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function EvaluationSkeleton() {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6">
        <SkeletonLine width="40%" height="h-6" />
        <div className="mt-2">
          <SkeletonLine width="70%" height="h-4" />
        </div>
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-xl bg-card border border-border p-4"
      >
        <div className="min-h-[200px] space-y-3">
          <SkeletonLine width="100%" height="h-4" />
          <SkeletonLine width="95%" height="h-4" />
          <SkeletonLine width="90%" height="h-4" />
          <SkeletonLine width="85%" height="h-4" />
        </div>
        <div className="mt-4">
          <div className="h-10 w-40 rounded-lg bg-secondary relative overflow-hidden">
            <motion.div {...shimmer} className="absolute inset-0 bg-gradient-to-r from-transparent via-muted/50 to-transparent" />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
