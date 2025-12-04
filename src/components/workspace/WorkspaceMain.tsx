import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArchitectureData } from "@/types/architecture";
import { ArchitectureOverview } from "./tabs/ArchitectureOverview";
import { DiagramsView } from "./tabs/DiagramsView";
import { ApiSpecsView } from "./tabs/ApiSpecsView";
import { MentorChat } from "./tabs/MentorChat";
import { EvaluationView } from "./tabs/EvaluationView";
import { PromptInput } from "./PromptInput";
import { 
  OverviewSkeleton, 
  DiagramsSkeleton, 
  ApiSpecsSkeleton, 
  ChatSkeleton, 
  EvaluationSkeleton 
} from "./SkeletonLoaders";
import { Layout, GitBranch, Code, MessageSquare, ClipboardCheck } from "lucide-react";

interface WorkspaceMainProps {
  architecture: ArchitectureData | null;
  isLoading: boolean;
  onGenerate: (prompt: string) => void;
}

export function WorkspaceMain({ architecture, isLoading, onGenerate }: WorkspaceMainProps) {
  const [activeTab, setActiveTab] = useState("overview");

  const tabs = [
    { id: "overview", label: "Overview", icon: Layout },
    { id: "diagrams", label: "Diagrams", icon: GitBranch },
    { id: "api", label: "API Specs", icon: Code },
    { id: "mentor", label: "Mentor Chat", icon: MessageSquare },
    { id: "evaluation", label: "Evaluation", icon: ClipboardCheck },
  ];

  // Show prompt input when no architecture and not loading
  if (!architecture && !isLoading) {
    return (
      <main className="flex-1 flex flex-col overflow-hidden bg-background">
        <PromptInput onGenerate={onGenerate} isLoading={isLoading} />
      </main>
    );
  }

  return (
    <main className="flex-1 flex flex-col overflow-hidden">
      {/* Tabs Header */}
      <div className="border-b border-border bg-background">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="h-12 w-full justify-start rounded-none border-none bg-transparent px-4 gap-1">
            {tabs.map((tab) => (
              <TabsTrigger
                key={tab.id}
                value={tab.id}
                className="relative data-[state=active]:bg-secondary data-[state=active]:text-foreground text-muted-foreground rounded-lg px-4 transition-all duration-200"
              >
                <motion.div
                  className="flex items-center"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <tab.icon className="w-4 h-4 mr-2" />
                  {tab.label}
                </motion.div>
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-auto p-6">
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="h-full"
            >
              <Tabs value={activeTab} className="h-full">
                <TabsContent value="overview" className="mt-0 h-full">
                  <OverviewSkeleton />
                </TabsContent>
                <TabsContent value="diagrams" className="mt-0 h-full">
                  <DiagramsSkeleton />
                </TabsContent>
                <TabsContent value="api" className="mt-0 h-full">
                  <ApiSpecsSkeleton />
                </TabsContent>
                <TabsContent value="mentor" className="mt-0 h-full">
                  <ChatSkeleton />
                </TabsContent>
                <TabsContent value="evaluation" className="mt-0 h-full">
                  <EvaluationSkeleton />
                </TabsContent>
              </Tabs>
            </motion.div>
          ) : (
            <motion.div
              key="content"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="h-full"
            >
              <Tabs value={activeTab} className="h-full">
                <TabsContent value="overview" className="mt-0 h-full">
                  <ArchitectureOverview architecture={architecture!} />
                </TabsContent>
                <TabsContent value="diagrams" className="mt-0 h-full">
                  <DiagramsView diagrams={architecture!.diagrams} />
                </TabsContent>
                <TabsContent value="api" className="mt-0 h-full">
                  <ApiSpecsView endpoints={architecture!.apiEndpoints} />
                </TabsContent>
                <TabsContent value="mentor" className="mt-0 h-full">
                  <MentorChat architecture={architecture!} />
                </TabsContent>
                <TabsContent value="evaluation" className="mt-0 h-full">
                  <EvaluationView />
                </TabsContent>
              </Tabs>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
