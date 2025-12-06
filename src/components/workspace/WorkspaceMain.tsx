import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArchitectureData } from "@/types/architecture";
import { ArchitectureOverview } from "./tabs/ArchitectureOverview";
import { DiagramsView } from "./tabs/DiagramsView";
import { ApiSpecsView } from "./tabs/ApiSpecsView";
import { MentorChat } from "./tabs/MentorChat";
import { EvaluationView } from "./tabs/EvaluationView";
import { ScalingView } from "./tabs/ScalingView";
import { PromptInput } from "./PromptInput";
import { 
  OverviewSkeleton, 
  DiagramsSkeleton, 
  ApiSpecsSkeleton, 
  ChatSkeleton, 
  EvaluationSkeleton,
  ScalingSkeleton 
} from "./SkeletonLoaders";
import { Layout, GitBranch, Code, MessageSquare, ClipboardCheck, TrendingUp } from "lucide-react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

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
    { id: "api", label: "API", icon: Code },
    { id: "scaling", label: "Scaling", icon: TrendingUp },
    { id: "mentor", label: "Mentor", icon: MessageSquare },
    { id: "evaluation", label: "Evaluate", icon: ClipboardCheck },
  ];

  if (!architecture && !isLoading) {
    return (
      <main className="flex-1 flex flex-col overflow-hidden bg-background">
        <PromptInput onGenerate={onGenerate} isLoading={isLoading} />
      </main>
    );
  }

  return (
    <main className="flex-1 flex flex-col overflow-hidden bg-background">
      {/* Tabs Header */}
      <div className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <ScrollArea className="w-full">
          <div className="px-4 sm:px-6">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="h-12 w-full justify-start rounded-none border-none bg-transparent gap-0 sm:gap-1 p-0 min-w-max">
                {tabs.map((tab) => (
                  <TabsTrigger
                    key={tab.id}
                    value={tab.id}
                    className="relative h-12 px-3 sm:px-4 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-foreground text-muted-foreground bg-transparent hover:text-foreground transition-all duration-200 shrink-0"
                  >
                    <tab.icon className="w-4 h-4 sm:mr-2" />
                    <span className="hidden sm:inline">{tab.label}</span>
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>
          <ScrollBar orientation="horizontal" className="invisible" />
        </ScrollArea>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-auto">
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="h-full p-4 sm:p-6"
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
                <TabsContent value="scaling" className="mt-0 h-full">
                  <ScalingSkeleton />
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
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="h-full"
            >
              <Tabs value={activeTab} className="h-full">
                <TabsContent value="overview" className="mt-0 h-full p-4 sm:p-6">
                  <ArchitectureOverview architecture={architecture!} />
                </TabsContent>
                <TabsContent value="diagrams" className="mt-0 h-full p-4 sm:p-6">
                  <DiagramsView diagrams={architecture!.diagrams} />
                </TabsContent>
                <TabsContent value="api" className="mt-0 h-full p-4 sm:p-6">
                  <ApiSpecsView endpoints={architecture!.apiEndpoints} />
                </TabsContent>
                <TabsContent value="scaling" className="mt-0 h-full p-4 sm:p-6">
                  <ScalingView scaling={architecture!.scaling} />
                </TabsContent>
                <TabsContent value="mentor" className="mt-0 h-full p-4 sm:p-6">
                  <MentorChat architecture={architecture!} />
                </TabsContent>
                <TabsContent value="evaluation" className="mt-0 h-full p-4 sm:p-6">
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
