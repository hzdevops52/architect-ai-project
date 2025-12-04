import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Cpu, GitBranch, MessageSquare, Zap, Shield, BarChart3, ChevronRight } from "lucide-react";
import { HeroAnimation } from "./HeroAnimation";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
};

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.12
    }
  }
};

export function LandingPage() {
  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/60 backdrop-blur-xl border-b border-border/50">
        <div className="container mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-md bg-primary flex items-center justify-center">
              <Cpu className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-semibold text-foreground tracking-tight">ArchitectAI</span>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200">
              Features
            </a>
            <a href="#how-it-works" className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200">
              How it works
            </a>
            <a href="#pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200">
              Pricing
            </a>
          </nav>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" className="text-muted-foreground">
              Sign in
            </Button>
            <Link to="/workspace">
              <Button size="sm" className="bg-foreground text-background hover:bg-foreground/90">
                Get Started
                <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-24 px-6 relative">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent" />
        
        <div className="container mx-auto max-w-6xl relative">
          <motion.div
            initial="initial"
            animate="animate"
            variants={stagger}
            className="text-center max-w-3xl mx-auto"
          >
            <motion.div variants={fadeUp} className="mb-6">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-medium">
                <Zap className="w-3 h-3" />
                AI-Powered System Design
              </span>
            </motion.div>
            
            <motion.h1
              variants={fadeUp}
              className="text-5xl md:text-6xl lg:text-7xl font-semibold text-foreground leading-[1.1] tracking-tight mb-6"
            >
              Design systems like
              <br />
              <span className="text-muted-foreground">a senior architect</span>
            </motion.h1>
            
            <motion.p
              variants={fadeUp}
              className="text-lg text-muted-foreground mb-10 max-w-xl mx-auto leading-relaxed"
            >
              Generate production-ready architectures, interactive diagrams, and get expert guidance—all from a simple description.
            </motion.p>
            
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/workspace">
                <Button size="lg" className="h-12 px-8 bg-foreground text-background hover:bg-foreground/90 text-base font-medium">
                  Start Designing
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="h-12 px-8 text-base font-medium">
                Watch Demo
              </Button>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="mt-12 flex items-center justify-center gap-8 text-sm text-muted-foreground"
            >
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                <span>Enterprise ready</span>
              </div>
              <div className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4" />
                <span>10k+ designs created</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Hero Visual */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="mt-20 relative"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10 pointer-events-none h-32 bottom-0 top-auto" />
            <div className="rounded-xl border border-border bg-card/50 backdrop-blur-sm overflow-hidden shadow-2xl shadow-primary/5">
              <div className="border-b border-border px-4 py-3 flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <span className="text-xs text-muted-foreground ml-2">ArchitectAI — Workspace</span>
              </div>
              <div className="p-6">
                <HeroAnimation />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trusted By */}
      <section className="py-16 px-6 border-y border-border/50 bg-card/30">
        <div className="container mx-auto max-w-6xl">
          <p className="text-center text-xs font-medium text-muted-foreground uppercase tracking-widest mb-8">
            Trusted by engineers at
          </p>
          <div className="flex items-center justify-center gap-12 flex-wrap opacity-40">
            {["Google", "Meta", "Amazon", "Microsoft", "Netflix"].map((company) => (
              <span key={company} className="text-lg font-semibold text-foreground">
                {company}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-6">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="text-xs font-medium text-primary uppercase tracking-widest mb-4 block">
              Features
            </span>
            <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-4 tracking-tight">
              Everything you need to master
              <br />system design
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              From architecture generation to interactive mentoring, our platform provides comprehensive tools for learning and validation.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Cpu,
                title: "Architecture Generator",
                description: "Describe any system in natural language. Get a complete, production-level architecture with microservices, data flows, and infrastructure."
              },
              {
                icon: GitBranch,
                title: "Diagram Studio",
                description: "Automatically generate ERD, sequence diagrams, and architecture visualizations. Export as PNG, PDF, or Mermaid source."
              },
              {
                icon: MessageSquare,
                title: "AI Mentor",
                description: "Ask questions about your design. Get detailed reasoning, trade-offs, and real-world industry practices from your AI mentor."
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group p-6 rounded-xl bg-card border border-border hover:border-primary/30 transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                  <feature.icon className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-medium text-foreground mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="py-24 px-6 bg-card/30 border-y border-border/50">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="text-xs font-medium text-primary uppercase tracking-widest mb-4 block">
              How it works
            </span>
            <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-4 tracking-tight">
              Three steps to a complete
              <br />system architecture
            </h2>
          </motion.div>

          <div className="space-y-0">
            {[
              {
                number: "01",
                title: "Describe your system",
                description: "Enter a natural language prompt like 'Design the backend of Uber' or pick from our library of challenges."
              },
              {
                number: "02",
                title: "Review the architecture",
                description: "Explore the complete design including microservices, databases, queues, and scaling strategies with interactive diagrams."
              },
              {
                number: "03",
                title: "Learn and iterate",
                description: "Ask the AI mentor questions, get your own designs evaluated, and export everything for documentation."
              }
            ].map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex gap-8 items-start py-8 border-b border-border/50 last:border-none"
              >
                <span className="text-5xl font-bold text-primary/20 tabular-nums">{step.number}</span>
                <div className="pt-2">
                  <h3 className="text-xl font-medium text-foreground mb-2">{step.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center p-12 rounded-2xl bg-card border border-border relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />
            <div className="relative">
              <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-4 tracking-tight">
                Ready to design like a pro?
              </h2>
              <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                Join thousands of engineers who use ArchitectAI to master system design.
              </p>
              <Link to="/workspace">
                <Button size="lg" className="h-12 px-8 bg-foreground text-background hover:bg-foreground/90">
                  Get Started Free
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-border">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2.5">
              <div className="w-6 h-6 rounded bg-primary flex items-center justify-center">
                <Cpu className="w-3.5 h-3.5 text-primary-foreground" />
              </div>
              <span className="text-sm font-medium text-foreground">ArchitectAI</span>
            </div>
            <div className="flex items-center gap-8">
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Documentation
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                GitHub
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Twitter
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Privacy
              </a>
            </div>
            <p className="text-xs text-muted-foreground">
              © 2024 ArchitectAI. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
