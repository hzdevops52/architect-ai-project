import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Sparkles, ArrowRight, Command } from "lucide-react";

interface PromptInputProps {
  onGenerate: (prompt: string) => void;
  isLoading: boolean;
}

const exampleSystems = [
  { 
    name: "Uber", 
    prompt: "Design the backend architecture of Uber",
    description: "Ride-sharing, real-time tracking",
    gradient: "from-orange-500/10 to-red-500/10",
    border: "hover:border-orange-500/30"
  },
  { 
    name: "Netflix", 
    prompt: "Design the streaming architecture of Netflix",
    description: "Video streaming, recommendations",
    gradient: "from-red-500/10 to-pink-500/10",
    border: "hover:border-red-500/30"
  },
  { 
    name: "WhatsApp", 
    prompt: "Design the messaging system of WhatsApp",
    description: "Real-time messaging, E2E encryption",
    gradient: "from-green-500/10 to-emerald-500/10",
    border: "hover:border-green-500/30"
  },
  { 
    name: "Stripe", 
    prompt: "Design the payment processing architecture of Stripe",
    description: "Payment processing, fraud detection",
    gradient: "from-purple-500/10 to-indigo-500/10",
    border: "hover:border-purple-500/30"
  },
  { 
    name: "Twitter", 
    prompt: "Design the real-time feed system of Twitter",
    description: "Social feed, real-time updates",
    gradient: "from-blue-500/10 to-cyan-500/10",
    border: "hover:border-blue-500/30"
  },
  { 
    name: "Spotify", 
    prompt: "Design the music streaming architecture of Spotify",
    description: "Audio streaming, playlists",
    gradient: "from-green-500/10 to-teal-500/10",
    border: "hover:border-green-500/30"
  },
];

export function PromptInput({ onGenerate, isLoading }: PromptInputProps) {
  const [prompt, setPrompt] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleGenerate = () => {
    if (!prompt.trim() || isLoading) return;
    onGenerate(prompt);
  };

  const handleExampleClick = (examplePrompt: string) => {
    setPrompt(examplePrompt);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
      handleGenerate();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-full px-6 py-16">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-2xl"
      >
        {/* Header */}
        <div className="text-center mb-10">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="text-3xl md:text-4xl font-semibold text-foreground tracking-tight mb-3"
          >
            What would you like to design?
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-muted-foreground"
          >
            Describe any system to get a complete architecture breakdown
          </motion.p>
        </div>

        {/* Input Area */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className={`relative rounded-xl bg-card border-2 transition-all duration-300 ${
            isFocused 
              ? "border-primary shadow-lg shadow-primary/5" 
              : "border-border hover:border-border/80"
          }`}
        >
          <Textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onKeyDown={handleKeyDown}
            placeholder="e.g., Design the backend architecture of a ride-sharing platform like Uber with real-time location tracking, payment processing, and driver matching..."
            className="min-h-[120px] resize-none bg-transparent border-none text-foreground placeholder:text-muted-foreground/60 focus-visible:ring-0 text-base p-5 pb-14"
          />
          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <kbd className="px-1.5 py-0.5 rounded bg-secondary border border-border font-mono text-[10px]">
                <Command className="w-2.5 h-2.5 inline" />
              </kbd>
              <span>+</span>
              <kbd className="px-1.5 py-0.5 rounded bg-secondary border border-border font-mono text-[10px]">
                Enter
              </kbd>
              <span className="ml-1">to generate</span>
            </div>
            <Button
              onClick={handleGenerate}
              disabled={!prompt.trim() || isLoading}
              size="sm"
              className="bg-foreground text-background hover:bg-foreground/90 h-8"
            >
              {isLoading ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                  </motion.div>
                  <span className="ml-1.5">Generating...</span>
                </>
              ) : (
                <>
                  Generate
                  <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                </>
              )}
            </Button>
          </div>
        </motion.div>

        {/* Example Systems */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mt-10"
        >
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-widest mb-4 text-center">
            Or start with an example
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {exampleSystems.map((example, index) => (
              <motion.button
                key={example.name}
                onClick={() => handleExampleClick(example.prompt)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45 + index * 0.05, duration: 0.4 }}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                className={`relative p-4 rounded-xl bg-gradient-to-br ${example.gradient} border border-border ${example.border} transition-all duration-300 text-left group overflow-hidden`}
              >
                <div className="relative z-10">
                  <h3 className="font-medium text-foreground mb-0.5 group-hover:text-primary transition-colors">
                    {example.name}
                  </h3>
                  <p className="text-xs text-muted-foreground line-clamp-1">
                    {example.description}
                  </p>
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Tips */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="mt-10 text-center"
        >
          <p className="text-xs text-muted-foreground">
            <span className="text-foreground/60">Pro tip:</span> Be specific about scale, features, and constraints for better results
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
