import { useState } from "react";
import { WorkspaceSidebar } from "@/components/workspace/WorkspaceSidebar";
import { WorkspaceMain } from "@/components/workspace/WorkspaceMain";
import { ArchitectureData } from "@/types/architecture";
import { generateMockArchitecture } from "@/lib/mockData";

export default function Workspace() {
  const [architecture, setArchitecture] = useState<ArchitectureData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [history, setHistory] = useState<string[]>([]);
  const [currentPrompt, setCurrentPrompt] = useState<string>("");

  const handleGenerate = async (prompt: string) => {
    setIsLoading(true);
    setCurrentPrompt(prompt);
    
    // Add to history if not already present
    if (!history.includes(prompt)) {
      setHistory(prev => [prompt, ...prev].slice(0, 10));
    }
    
    // Simulate AI generation delay
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
    <div className="min-h-screen bg-background flex">
      <WorkspaceSidebar 
        hasArchitecture={!!architecture}
        history={history}
        onHistoryClick={handleHistoryClick}
        onReset={handleReset}
        currentPrompt={currentPrompt}
      />
      <WorkspaceMain 
        architecture={architecture} 
        isLoading={isLoading}
        onGenerate={handleGenerate}
      />
    </div>
  );
}
