import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ClipboardCheck, AlertCircle, CheckCircle, Lightbulb, TrendingUp } from "lucide-react";

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

  const handleEvaluate = async () => {
    if (!userDesign.trim()) return;

    setIsEvaluating(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Mock evaluation result
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
      <div className="mb-6">
        <h2 className="text-lg font-medium text-foreground mb-2">Evaluate Your Design</h2>
        <p className="text-sm text-muted-foreground">
          Describe your architecture and get detailed feedback with a score and improvement suggestions.
        </p>
      </div>

      {/* Input */}
      <div className="mb-6">
        <Textarea
          value={userDesign}
          onChange={(e) => setUserDesign(e.target.value)}
          placeholder="Describe your system architecture here...

Example:
- User service handles authentication with JWT
- Order service processes orders and sends to queue
- Payment service integrates with Stripe
- PostgreSQL for main data storage
- Docker containers with Kubernetes"
          className="min-h-[200px] resize-none bg-card border-border"
        />
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
                <ClipboardCheck className="w-4 h-4" />
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
      </div>

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
            <div className="p-6 rounded-xl bg-card border border-border text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-primary/10 mb-4">
                <span className="text-3xl font-bold text-primary">{result.score}</span>
                <span className="text-lg text-muted-foreground">/10</span>
              </div>
              <p className="text-muted-foreground">Overall Architecture Score</p>
            </div>

            {/* Strengths */}
            <div className="p-6 rounded-xl bg-card border border-border">
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle className="w-5 h-5 text-emerald-400" />
                <h3 className="font-medium text-foreground">Strengths</h3>
              </div>
              <ul className="space-y-2">
                {result.strengths.map((item, i) => (
                  <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                    <span className="text-emerald-400 mt-1">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Weaknesses */}
            <div className="p-6 rounded-xl bg-card border border-border">
              <div className="flex items-center gap-2 mb-4">
                <AlertCircle className="w-5 h-5 text-amber-400" />
                <h3 className="font-medium text-foreground">Areas for Improvement</h3>
              </div>
              <ul className="space-y-2">
                {result.weaknesses.map((item, i) => (
                  <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                    <span className="text-amber-400 mt-1">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Suggestions */}
            <div className="p-6 rounded-xl bg-card border border-border">
              <div className="flex items-center gap-2 mb-4">
                <Lightbulb className="w-5 h-5 text-primary" />
                <h3 className="font-medium text-foreground">Suggestions</h3>
              </div>
              <ul className="space-y-2">
                {result.suggestions.map((item, i) => (
                  <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Missing Components */}
            <div className="p-6 rounded-xl bg-card border border-border">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-5 h-5 text-red-400" />
                <h3 className="font-medium text-foreground">Missing Components</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {result.missingComponents.map((item, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 rounded-full text-sm bg-red-500/10 text-red-400"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
