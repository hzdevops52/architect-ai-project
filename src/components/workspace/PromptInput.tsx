import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Sparkles, ArrowRight, Cpu } from "lucide-react";

interface PromptInputProps {
  onGenerate: (prompt: string) => void;
  isLoading: boolean;
}

const examplePrompts = [
  { name: "Uber", prompt: "Design the backend architecture of Uber", icon: "🚗" },
  { name: "Netflix", prompt: "Design the streaming architecture of Netflix", icon: "🎬" },
  { name: "WhatsApp", prompt: "Design the messaging system of WhatsApp", icon: "💬" },
  { name: "Instagram", prompt: "Design the backend architecture of Instagram", icon: "📸" },
  { name: "Spotify", prompt: "Design the music streaming architecture of Spotify", icon: "🎵" },
  { name: "Twitter", prompt: "Design the real-time feed system of Twitter", icon: "🐦" },
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
    if (e.key === "Enter" && e.metaKey) {
      handleGenerate();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-full px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
            className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-6"
          >
            <Cpu className="w-8 h-8 text-primary" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-3xl font-semibold text-foreground mb-3"
          >
            What would you like to design?
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-muted-foreground"
          >
            Describe any system and get a complete architecture breakdown
          </motion.p>
        </div>

        {/* Input Area */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className={`relative rounded-xl border-2 transition-all duration-300 ${
            isFocused 
              ? "border-primary/50 shadow-lg shadow-primary/10" 
              : "border-border hover:border-border/80"
          }`}
        >
          <Textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onKeyDown={handleKeyDown}
            placeholder="e.g., Design the backend architecture of a ride-sharing platform like Uber..."
            className="min-h-[140px] resize-none bg-card border-none text-foreground placeholder:text-muted-foreground focus-visible:ring-0 text-base p-5"
          />
          <div className="flex items-center justify-between p-3 pt-0">
            <span className="text-xs text-muted-foreground">
              Press ⌘ + Enter to generate
            </span>
            <Button
              onClick={handleGenerate}
              disabled={!prompt.trim() || isLoading}
              variant="hero"
              className="group"
            >
              <Sparkles className="w-4 h-4 transition-transform group-hover:rotate-12" />
              Generate
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </motion.div>

        {/* Example Prompts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8"
        >
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-4 text-center">
            Or try an example
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {examplePrompts.map((example, index) => (
              <motion.button
                key={example.name}
                onClick={() => handleExampleClick(example.prompt)}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + index * 0.05 }}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-3 p-4 rounded-xl bg-card border border-border hover:border-primary/30 hover:bg-card/80 transition-colors text-left group"
              >
                <span className="text-2xl">{example.icon}</span>
                <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                  {example.name}
                </span>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
