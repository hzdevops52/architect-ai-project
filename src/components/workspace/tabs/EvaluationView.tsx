import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ClipboardCheck, AlertCircle, CheckCircle, Lightbulb, TrendingUp, Sparkles } from "lucide-react";

interface EvaluationResult {
  score: number;
  strengths: string[];
  weaknesses: string[];
  suggestions: string[];
  missingComponents: string[];
}

export function EvaluationView() {
  const [userDesign, setUserDesign] = useState("");
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [result, setResult] = useState<EvaluationResult | null>(null);
  const [isFocused, setIsFocused] = useState(false);

  const handleEvaluate = async () => {
    if (!userDesign.trim()) return;

    setIsEvaluating(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setResult({
      score: 7.2,
      strengths: [
        "Good separation of concerns with microservices",
        "Appropriate use of message queues for async processing",
        "Database choice aligns with data access patterns",
      ],
      weaknesses: [
        "No caching layer mentioned - could cause latency issues",
        "Single point of failure in the API gateway",
        "Missing rate limiting and throttling mechanisms",
      ],
      suggestions: [
        "Add Redis for caching frequently accessed data",
        "Implement circuit breaker pattern for fault tolerance",
        "Consider CQRS for read-heavy operations",
        "Add observability with distributed tracing",
      ],
      missingComponents: [
        "CDN for static content",
        "Load balancer redundancy",
        "Database read replicas",
        "Monitoring and alerting system",
      ],
    });
    setIsEvaluating(false);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <h2 className="text-lg font-medium text-foreground mb-2">Evaluate Your Design</h2>
        <p className="text-sm text-muted-foreground">
          Describe your architecture and get detailed feedback with a score and improvement suggestions.
        </p>
      </motion.div>

      {/* Input */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-6"
      >
        <div className={`rounded-xl border-2 transition-all duration-300 ${
          isFocused 
            ? "border-primary/50 shadow-lg shadow-primary/10" 
            : "border-border hover:border-border/80"
        }`}>
          <Textarea
            value={userDesign}
            onChange={(e) => setUserDesign(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Describe your system architecture here...

Example:
- User service handles authentication with JWT
- Order service processes orders and sends to queue
- Payment service integrates with Stripe
- PostgreSQL for main data storage
- Docker containers with Kubernetes"
            className="min-h-[180px] resize-none bg-card border-none focus-visible:ring-0"
          />
        </div>
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button
            onClick={handleEvaluate}
            disabled={!userDesign.trim() || isEvaluating}
            className="mt-4"
            variant="hero"
          >
            {isEvaluating ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                  <Sparkles className="w-4 h-4" />
                </motion.div>
                Evaluating...
              </>
            ) : (
              <>
                <ClipboardCheck className="w-4 h-4" />
                Evaluate Design
              </>
            )}
          </Button>
        </motion.div>
      </motion.div>

      {/* Results */}
      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-4"
          >
            {/* Score */}
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
              whileHover={{ scale: 1.02 }}
              className="p-6 rounded-xl bg-card border border-border text-center"
            >
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-primary/10 mb-4"
              >
                <span className="text-3xl font-bold text-primary">{result.score}</span>
                <span className="text-lg text-muted-foreground">/10</span>
              </motion.div>
              <p className="text-muted-foreground">Overall Architecture Score</p>
            </motion.div>

            {/* Strengths */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              whileHover={{ scale: 1.005 }}
              className="p-6 rounded-xl bg-card border border-border transition-shadow hover:shadow-lg"
            >
              <div className="flex items-center gap-2 mb-4">
                <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.5 }}>
                  <CheckCircle className="w-5 h-5 text-emerald-400" />
                </motion.div>
                <h3 className="font-medium text-foreground">Strengths</h3>
              </div>
              <ul className="space-y-2">
                {result.strengths.map((item, i) => (
                  <motion.li 
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15 + i * 0.05 }}
                    className="text-sm text-muted-foreground flex items-start gap-2"
                  >
                    <span className="text-emerald-400 mt-1">•</span>
                    {item}
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Weaknesses */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              whileHover={{ scale: 1.005 }}
              className="p-6 rounded-xl bg-card border border-border transition-shadow hover:shadow-lg"
            >
              <div className="flex items-center gap-2 mb-4">
                <motion.div whileHover={{ scale: 1.2 }} transition={{ duration: 0.2 }}>
                  <AlertCircle className="w-5 h-5 text-amber-400" />
                </motion.div>
                <h3 className="font-medium text-foreground">Areas for Improvement</h3>
              </div>
              <ul className="space-y-2">
                {result.weaknesses.map((item, i) => (
                  <motion.li 
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.25 + i * 0.05 }}
                    className="text-sm text-muted-foreground flex items-start gap-2"
                  >
                    <span className="text-amber-400 mt-1">•</span>
                    {item}
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Suggestions */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              whileHover={{ scale: 1.005 }}
              className="p-6 rounded-xl bg-card border border-border transition-shadow hover:shadow-lg"
            >
              <div className="flex items-center gap-2 mb-4">
                <motion.div 
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Lightbulb className="w-5 h-5 text-primary" />
                </motion.div>
                <h3 className="font-medium text-foreground">Suggestions</h3>
              </div>
              <ul className="space-y-2">
                {result.suggestions.map((item, i) => (
                  <motion.li 
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.35 + i * 0.05 }}
                    className="text-sm text-muted-foreground flex items-start gap-2"
                  >
                    <span className="text-primary mt-1">•</span>
                    {item}
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Missing Components */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              whileHover={{ scale: 1.005 }}
              className="p-6 rounded-xl bg-card border border-border transition-shadow hover:shadow-lg"
            >
              <div className="flex items-center gap-2 mb-4">
                <motion.div whileHover={{ y: -3 }} transition={{ duration: 0.2 }}>
                  <TrendingUp className="w-5 h-5 text-red-400" />
                </motion.div>
                <h3 className="font-medium text-foreground">Missing Components</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {result.missingComponents.map((item, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.45 + i * 0.05 }}
                    whileHover={{ scale: 1.05 }}
                    className="px-3 py-1 rounded-full text-sm bg-red-500/10 text-red-400 border border-red-500/20 cursor-default"
                  >
                    {item}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
