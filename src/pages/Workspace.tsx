import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Cpu } from "lucide-react";
import { Link } from "react-router-dom";
import { WorkspaceSidebar } from "@/components/workspace/WorkspaceSidebar";
import { WorkspaceMain } from "@/components/workspace/WorkspaceMain";
import { ArchitectureData } from "@/types/architecture";
import { generateMockArchitecture } from "@/lib/mockData";
import { Button } from "@/components/ui/button";

export default function Workspace() {
  const [architecture, setArchitecture] = useState<ArchitectureData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [history, setHistory] = useState<string[]>([]);
  const [currentPrompt, setCurrentPrompt] = useState<string>("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleGenerate = async (prompt: string) => {
    setIsLoading(true);
    setCurrentPrompt(prompt);
    setSidebarOpen(false);
    
    if (!history.includes(prompt)) {
      setHistory(prev => [prompt, ...prev].slice(0, 10));
    }
    
    await new Promise(resolve => setTimeout(resolve, 2500));
    const data = generateMockArchitecture(prompt);
    setArchitecture(data);
    setIsLoading(false);
  };

  const handleHistoryClick = (prompt: string) => {
    handleGenerate(prompt);
  };

  const handleReset = () => {
    setArchitecture(null);
    setCurrentPrompt("");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col lg:flex-row">
      {/* Mobile Header */}
      <header className="lg:hidden flex items-center justify-between px-4 py-3 border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-40">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
            <Cpu className="w-3.5 h-3.5 text-primary" />
          </div>
          <span className="font-semibold text-sm">ArchitectAI</span>
        </Link>
        <Button 
          variant="ghost" 
          size="sm"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2"
        >
          {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </Button>
      </header>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="lg:hidden fixed inset-0 bg-background/80 backdrop-blur-sm z-40"
              onClick={() => setSidebarOpen(false)}
            />
            <motion.div
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="lg:hidden fixed top-[57px] left-0 bottom-0 z-50 w-72 bg-background border-r border-border"
            >
              <WorkspaceSidebar 
                hasArchitecture={!!architecture}
                history={history}
                onHistoryClick={handleHistoryClick}
                onReset={handleReset}
                currentPrompt={currentPrompt}
                isMobile={true}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <WorkspaceSidebar 
          hasArchitecture={!!architecture}
          history={history}
          onHistoryClick={handleHistoryClick}
          onReset={handleReset}
          currentPrompt={currentPrompt}
        />
      </div>

      {/* Main Content */}
      <WorkspaceMain 
        architecture={architecture} 
        isLoading={isLoading}
        onGenerate={handleGenerate}
      />
    </div>
  );
}
