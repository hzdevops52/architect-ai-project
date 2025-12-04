import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Cpu, GitBranch, MessageSquare } from "lucide-react";
import { HeroAnimation } from "./HeroAnimation";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: "easeOut" }
};

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <Cpu className="w-4 h-4 text-primary" />
            </div>
            <span className="font-semibold text-foreground">ArchitectAI</span>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Features
            </a>
            <a href="#how-it-works" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              How it works
            </a>
          </nav>
          <Link to="/workspace">
            <Button variant="hero" size="sm">
              Get Started
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial="initial"
              animate="animate"
              variants={stagger}
              className="text-left"
            >
              <motion.div variants={fadeUp} className="mb-4">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse-soft" />
                  AI-Powered System Design
                </span>
              </motion.div>
              
              <motion.h1
                variants={fadeUp}
                className="text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground leading-tight mb-6"
              >
                AI System Design
                <br />
                <span className="text-muted-foreground">Mentor</span>
              </motion.h1>
              
              <motion.p
                variants={fadeUp}
                className="text-lg text-muted-foreground mb-8 max-w-lg"
              >
                Generate production-level architectures, diagrams, and technical insights instantly. Learn system design with an AI mentor by your side.
              </motion.p>
              
              <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
                <Link to="/workspace">
                  <Button variant="hero" size="xl">
                    Start Designing
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </Link>
                <Button variant="hero-outline" size="xl">
                  View Examples
                </Button>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <HeroAnimation />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6 bg-card/50">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-semibold text-foreground mb-4">
              Everything you need to master system design
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              From architecture generation to interactive mentoring, our platform provides comprehensive tools for learning and validation.
            </p>
          </motion.div>

          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={stagger}
            className="grid md:grid-cols-3 gap-6"
          >
            <FeatureCard
              icon={<Cpu className="w-5 h-5" />}
              title="Architecture Generator"
              description="Describe any system in natural language. Get a complete, production-level architecture with microservices, data flows, and infrastructure components."
            />
            <FeatureCard
              icon={<GitBranch className="w-5 h-5" />}
              title="Diagram Studio"
              description="Automatically generate ERD, sequence diagrams, and architecture visualizations. Export as PNG, PDF, or Mermaid source code."
            />
            <FeatureCard
              icon={<MessageSquare className="w-5 h-5" />}
              title="Mentor Chat"
              description="Ask questions about your design. Get detailed reasoning, trade-offs, and real-world industry practices from your AI mentor."
            />
          </motion.div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="py-20 px-6">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-semibold text-foreground mb-4">
              Simple workflow
            </h2>
            <p className="text-muted-foreground">
              Three steps to a complete system architecture
            </p>
          </motion.div>

          <div className="space-y-8">
            <StepItem
              number="01"
              title="Describe your system"
              description="Enter a natural language prompt like 'Design the backend architecture of Uber' or pick from our library of challenges."
            />
            <StepItem
              number="02"
              title="Review generated architecture"
              description="Explore the complete design including microservices, databases, queues, and scaling strategies with interactive diagrams."
            />
            <StepItem
              number="03"
              title="Learn and iterate"
              description="Ask the AI mentor questions, get your own designs evaluated, and export everything for documentation."
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-border">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-primary/10 flex items-center justify-center">
                <Cpu className="w-3 h-3 text-primary" />
              </div>
              <span className="text-sm text-muted-foreground">ArchitectAI</span>
            </div>
            <div className="flex items-center gap-6">
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Documentation
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                GitHub
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Twitter
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <motion.div
      variants={fadeUp}
      className="p-6 rounded-xl bg-card border border-border hover:border-primary/20 transition-colors duration-300"
    >
      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-medium text-foreground mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
    </motion.div>
  );
}

function StepItem({ number, title, description }: { number: string; title: string; description: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="flex gap-6 items-start"
    >
      <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-card border border-border flex items-center justify-center">
        <span className="text-sm font-medium text-muted-foreground">{number}</span>
      </div>
      <div>
        <h3 className="text-lg font-medium text-foreground mb-1">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </motion.div>
  );
}
