import { motion } from "framer-motion";

export function HeroAnimation() {
  return (
    <div className="relative w-full aspect-square max-w-md mx-auto">
      {/* Background glow */}
      <div className="absolute inset-0 bg-primary/5 rounded-3xl blur-3xl" />
      
      {/* Main container */}
      <div className="relative w-full h-full p-8">
        {/* Central node */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-xl bg-primary/20 border border-primary/30 flex items-center justify-center"
        >
          <div className="w-8 h-8 rounded-lg bg-primary/40 flex items-center justify-center">
            <span className="text-xs font-medium text-primary-foreground">API</span>
          </div>
        </motion.div>

        {/* Surrounding nodes */}
        {[
          { label: "Auth", x: "20%", y: "15%", delay: 0.4 },
          { label: "DB", x: "75%", y: "20%", delay: 0.5 },
          { label: "Cache", x: "80%", y: "60%", delay: 0.6 },
          { label: "Queue", x: "70%", y: "85%", delay: 0.7 },
          { label: "CDN", x: "25%", y: "80%", delay: 0.8 },
          { label: "LB", x: "10%", y: "50%", delay: 0.9 },
        ].map((node, i) => (
          <motion.div
            key={node.label}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: node.delay, duration: 0.4 }}
            className="absolute"
            style={{ left: node.x, top: node.y }}
          >
            <div className="w-12 h-12 rounded-lg bg-card border border-border flex items-center justify-center hover:border-primary/30 transition-colors">
              <span className="text-[10px] font-medium text-muted-foreground">{node.label}</span>
            </div>
          </motion.div>
        ))}

        {/* Connection lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="hsl(217, 91%, 60%)" stopOpacity="0.1" />
              <stop offset="50%" stopColor="hsl(217, 91%, 60%)" stopOpacity="0.3" />
              <stop offset="100%" stopColor="hsl(217, 91%, 60%)" stopOpacity="0.1" />
            </linearGradient>
          </defs>
          {[
            { x1: "50%", y1: "50%", x2: "26%", y2: "21%" },
            { x1: "50%", y1: "50%", x2: "78%", y2: "26%" },
            { x1: "50%", y1: "50%", x2: "83%", y2: "63%" },
            { x1: "50%", y1: "50%", x2: "73%", y2: "88%" },
            { x1: "50%", y1: "50%", x2: "31%", y2: "83%" },
            { x1: "50%", y1: "50%", x2: "16%", y2: "53%" },
          ].map((line, i) => (
            <motion.line
              key={i}
              x1={line.x1}
              y1={line.y1}
              x2={line.x2}
              y2={line.y2}
              stroke="url(#lineGradient)"
              strokeWidth="1"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ delay: 0.5 + i * 0.1, duration: 0.5 }}
            />
          ))}
        </svg>

        {/* Floating particles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-primary/40"
            style={{
              left: `${20 + Math.random() * 60}%`,
              top: `${20 + Math.random() * 60}%`,
            }}
            animate={{
              opacity: [0.2, 0.6, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>
    </div>
  );
}
