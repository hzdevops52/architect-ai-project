import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Download, Copy, Check } from "lucide-react";
import mermaid from "mermaid";
import { toast } from "@/hooks/use-toast";

interface DiagramsViewProps {
  diagrams: {
    erd: string;
    architecture: string;
    sequence: string;
  };
}

// Initialize mermaid with dark theme
mermaid.initialize({
  startOnLoad: false,
  theme: "dark",
  themeVariables: {
    primaryColor: "#3B82F6",
    primaryTextColor: "#E5E7EB",
    primaryBorderColor: "#374151",
    lineColor: "#6B7280",
    secondaryColor: "#171717",
    tertiaryColor: "#1F2937",
    background: "#0D0D0D",
    mainBkg: "#171717",
    nodeBorder: "#374151",
    clusterBkg: "#1F2937",
    clusterBorder: "#374151",
    titleColor: "#E5E7EB",
    edgeLabelBackground: "#171717",
  },
  flowchart: {
    curve: "basis",
    padding: 20,
  },
});

function MermaidDiagram({ code, id }: { code: string; id: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [svg, setSvg] = useState<string>("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const renderDiagram = async () => {
      if (containerRef.current) {
        try {
          const { svg } = await mermaid.render(`mermaid-${id}`, code);
          setSvg(svg);
        } catch (error) {
          console.error("Mermaid render error:", error);
        }
      }
    };
    renderDiagram();
  }, [code, id]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    toast({ title: "Copied to clipboard" });
    setTimeout(() => setCopied(false), 2000);
  };

  const handleExport = () => {
    const svgBlob = new Blob([svg], { type: "image/svg+xml" });
    const url = URL.createObjectURL(svgBlob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `diagram-${id}.svg`;
    a.click();
    URL.revokeObjectURL(url);
    toast({ title: "Diagram exported as SVG" });
  };

  return (
    <div className="relative">
      <div className="absolute top-4 right-4 flex gap-2 z-10">
        <Button
          variant="panel"
          size="sm"
          onClick={handleCopy}
        >
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          {copied ? "Copied" : "Copy Code"}
        </Button>
        <Button
          variant="panel"
          size="sm"
          onClick={handleExport}
        >
          <Download className="w-4 h-4" />
          Export SVG
        </Button>
      </div>
      <div
        ref={containerRef}
        className="p-8 pt-16 rounded-xl bg-card border border-border overflow-auto min-h-[400px]"
        dangerouslySetInnerHTML={{ __html: svg }}
      />
    </div>
  );
}

export function DiagramsView({ diagrams }: DiagramsViewProps) {
  const [activeTab, setActiveTab] = useState("erd");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="h-full"
    >
      <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full">
        <TabsList className="bg-card border border-border mb-6">
          <TabsTrigger
            value="erd"
            className="data-[state=active]:bg-secondary data-[state=active]:text-foreground"
          >
            ER Diagram
          </TabsTrigger>
          <TabsTrigger
            value="architecture"
            className="data-[state=active]:bg-secondary data-[state=active]:text-foreground"
          >
            Architecture
          </TabsTrigger>
          <TabsTrigger
            value="sequence"
            className="data-[state=active]:bg-secondary data-[state=active]:text-foreground"
          >
            Sequence
          </TabsTrigger>
        </TabsList>

        <TabsContent value="erd" className="mt-0">
          <MermaidDiagram code={diagrams.erd} id="erd" />
        </TabsContent>
        <TabsContent value="architecture" className="mt-0">
          <MermaidDiagram code={diagrams.architecture} id="architecture" />
        </TabsContent>
        <TabsContent value="sequence" className="mt-0">
          <MermaidDiagram code={diagrams.sequence} id="sequence" />
        </TabsContent>
      </Tabs>
    </motion.div>
  );
}
