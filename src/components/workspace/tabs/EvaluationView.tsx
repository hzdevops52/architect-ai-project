import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { 
  AlertCircle, 
  CheckCircle, 
  Lightbulb, 
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
  if (score >= 9) return { grade: "A+", color: "text-primary" };
  if (score >= 8) return { grade: "A", color: "text-primary" };
  if (score >= 7) return { grade: "B+", color: "text-accent" };
  if (score >= 6) return { grade: "B", color: "text-accent" };
  if (score >= 5) return { grade: "C", color: "text-warning" };
  return { grade: "D", color: "text-destructive" };
};

const cardVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.08,
      duration: 0.4,
      ease: [0.16, 1, 0.3, 1]
    }
  })
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
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
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
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="rounded-xl bg-card border border-border overflow-hidden hover:border-primary/30 transition-colors duration-300">
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
                  className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-md hover:shadow-lg hover:shadow-primary/20 transition-all duration-300"
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
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-6"
          >
            {/* Score Card */}
            <motion.div
              custom={0}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              whileHover={{ y: -2, transition: { duration: 0.2 } }}
              className="p-6 rounded-xl bg-card border border-border hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
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
                  <Button variant="outline" size="sm" onClick={handleReset} className="hover:border-primary/40 hover:bg-primary/10 transition-all duration-200">
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
                custom={1}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                whileHover={{ y: -2, transition: { duration: 0.2 } }}
                className="p-5 rounded-xl bg-card border border-border hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
              >
                <div className="flex items-center gap-2 mb-4">
                  <div className="p-1.5 rounded-md bg-primary/15">
                    <CheckCircle className="w-4 h-4 text-primary" />
                  </div>
                  <h3 className="font-medium text-foreground">Strengths</h3>
                </div>
                <ul className="space-y-2.5">
                  {result.strengths.map((item, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                      className="text-sm text-muted-foreground flex gap-2"
                    >
                      <span className="text-primary mt-0.5">✓</span>
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>

              {/* Weaknesses */}
              <motion.div
                custom={2}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                whileHover={{ y: -2, transition: { duration: 0.2 } }}
                className="p-5 rounded-xl bg-card border border-border hover:border-warning/30 hover:shadow-lg hover:shadow-warning/5 transition-all duration-300"
              >
                <div className="flex items-center gap-2 mb-4">
                  <div className="p-1.5 rounded-md bg-warning/15">
                    <AlertCircle className="w-4 h-4 text-warning" />
                  </div>
                  <h3 className="font-medium text-foreground">Areas to Improve</h3>
                </div>
                <ul className="space-y-2.5">
                  {result.weaknesses.map((item, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.35 + i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                      className="text-sm text-muted-foreground flex gap-2"
                    >
                      <span className="text-warning mt-0.5">!</span>
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </div>

            {/* Suggestions */}
            <motion.div
              custom={3}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              whileHover={{ y: -2, transition: { duration: 0.2 } }}
              className="p-5 rounded-xl bg-card border border-border hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5 transition-all duration-300"
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="p-1.5 rounded-md bg-accent/15">
                  <Lightbulb className="w-4 h-4 text-accent" />
                </div>
                <h3 className="font-medium text-foreground">Recommendations</h3>
              </div>
              <div className="grid sm:grid-cols-2 gap-3">
                {result.suggestions.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                    whileHover={{ scale: 1.01, transition: { duration: 0.2 } }}
                    className="p-3 rounded-lg bg-background border border-border hover:border-accent/30 text-sm text-muted-foreground transition-all duration-200"
                  >
                    {item}
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Missing Components */}
            <motion.div
              custom={4}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              whileHover={{ y: -2, transition: { duration: 0.2 } }}
              className="p-5 rounded-xl bg-card border border-border hover:border-destructive/30 hover:shadow-lg hover:shadow-destructive/5 transition-all duration-300"
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="p-1.5 rounded-md bg-destructive/15">
                  <Target className="w-4 h-4 text-destructive" />
                </div>
                <h3 className="font-medium text-foreground">Missing Components</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {result.missingComponents.map((item, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.45 + i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                    whileHover={{ scale: 1.05, transition: { duration: 0.15 } }}
                    className="px-3 py-1.5 rounded-full text-xs bg-destructive/10 text-destructive border border-destructive/20 cursor-default"
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