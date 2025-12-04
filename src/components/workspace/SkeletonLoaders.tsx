import { motion } from "framer-motion";

function SkeletonPulse({ className }: { className?: string }) {
  return (
    <div className={`bg-secondary rounded animate-pulse ${className}`} />
  );
}

export function OverviewSkeleton() {
  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <SkeletonPulse className="h-8 w-64 mb-2" />
        <SkeletonPulse className="h-4 w-96" />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="p-4 rounded-xl bg-card border border-border"
          >
            <div className="flex items-center gap-3">
              <SkeletonPulse className="w-10 h-10 rounded-lg" />
              <div>
                <SkeletonPulse className="h-6 w-8 mb-1" />
                <SkeletonPulse className="h-3 w-16" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Services */}
      <div>
        <SkeletonPulse className="h-4 w-24 mb-4" />
        <div className="grid md:grid-cols-2 gap-4">
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.05 }}
              className="p-5 rounded-xl bg-card border border-border"
            >
              <SkeletonPulse className="h-5 w-32 mb-2" />
              <SkeletonPulse className="h-4 w-full mb-4" />
              <div className="space-y-3">
                <div>
                  <SkeletonPulse className="h-3 w-20 mb-2" />
                  <div className="flex gap-1.5">
                    {[...Array(3)].map((_, j) => (
                      <SkeletonPulse key={j} className="h-5 w-16 rounded-full" />
                    ))}
                  </div>
                </div>
                <div>
                  <SkeletonPulse className="h-3 w-16 mb-2" />
                  <div className="flex gap-1.5">
                    {[...Array(4)].map((_, j) => (
                      <SkeletonPulse key={j} className="h-5 w-14 rounded-full" />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom Cards */}
      <div className="grid md:grid-cols-2 gap-4">
        {[...Array(2)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + i * 0.05 }}
            className="p-5 rounded-xl bg-card border border-border"
          >
            <div className="flex items-center gap-2 mb-3">
              <SkeletonPulse className="w-8 h-8 rounded-lg" />
              <SkeletonPulse className="h-5 w-28" />
            </div>
            <SkeletonPulse className="h-4 w-full mb-2" />
            <SkeletonPulse className="h-4 w-4/5" />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export function DiagramsSkeleton() {
  return (
    <div className="h-full flex flex-col max-w-6xl mx-auto">
      <div className="mb-6">
        <SkeletonPulse className="h-8 w-48 mb-1" />
        <SkeletonPulse className="h-4 w-64" />
      </div>

      <div className="flex gap-2 mb-6">
        {[...Array(3)].map((_, i) => (
          <SkeletonPulse key={i} className="h-9 w-28 rounded-lg" />
        ))}
      </div>

      <div className="flex-1 rounded-xl bg-card border border-border p-8">
        <div className="h-full flex items-center justify-center">
          <div className="text-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-3"
            >
              <div className="w-5 h-5 rounded bg-primary/30" />
            </motion.div>
            <SkeletonPulse className="h-4 w-32 mx-auto" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function ApiSpecsSkeleton() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <SkeletonPulse className="h-8 w-48 mb-1" />
        <SkeletonPulse className="h-4 w-64" />
      </div>

      <div className="flex gap-4 mb-6">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="flex items-center gap-2">
            <SkeletonPulse className="h-5 w-12 rounded" />
            <SkeletonPulse className="h-4 w-4" />
          </div>
        ))}
      </div>

      <div className="space-y-3">
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="rounded-xl bg-card border border-border p-5"
          >
            <div className="flex items-center gap-4">
              <SkeletonPulse className="h-6 w-14 rounded" />
              <SkeletonPulse className="h-4 w-48" />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export function ChatSkeleton() {
  return (
    <div className="h-full flex flex-col max-w-4xl mx-auto">
      <div className="mb-4">
        <SkeletonPulse className="h-8 w-32 mb-1" />
        <SkeletonPulse className="h-4 w-56" />
      </div>

      <div className="flex-1 space-y-4">
        <div className="flex gap-3">
          <SkeletonPulse className="w-8 h-8 rounded-lg flex-shrink-0" />
          <div className="flex-1 rounded-xl bg-card border border-border p-4">
            <SkeletonPulse className="h-4 w-full mb-2" />
            <SkeletonPulse className="h-4 w-4/5 mb-2" />
            <SkeletonPulse className="h-4 w-2/3" />
          </div>
        </div>
      </div>

      <div className="flex gap-2 mb-4">
        {[...Array(4)].map((_, i) => (
          <SkeletonPulse key={i} className="h-7 w-32 rounded-full" />
        ))}
      </div>

      <div className="flex gap-3 p-1 rounded-xl bg-card border border-border">
        <SkeletonPulse className="flex-1 h-10 rounded-lg" />
        <SkeletonPulse className="w-16 h-10 rounded-lg" />
      </div>
    </div>
  );
}

export function EvaluationSkeleton() {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6">
        <SkeletonPulse className="h-8 w-48 mb-1" />
        <SkeletonPulse className="h-4 w-72" />
      </div>

      <div className="rounded-xl bg-card border border-border overflow-hidden">
        <div className="p-5">
          <SkeletonPulse className="h-48 w-full rounded-lg" />
        </div>
        <div className="px-5 py-4 bg-secondary/30 border-t border-border flex items-center justify-between">
          <SkeletonPulse className="h-4 w-64" />
          <SkeletonPulse className="h-9 w-32 rounded-lg" />
        </div>
      </div>
    </div>
  );
}
