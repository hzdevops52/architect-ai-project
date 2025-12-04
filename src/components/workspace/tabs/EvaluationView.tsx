import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { 
  ClipboardCheck, 
  AlertCircle, 
  CheckCircle, 
  Lightbulb, 
  TrendingUp, 
  Sparkles,
  Target,
  ArrowRight
} from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface EvaluationResult {
  score: number;
  grade: string;
  strengths: string[];
  weaknesses: string[];
  suggestions: string[];
  missingComponents: string[];
}

const getGrade = (score: number) => {
  if (score >= 9) return { grade: "A+", color: "text-emerald-400" };
  if (score >= 8) return { grade: "A", color: "text-emerald-400" };
  if (score >= 7) return { grade: "B+", color: "text-blue-400" };
  if (score >= 6) return { grade: "B", color: "text-blue-400" };
  if (score >= 5) return { grade: "C", color: "text-amber-400" };
  return { grade: "D", color: "text-red-400" };
};

export function EvaluationView() {
  const [userDesign, setUserDesign] = useState("");
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [result, setResult] = useState<EvaluationResult | null>(null);

  const handleEvaluate = async () => {
    if (!userDesign.trim()) return;

    setIsEvaluating(true);
    await new Promise((resolve) => setTimeout(resolve, 2500));

    const score = 7.2;
    const { grade } = getGrade(score);

    setResult({
      score,
      grade,
      strengths: [
        "Good separation of concerns with microservices architecture",
        "Appropriate use of message queues for async processing",
        "Database choice aligns well with data access patterns",
      ],
      weaknesses: [
        "No caching layer mentioned — could cause latency issues at scale",
        "Single point of failure in the API gateway design",
        "Missing rate limiting and throttling mechanisms",
      ],
      suggestions: [
        "Add Redis for caching frequently accessed data",
        "Implement circuit breaker pattern for fault tolerance",
        "Consider CQRS pattern for read-heavy operations",
        "Add observability with distributed tracing (Jaeger/Zipkin)",
      ],
      missingComponents: [
        "CDN for static content",
        "Load balancer redundancy",
        "Database read replicas",
        "Monitoring & alerting",
      ],
    });
    setIsEvaluating(false);
  };

  const handleReset = () => {
    setResult(null);
    setUserDesign("");
  };

  return (
    <div className="max-w-3xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <h1 className="text-2xl font-semibold text-foreground tracking-tight mb-1">
          Design Evaluation
        </h1>
        <p className="text-sm text-muted-foreground">
          Get AI-powered feedback on your architecture design
        </p>
      </motion.div>

      <AnimatePresence mode="wait">
        {!result ? (
          <motion.div
            key="input"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <div className="rounded-xl bg-card border border-border overflow-hidden">
              <Textarea
                value={userDesign}
                onChange={(e) => setUserDesign(e.target.value)}
                placeholder={`Describe your system architecture...

Example:
• User service handles authentication with JWT
• Order service processes orders and publishes to Kafka
• Payment service integrates with Stripe API
• PostgreSQL for main data storage
• Docker containers orchestrated with Kubernetes`}
                className="min-h-[240px] resize-none bg-transparent border-none focus-visible:ring-0 text-sm p-5"
              />
              <div className="px-5 py-4 bg-secondary/30 border-t border-border flex items-center justify-between">
                <p className="text-xs text-muted-foreground">
                  Be specific about technologies, patterns, and infrastructure
                </p>
                <Button
                  onClick={handleEvaluate}
                  disabled={!userDesign.trim() || isEvaluating}
                  className="bg-foreground text-background hover:bg-foreground/90"
                >
                  {isEvaluating ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      >
                        <Sparkles className="w-4 h-4 mr-2" />
                      </motion.div>
                      Analyzing...
                    </>
                  ) : (
                    <>
                      Evaluate Design
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="results"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            {/* Score Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-6 rounded-xl bg-card border border-border"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Overall Score</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-bold text-foreground">{result.score}</span>
                    <span className="text-2xl text-muted-foreground">/10</span>
                    <span className={`text-2xl font-semibold ml-2 ${getGrade(result.score).color}`}>
                      {result.grade}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <Button variant="outline" size="sm" onClick={handleReset}>
                    Evaluate Another
                  </Button>
                </div>
              </div>
              <div className="mt-4">
                <Progress value={result.score * 10} className="h-2" />
              </div>
            </motion.div>

            {/* Results Grid */}
            <div className="grid md:grid-cols-2 gap-4">
              {/* Strengths */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="p-5 rounded-xl bg-card border border-border"
              >
                <div className="flex items-center gap-2 mb-4">
                  <div className="p-1.5 rounded-md bg-emerald-500/10">
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                  </div>
                  <h3 className="font-medium text-foreground">Strengths</h3>
                </div>
                <ul className="space-y-2.5">
                  {result.strengths.map((item, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.15 + i * 0.05 }}
                      className="text-sm text-muted-foreground flex gap-2"
                    >
                      <span className="text-emerald-400 mt-0.5">✓</span>
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>

              {/* Weaknesses */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="p-5 rounded-xl bg-card border border-border"
              >
                <div className="flex items-center gap-2 mb-4">
                  <div className="p-1.5 rounded-md bg-amber-500/10">
                    <AlertCircle className="w-4 h-4 text-amber-400" />
                  </div>
                  <h3 className="font-medium text-foreground">Areas to Improve</h3>
                </div>
                <ul className="space-y-2.5">
                  {result.weaknesses.map((item, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + i * 0.05 }}
                      className="text-sm text-muted-foreground flex gap-2"
                    >
                      <span className="text-amber-400 mt-0.5">!</span>
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </div>

            {/* Suggestions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="p-5 rounded-xl bg-card border border-border"
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="p-1.5 rounded-md bg-primary/10">
                  <Lightbulb className="w-4 h-4 text-primary" />
                </div>
                <h3 className="font-medium text-foreground">Recommendations</h3>
              </div>
              <div className="grid sm:grid-cols-2 gap-3">
                {result.suggestions.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 + i * 0.05 }}
                    className="p-3 rounded-lg bg-background border border-border text-sm text-muted-foreground"
                  >
                    {item}
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Missing Components */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="p-5 rounded-xl bg-card border border-border"
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="p-1.5 rounded-md bg-red-500/10">
                  <Target className="w-4 h-4 text-red-400" />
                </div>
                <h3 className="font-medium text-foreground">Missing Components</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {result.missingComponents.map((item, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 + i * 0.05 }}
                    className="px-3 py-1.5 rounded-full text-xs bg-red-500/10 text-red-400 border border-red-500/20"
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
