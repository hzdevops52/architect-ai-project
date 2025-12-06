import { useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  ArrowRight, 
  Cpu, 
  GitBranch, 
  MessageSquare, 
  Zap, 
  Menu,
  X,
  Code2,
  Layers,
  TrendingUp,
  ChevronRight,
  Sparkles,
  Check
} from "lucide-react";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: [0.25, 0.4, 0.25, 1] }
};

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.08
    }
  }
};

export function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const headerOpacity = useTransform(scrollYProgress, [0, 0.05], [0, 1]);

  const features = [
    {
      icon: Cpu,
      title: "AI Architecture Generation",
      description: "Transform natural language into production-ready system designs with microservices, databases, and infrastructure."
    },
    {
      icon: GitBranch,
      title: "Interactive Diagrams",
      description: "Auto-generate ERD, sequence, and architecture diagrams. Export as PNG, PDF, or Mermaid source code."
    },
    {
      icon: MessageSquare,
      title: "AI Design Mentor",
      description: "Get expert guidance on architectural decisions, trade-offs, and industry best practices in real-time."
    },
    {
      icon: Code2,
      title: "API Specifications",
      description: "Complete REST and GraphQL API specs with authentication, rate limiting, and error handling patterns."
    },
    {
      icon: Layers,
      title: "Multi-View Dashboard",
      description: "Unified interface with architecture summary, diagrams, API specs, and chat analysis—all expandable."
    },
    {
      icon: TrendingUp,
      title: "Scaling Strategies",
      description: "Horizontal scaling, caching, load balancing, and performance optimization recommendations built-in."
    }
  ];

  const steps = [
    {
      number: "01",
      title: "Describe Your System",
      description: "Enter a natural language prompt like 'Design the backend of Uber' or select from our challenge library."
    },
    {
      number: "02",
      title: "Review & Explore",
      description: "Explore generated architecture including services, databases, queues, and scaling strategies with interactive diagrams."
    },
    {
      number: "03",
      title: "Learn & Export",
      description: "Ask the AI mentor questions, get your designs evaluated, and export everything for documentation."
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Header */}
      <motion.header 
        style={{ backgroundColor: `hsl(var(--background) / ${headerOpacity})` }}
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl border-b border-border/40"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
              <Cpu className="w-4 h-4 text-primary" />
            </div>
            <span className="font-semibold text-lg tracking-tight">ArchitectAI</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200">Features</a>
            <a href="#how-it-works" className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200">How it works</a>
            <a href="#pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200">Pricing</a>
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
              Sign in
            </Button>
            <Link to="/workspace">
              <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
                Get Started
                <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-muted-foreground hover:text-foreground"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden absolute top-16 left-0 right-0 bg-background/95 backdrop-blur-xl border-b border-border"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
              <a href="#features" onClick={() => setMobileMenuOpen(false)} className="text-sm text-muted-foreground hover:text-foreground py-2">Features</a>
              <a href="#how-it-works" onClick={() => setMobileMenuOpen(false)} className="text-sm text-muted-foreground hover:text-foreground py-2">How it works</a>
              <a href="#pricing" onClick={() => setMobileMenuOpen(false)} className="text-sm text-muted-foreground hover:text-foreground py-2">Pricing</a>
              <div className="pt-2 flex flex-col gap-2">
                <Button variant="ghost" size="sm" className="w-full justify-center">Sign in</Button>
                <Link to="/workspace" className="w-full">
                  <Button size="sm" className="w-full bg-primary text-primary-foreground">
                    Get Started
                    <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </motion.header>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 px-4 sm:px-6 lg:px-8">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-accent/5 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto max-w-6xl relative">
          <motion.div
            initial="initial"
            animate="animate"
            variants={stagger}
            className="text-center"
          >
            {/* Badge */}
            <motion.div variants={fadeUp} className="mb-6">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium">
                <Sparkles className="w-3.5 h-3.5" />
                AI-Powered System Design
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={fadeUp}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold leading-[1.1] tracking-tight mb-6"
            >
              Design systems
              <br />
              <span className="text-primary">like a senior architect</span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              variants={fadeUp}
              className="text-lg sm:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed"
            >
              Generate production-ready architectures, interactive diagrams, and expert guidance—all from a simple description.
            </motion.p>

            {/* CTAs */}
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/workspace">
                <Button size="lg" className="h-12 px-8 bg-primary text-primary-foreground hover:bg-primary/90 text-base font-medium w-full sm:w-auto">
                  Start Designing
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="h-12 px-8 text-base font-medium w-full sm:w-auto border-border hover:bg-secondary">
                Watch Demo
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.div
              variants={fadeUp}
              className="mt-12 flex flex-wrap items-center justify-center gap-6 sm:gap-12 text-sm text-muted-foreground"
            >
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-primary" />
                <span>10,000+ designs created</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-primary" />
                <span>Enterprise ready</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-primary" />
                <span>Export to PDF/PNG</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Hero Visual - Terminal Window */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
            className="mt-16 lg:mt-24"
          >
            <div className="relative mx-auto max-w-4xl">
              {/* Glow effect */}
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 rounded-2xl blur-2xl opacity-50" />
              
              <div className="relative rounded-xl border border-border bg-card overflow-hidden shadow-2xl">
                {/* Terminal Header */}
                <div className="flex items-center gap-2 px-4 py-3 bg-secondary/50 border-b border-border">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-destructive/60" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                    <div className="w-3 h-3 rounded-full bg-green-500/60" />
                  </div>
                  <span className="text-xs text-muted-foreground ml-2 font-mono">architectai — workspace</span>
                </div>

                {/* Terminal Content */}
                <div className="p-6 sm:p-8 font-mono text-sm">
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <span className="text-primary shrink-0">$</span>
                      <span className="text-foreground">architect --generate "Design the backend of Uber"</span>
                    </div>
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.8 }}
                      className="pl-6 space-y-2 text-muted-foreground"
                    >
                      <p className="flex items-center gap-2">
                        <Zap className="w-3.5 h-3.5 text-primary" />
                        Analyzing requirements...
                      </p>
                      <p className="flex items-center gap-2">
                        <Zap className="w-3.5 h-3.5 text-primary" />
                        Generating microservices architecture...
                      </p>
                      <p className="flex items-center gap-2">
                        <Zap className="w-3.5 h-3.5 text-primary" />
                        Creating database schema...
                      </p>
                      <p className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-green-500" />
                        Architecture ready!
                      </p>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.2 }}
                      className="mt-4 pt-4 border-t border-border/50"
                    >
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                        <div className="p-3 rounded-lg bg-secondary/50 border border-border">
                          <span className="text-muted-foreground">Services</span>
                          <p className="text-lg font-semibold text-foreground mt-1">12</p>
                        </div>
                        <div className="p-3 rounded-lg bg-secondary/50 border border-border">
                          <span className="text-muted-foreground">APIs</span>
                          <p className="text-lg font-semibold text-foreground mt-1">24</p>
                        </div>
                        <div className="p-3 rounded-lg bg-secondary/50 border border-border">
                          <span className="text-muted-foreground">Databases</span>
                          <p className="text-lg font-semibold text-foreground mt-1">4</p>
                        </div>
                        <div className="p-3 rounded-lg bg-secondary/50 border border-border">
                          <span className="text-muted-foreground">Diagrams</span>
                          <p className="text-lg font-semibold text-foreground mt-1">5</p>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trusted By */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 border-y border-border/40 bg-secondary/20">
        <div className="container mx-auto max-w-6xl">
          <p className="text-center text-xs font-medium text-muted-foreground uppercase tracking-widest mb-8">
            Trusted by engineers at
          </p>
          <div className="flex items-center justify-center gap-8 sm:gap-12 lg:gap-16 flex-wrap opacity-50">
            {["Google", "Meta", "Amazon", "Microsoft", "Netflix", "Stripe"].map((company) => (
              <span key={company} className="text-base sm:text-lg font-semibold text-foreground whitespace-nowrap">
                {company}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12 sm:mb-16"
          >
            <span className="text-xs font-medium text-primary uppercase tracking-widest mb-4 block">
              Features
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight mb-4">
              Everything you need to
              <br className="hidden sm:block" />
              <span className="text-primary">master system design</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto text-base sm:text-lg">
              From architecture generation to interactive mentoring, comprehensive tools for learning and building.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="group p-6 rounded-xl bg-card border border-border hover:border-primary/30 transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                  <feature.icon className="w-5 h-5" />
                </div>
                <h3 className="text-base sm:text-lg font-medium mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-secondary/20 border-y border-border/40">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12 sm:mb-16"
          >
            <span className="text-xs font-medium text-primary uppercase tracking-widest mb-4 block">
              How it works
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight">
              Three steps to a complete
              <br className="hidden sm:block" />
              <span className="text-primary">system architecture</span>
            </h2>
          </motion.div>

          <div className="space-y-0">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex flex-col sm:flex-row gap-4 sm:gap-8 items-start py-8 border-b border-border/40 last:border-none"
              >
                <span className="text-4xl sm:text-5xl lg:text-6xl font-bold text-primary/20 tabular-nums shrink-0">{step.number}</span>
                <div className="pt-0 sm:pt-2">
                  <h3 className="text-lg sm:text-xl font-medium mb-2">{step.title}</h3>
                  <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="pricing" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative p-8 sm:p-12 lg:p-16 rounded-2xl bg-card border border-border overflow-hidden text-center"
          >
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 pointer-events-none" />
            
            <div className="relative z-10">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight mb-4">
                Ready to design like a pro?
              </h2>
              <p className="text-muted-foreground mb-8 max-w-md mx-auto text-sm sm:text-base">
                Join thousands of engineers who use ArchitectAI to master system design and ace their interviews.
              </p>
              <Link to="/workspace">
                <Button size="lg" className="h-12 px-8 bg-primary text-primary-foreground hover:bg-primary/90 font-medium">
                  Get Started Free
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-border/40">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
                <Cpu className="w-3.5 h-3.5 text-primary" />
              </div>
              <span className="text-sm font-medium">ArchitectAI</span>
            </Link>
            
            <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8">
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Documentation</a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">GitHub</a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Twitter</a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Privacy</a>
            </div>
            
            <p className="text-xs text-muted-foreground">
              © 2024 ArchitectAI
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
