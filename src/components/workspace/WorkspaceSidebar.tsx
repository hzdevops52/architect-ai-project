import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Cpu, Sparkles, ChevronRight, Clock } from "lucide-react";
import { Link } from "react-router-dom";

interface WorkspaceSidebarProps {
  onGenerate: (prompt: string) => void;
  isLoading: boolean;
}

const examplePrompts = [
  { name: "Uber", prompt: "Design the backend architecture of Uber" },
  { name: "Netflix", prompt: "Design the streaming architecture of Netflix" },
  { name: "WhatsApp", prompt: "Design the messaging system of WhatsApp" },
  { name: "Instagram", prompt: "Design the backend architecture of Instagram" },
];

export function WorkspaceSidebar({ onGenerate, isLoading }: WorkspaceSidebarProps) {
  const [prompt, setPrompt] = useState("");
  const [history, setHistory] = useState<string[]>([]);

  const handleGenerate = () => {
    if (!prompt.trim()) return;
    onGenerate(prompt);
    if (!history.includes(prompt)) {
      setHistory(prev => [prompt, ...prev].slice(0, 5));
    }
  };

  const handleExampleClick = (examplePrompt: string) => {
    setPrompt(examplePrompt);
  };

  return (
    <aside className="w-80 border-r border-border bg-sidebar flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <Cpu className="w-4 h-4 text-primary" />
          </div>
          <span className="font-semibold text-foreground">ArchitectAI</span>
        </Link>
      </div>

      {/* Prompt Section */}
      <div className="p-4 border-b border-border">
        <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-3 block">
          Describe your system
        </label>
        <Textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Design the backend architecture of Uber..."
          className="min-h-[120px] resize-none bg-background border-border text-foreground placeholder:text-muted-foreground focus:ring-1 focus:ring-primary/50"
        />
        <Button
          onClick={handleGenerate}
          disabled={!prompt.trim() || isLoading}
          className="w-full mt-3"
          variant="hero"
        >
          {isLoading ? (
            <>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="w-4 h-4" />
              </motion.div>
              Generating...
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              Generate Architecture
            </>
          )}
        </Button>
      </div>

      {/* Examples */}
      <div className="p-4 border-b border-border">
        <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-3 block">
          Example Systems
        </label>
        <div className="space-y-1">
          {examplePrompts.map((example) => (
            <motion.button
              key={example.name}
              onClick={() => handleExampleClick(example.prompt)}
              className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors text-left group"
              whileHover={{ x: 4 }}
              transition={{ duration: 0.2 }}
            >
              <span>{example.name}</span>
              <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.button>
          ))}
        </div>
      </div>

      {/* History */}
      {history.length > 0 && (
        <div className="p-4 flex-1 overflow-auto">
          <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-3 flex items-center gap-2">
            <Clock className="w-3 h-3" />
            Recent
          </label>
          <div className="space-y-1">
            {history.map((item, i) => (
              <button
                key={i}
                onClick={() => setPrompt(item)}
                className="w-full text-left px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors truncate"
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      )}
    </aside>
  );
}
