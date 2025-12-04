import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArchitectureData } from "@/types/architecture";
import { ArchitectureOverview } from "./tabs/ArchitectureOverview";
import { DiagramsView } from "./tabs/DiagramsView";
import { ApiSpecsView } from "./tabs/ApiSpecsView";
import { MentorChat } from "./tabs/MentorChat";
import { EvaluationView } from "./tabs/EvaluationView";
import { Layout, GitBranch, Code, MessageSquare, ClipboardCheck, Sparkles } from "lucide-react";

interface WorkspaceMainProps {
  architecture: ArchitectureData | null;
  isLoading: boolean;
}

export function WorkspaceMain({ architecture, isLoading }: WorkspaceMainProps) {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <main className="flex-1 flex flex-col overflow-hidden">
      {/* Tabs Header */}
      <div className="border-b border-border bg-background">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="h-12 w-full justify-start rounded-none border-none bg-transparent px-4 gap-1">
            <TabsTrigger
              value="overview"
              className="data-[state=active]:bg-secondary data-[state=active]:text-foreground text-muted-foreground rounded-lg px-4"
            >
              <Layout className="w-4 h-4 mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="diagrams"
              className="data-[state=active]:bg-secondary data-[state=active]:text-foreground text-muted-foreground rounded-lg px-4"
            >
              <GitBranch className="w-4 h-4 mr-2" />
              Diagrams
            </TabsTrigger>
            <TabsTrigger
              value="api"
              className="data-[state=active]:bg-secondary data-[state=active]:text-foreground text-muted-foreground rounded-lg px-4"
            >
              <Code className="w-4 h-4 mr-2" />
              API Specs
            </TabsTrigger>
            <TabsTrigger
              value="mentor"
              className="data-[state=active]:bg-secondary data-[state=active]:text-foreground text-muted-foreground rounded-lg px-4"
            >
              <MessageSquare className="w-4 h-4 mr-2" />
              Mentor Chat
            </TabsTrigger>
            <TabsTrigger
              value="evaluation"
              className="data-[state=active]:bg-secondary data-[state=active]:text-foreground text-muted-foreground rounded-lg px-4"
            >
              <ClipboardCheck className="w-4 h-4 mr-2" />
              Evaluation
            </TabsTrigger>
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
              className="flex flex-col items-center justify-center h-full"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4"
              >
                <Sparkles className="w-6 h-6 text-primary" />
              </motion.div>
              <p className="text-muted-foreground">Generating architecture...</p>
            </motion.div>
          ) : !architecture ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center h-full text-center"
            >
              <div className="w-16 h-16 rounded-2xl bg-card border border-border flex items-center justify-center mb-4">
                <Layout className="w-8 h-8 text-muted-foreground" />
              </div>
              <h2 className="text-xl font-medium text-foreground mb-2">
                No architecture generated
              </h2>
              <p className="text-muted-foreground max-w-md">
                Enter a system description in the sidebar and click "Generate Architecture" to get started.
              </p>
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
                  <ArchitectureOverview architecture={architecture} />
                </TabsContent>
                <TabsContent value="diagrams" className="mt-0 h-full">
                  <DiagramsView diagrams={architecture.diagrams} />
                </TabsContent>
                <TabsContent value="api" className="mt-0 h-full">
                  <ApiSpecsView endpoints={architecture.apiEndpoints} />
                </TabsContent>
                <TabsContent value="mentor" className="mt-0 h-full">
                  <MentorChat architecture={architecture} />
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
