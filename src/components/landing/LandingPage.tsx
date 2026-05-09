import { useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
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
  Check,
  Star,
  Shield
} from "lucide-react";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }
};

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const headerOpacity = useTransform(scrollYProgress, [0, 0.05], [0, 1]);
  const { user } = useAuth();
  const ctaTo = user ? "/workspace" : "/auth";
  const ctaLabel = user ? "Open workspace" : "Start designing";

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
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl border-b border-border/30"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/20 group-hover:shadow-primary/40 transition-shadow duration-300">
              <Cpu className="w-4.5 h-4.5 text-primary-foreground" />
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary to-accent opacity-0 group-hover:opacity-100 blur-lg transition-opacity duration-300" />
            </div>
            <span className="font-semibold text-lg tracking-tight">ArchitectAI</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-10">
            <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-primary hover:after:w-full after:transition-all after:duration-300">Features</a>
            <a href="#how-it-works" className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-primary hover:after:w-full after:transition-all after:duration-300">How it works</a>
            <a href="#pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-primary hover:after:w-full after:transition-all after:duration-300">Pricing</a>
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
              Sign in
            </Button>
            <Link to="/workspace">
              <Button size="sm" className="bg-gradient-to-r from-primary to-accent text-primary-foreground hover:opacity-90 shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all duration-300">
                Get Started
                <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden absolute top-16 left-0 right-0 bg-background/98 backdrop-blur-xl border-b border-border"
          >
            <div className="container mx-auto px-4 py-6 flex flex-col gap-4">
              <a href="#features" onClick={() => setMobileMenuOpen(false)} className="text-sm text-muted-foreground hover:text-foreground py-2 transition-colors">Features</a>
              <a href="#how-it-works" onClick={() => setMobileMenuOpen(false)} className="text-sm text-muted-foreground hover:text-foreground py-2 transition-colors">How it works</a>
              <a href="#pricing" onClick={() => setMobileMenuOpen(false)} className="text-sm text-muted-foreground hover:text-foreground py-2 transition-colors">Pricing</a>
              <div className="pt-4 flex flex-col gap-3 border-t border-border">
                <Button variant="ghost" size="sm" className="w-full justify-center">Sign in</Button>
                <Link to="/workspace" className="w-full">
                  <Button size="sm" className="w-full bg-gradient-to-r from-primary to-accent text-primary-foreground">
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
      <section className="relative pt-32 pb-24 lg:pt-44 lg:pb-36 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Gradient orbs */}
          <motion.div 
            animate={{ 
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[900px] h-[700px] bg-gradient-to-br from-primary/20 via-accent/10 to-transparent rounded-full blur-3xl" 
          />
          <motion.div 
            animate={{ 
              scale: [1, 1.15, 1],
              opacity: [0.2, 0.35, 0.2]
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-accent/15 rounded-full blur-3xl" 
          />
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.15, 0.25, 0.15]
            }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-primary/10 rounded-full blur-3xl" 
          />
          
          {/* Grid pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border)/0.3)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/0.3)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
        </div>

        <div className="container mx-auto max-w-6xl relative">
          <motion.div
            initial="initial"
            animate="animate"
            variants={stagger}
            className="text-center"
          >
            {/* Badge */}
            <motion.div variants={fadeUp} className="mb-8">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary/15 to-accent/15 border border-primary/25 text-primary text-sm font-medium backdrop-blur-sm">
                <Sparkles className="w-4 h-4" />
                AI-Powered System Design
                <span className="flex items-center gap-1 text-accent">
                  <Star className="w-3 h-3 fill-current" />
                  New
                </span>
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={fadeUp}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight mb-8"
            >
              Design systems
              <br />
              <span className="text-gradient">like a senior architect</span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              variants={fadeUp}
              className="text-lg sm:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed"
            >
              Generate production-ready architectures, interactive diagrams, and expert guidance—all from a simple description.
            </motion.p>

            {/* CTAs */}
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/workspace">
                <Button size="lg" className="h-13 px-10 bg-gradient-to-r from-primary to-accent text-primary-foreground hover:opacity-90 text-base font-semibold w-full sm:w-auto shadow-xl shadow-primary/30 hover:shadow-primary/50 transition-all duration-300 group">
                  Start Designing
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="h-13 px-10 text-base font-medium w-full sm:w-auto border-border/60 hover:bg-secondary/80 hover:border-primary/30 transition-all duration-300">
                Watch Demo
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.div
              variants={fadeUp}
              className="mt-16 flex flex-wrap items-center justify-center gap-8 sm:gap-16"
            >
              {[
                { label: "10,000+ designs created", icon: Check },
                { label: "Enterprise ready", icon: Check },
                { label: "Export to PDF/PNG", icon: Check }
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-2.5 text-sm text-muted-foreground">
                  <div className="w-5 h-5 rounded-full bg-primary/15 flex items-center justify-center">
                    <item.icon className="w-3 h-3 text-primary" />
                  </div>
                  <span>{item.label}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Hero Visual - Terminal Window */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.25, 0.4, 0.25, 1] }}
            className="mt-20 lg:mt-28"
          >
            <div className="relative mx-auto max-w-4xl">
              {/* Glow effect */}
              <div className="absolute -inset-6 bg-gradient-to-r from-primary/25 via-accent/20 to-primary/25 rounded-3xl blur-3xl opacity-60 animate-pulse-glow" />
              
              <div className="relative rounded-2xl border border-border/60 bg-card/90 backdrop-blur-xl overflow-hidden shadow-2xl shadow-background/50">
                {/* Terminal Header */}
                <div className="flex items-center gap-2 px-5 py-4 bg-secondary/60 border-b border-border/50">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/70" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                    <div className="w-3 h-3 rounded-full bg-green-500/70" />
                  </div>
                  <span className="text-xs text-muted-foreground ml-3 font-mono">architectai — workspace</span>
                </div>

                {/* Terminal Content */}
                <div className="p-6 sm:p-8 font-mono text-sm">
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <span className="text-primary font-semibold shrink-0">$</span>
                      <span className="text-foreground">architect --generate "Design the backend of Uber"</span>
                    </div>
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.9 }}
                      className="pl-6 space-y-2.5 text-muted-foreground"
                    >
                      <p className="flex items-center gap-2.5">
                        <Zap className="w-3.5 h-3.5 text-primary" />
                        Analyzing requirements...
                      </p>
                      <p className="flex items-center gap-2.5">
                        <Zap className="w-3.5 h-3.5 text-primary" />
                        Generating microservices architecture...
                      </p>
                      <p className="flex items-center gap-2.5">
                        <Zap className="w-3.5 h-3.5 text-primary" />
                        Creating database schema...
                      </p>
                      <p className="flex items-center gap-2.5">
                        <Check className="w-3.5 h-3.5 text-green-400" />
                        <span className="text-green-400">Architecture ready!</span>
                      </p>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.3 }}
                      className="mt-6 pt-5 border-t border-border/40"
                    >
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                        {[
                          { label: "Services", value: "12" },
                          { label: "APIs", value: "24" },
                          { label: "Databases", value: "4" },
                          { label: "Diagrams", value: "5" }
                        ].map((stat, i) => (
                          <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 1.4 + i * 0.1 }}
                            className="p-4 rounded-xl bg-secondary/50 border border-border/50 hover:border-primary/30 hover:bg-secondary/70 transition-all duration-300"
                          >
                            <span className="text-muted-foreground">{stat.label}</span>
                            <p className="text-xl font-bold text-foreground mt-1">{stat.value}</p>
                          </motion.div>
                        ))}
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
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 border-y border-border/30 bg-gradient-to-b from-secondary/30 to-transparent">
        <div className="container mx-auto max-w-6xl">
          <p className="text-center text-xs font-medium text-muted-foreground uppercase tracking-[0.2em] mb-10">
            Trusted by engineers at
          </p>
          <div className="flex items-center justify-center gap-10 sm:gap-14 lg:gap-20 flex-wrap">
            {["Google", "Meta", "Amazon", "Microsoft", "Netflix", "Stripe"].map((company, i) => (
              <motion.span 
                key={company} 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 0.4, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ opacity: 0.8 }}
                className="text-base sm:text-lg font-semibold text-foreground whitespace-nowrap transition-opacity duration-300 cursor-default"
              >
                {company}
              </motion.span>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16 sm:mb-20"
          >
            <span className="inline-block text-xs font-semibold text-primary uppercase tracking-[0.2em] mb-5 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
              Features
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
              Everything you need to
              <br className="hidden sm:block" />
              <span className="text-gradient">master system design</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto text-base sm:text-lg leading-relaxed">
              From architecture generation to interactive mentoring, comprehensive tools for learning and building.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative p-7 rounded-2xl bg-card/80 border border-border/60 hover:border-primary/40 transition-all duration-500 overflow-hidden"
              >
                {/* Hover gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center text-primary mb-5 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-primary/20 transition-all duration-500">
                    <feature.icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-semibold mb-3 group-hover:text-primary transition-colors duration-300">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-secondary/30 via-secondary/20 to-transparent border-y border-border/30">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16 sm:mb-20"
          >
            <span className="inline-block text-xs font-semibold text-primary uppercase tracking-[0.2em] mb-5 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
              How it works
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
              Three steps to a complete
              <br className="hidden sm:block" />
              <span className="text-gradient">system architecture</span>
            </h2>
          </motion.div>

          <div className="space-y-0">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="flex flex-col sm:flex-row gap-6 sm:gap-10 items-start py-10 border-b border-border/30 last:border-none group"
              >
                <span className="text-5xl sm:text-6xl lg:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-primary/30 to-accent/20 tabular-nums shrink-0 group-hover:from-primary/50 group-hover:to-accent/40 transition-all duration-500">{step.number}</span>
                <div className="pt-0 sm:pt-3">
                  <h3 className="text-xl sm:text-2xl font-semibold mb-3 group-hover:text-primary transition-colors duration-300">{step.title}</h3>
                  <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="pricing" className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative p-10 sm:p-14 lg:p-20 rounded-3xl bg-card/80 border border-border/60 overflow-hidden text-center"
          >
            {/* Background effects */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 pointer-events-none" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />
            
            <div className="relative z-10">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
                Ready to design like a pro?
              </h2>
              <p className="text-muted-foreground mb-10 max-w-lg mx-auto text-sm sm:text-base leading-relaxed">
                Join thousands of engineers who use ArchitectAI to master system design and ace their interviews.
              </p>
              <Link to="/workspace">
                <Button size="lg" className="h-13 px-10 bg-gradient-to-r from-primary to-accent text-primary-foreground hover:opacity-90 font-semibold shadow-xl shadow-primary/30 hover:shadow-primary/50 transition-all duration-300 group">
                  Get Started Free
                  <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-4 sm:px-6 lg:px-8 border-t border-border/30 bg-gradient-to-b from-transparent to-secondary/20">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="relative w-8 h-8 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/20">
                <Cpu className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="font-semibold">ArchitectAI</span>
            </Link>
            
            <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-10">
              {["Documentation", "GitHub", "Twitter", "Privacy"].map((link) => (
                <a 
                  key={link} 
                  href="#" 
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-primary hover:after:w-full after:transition-all after:duration-300"
                >
                  {link}
                </a>
              ))}
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