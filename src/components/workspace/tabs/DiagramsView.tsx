import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Download, Copy, Check, ZoomIn, ZoomOut } from "lucide-react";
import mermaid from "mermaid";
import { toast } from "@/hooks/use-toast";

interface DiagramsViewProps {
  diagrams: {
    erd: string;
    architecture: string;
    sequence: string;
  };
}

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
  const [zoom, setZoom] = useState(1);

  useEffect(() => {
    const renderDiagram = async () => {
      if (containerRef.current) {
        try {
          const { svg } = await mermaid.render(`mermaid-${id}-${Date.now()}`, code);
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

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.2, 2));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.2, 0.5));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative"
    >
      <div className="absolute top-4 right-4 flex gap-2 z-10">
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button variant="panel" size="sm" onClick={handleZoomOut}>
            <ZoomOut className="w-4 h-4" />
          </Button>
        </motion.div>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button variant="panel" size="sm" onClick={handleZoomIn}>
            <ZoomIn className="w-4 h-4" />
          </Button>
        </motion.div>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button variant="panel" size="sm" onClick={handleCopy}>
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {copied ? "Copied" : "Copy"}
          </Button>
        </motion.div>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button variant="panel" size="sm" onClick={handleExport}>
            <Download className="w-4 h-4" />
            Export
          </Button>
        </motion.div>
      </div>
      <div
        ref={containerRef}
        className="p-8 pt-16 rounded-xl bg-card border border-border overflow-auto min-h-[400px] transition-transform duration-300"
        style={{ transform: `scale(${zoom})`, transformOrigin: 'top left' }}
        dangerouslySetInnerHTML={{ __html: svg }}
      />
    </motion.div>
  );
}

export function DiagramsView({ diagrams }: DiagramsViewProps) {
  const [activeTab, setActiveTab] = useState("erd");

  const tabs = [
    { id: "erd", label: "ER Diagram" },
    { id: "architecture", label: "Architecture" },
    { id: "sequence", label: "Sequence" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="h-full"
    >
      <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full">
        <TabsList className="bg-card border border-border mb-6">
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab.id}
              value={tab.id}
              className="data-[state=active]:bg-secondary data-[state=active]:text-foreground relative"
            >
              <motion.span
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {tab.label}
              </motion.span>
            </TabsTrigger>
          ))}
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
