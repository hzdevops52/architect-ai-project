import { useState } from "react";
import { WorkspaceSidebar } from "@/components/workspace/WorkspaceSidebar";
import { WorkspaceMain } from "@/components/workspace/WorkspaceMain";
import { ArchitectureData } from "@/types/architecture";
import { generateMockArchitecture } from "@/lib/mockData";

export default function Workspace() {
  const [architecture, setArchitecture] = useState<ArchitectureData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = async (prompt: string) => {
    setIsLoading(true);
    // Simulate AI generation delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    const data = generateMockArchitecture(prompt);
    setArchitecture(data);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-background flex">
      <WorkspaceSidebar onGenerate={handleGenerate} isLoading={isLoading} />
      <WorkspaceMain architecture={architecture} isLoading={isLoading} />
    </div>
  );
}
