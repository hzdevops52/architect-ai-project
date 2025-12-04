import { motion } from "framer-motion";

export function HeroAnimation() {
  const nodes = [
    { id: "client", label: "Client", x: 50, y: 30, type: "external" },
    { id: "gateway", label: "API Gateway", x: 200, y: 30, type: "service" },
    { id: "auth", label: "Auth", x: 350, y: 30, type: "service" },
    { id: "users", label: "Users", x: 125, y: 120, type: "service" },
    { id: "orders", label: "Orders", x: 275, y: 120, type: "service" },
    { id: "payments", label: "Payments", x: 425, y: 120, type: "service" },
    { id: "db1", label: "PostgreSQL", x: 125, y: 210, type: "database" },
    { id: "db2", label: "MongoDB", x: 275, y: 210, type: "database" },
    { id: "cache", label: "Redis", x: 425, y: 210, type: "cache" },
    { id: "queue", label: "Kafka", x: 550, y: 120, type: "queue" },
  ];

  const connections = [
    { from: "client", to: "gateway" },
    { from: "gateway", to: "auth" },
    { from: "gateway", to: "users" },
    { from: "gateway", to: "orders" },
    { from: "orders", to: "payments" },
    { from: "users", to: "db1" },
    { from: "orders", to: "db2" },
    { from: "payments", to: "cache" },
    { from: "payments", to: "queue" },
  ];

  const getNodePosition = (id: string) => {
    const node = nodes.find(n => n.id === id);
    return node ? { x: node.x + 40, y: node.y + 15 } : { x: 0, y: 0 };
  };

  const getNodeStyle = (type: string) => {
    switch (type) {
      case "external":
        return "bg-secondary border-border";
      case "service":
        return "bg-primary/10 border-primary/30";
      case "database":
        return "bg-emerald-500/10 border-emerald-500/30";
      case "cache":
        return "bg-amber-500/10 border-amber-500/30";
      case "queue":
        return "bg-purple-500/10 border-purple-500/30";
      default:
        return "bg-secondary border-border";
    }
  };

  return (
    <div className="relative w-full h-[280px]">
      {/* Connection lines */}
      <svg className="absolute inset-0 w-full h-full">
        <defs>
          <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.3" />
            <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.1" />
          </linearGradient>
        </defs>
        {connections.map((conn, i) => {
          const from = getNodePosition(conn.from);
          const to = getNodePosition(conn.to);
          return (
            <motion.line
              key={`${conn.from}-${conn.to}`}
              x1={from.x}
              y1={from.y}
              x2={to.x}
              y2={to.y}
              stroke="url(#lineGrad)"
              strokeWidth="1.5"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 + i * 0.08 }}
            />
          );
        })}
      </svg>

      {/* Nodes */}
      {nodes.map((node, i) => (
        <motion.div
          key={node.id}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.2 + i * 0.06 }}
          className={`absolute px-3 py-1.5 rounded-md border text-xs font-medium ${getNodeStyle(node.type)}`}
          style={{ left: node.x, top: node.y }}
        >
          <span className="text-foreground/80">{node.label}</span>
        </motion.div>
      ))}

      {/* Animated data flow indicator */}
      <motion.div
        className="absolute w-2 h-2 rounded-full bg-primary"
        initial={{ x: 50, y: 37, opacity: 0 }}
        animate={{
          x: [50, 200, 275, 425, 550],
          y: [37, 37, 127, 127, 127],
          opacity: [0, 1, 1, 1, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          repeatDelay: 1,
          ease: "easeInOut",
        }}
      />
    </div>
  );
}
