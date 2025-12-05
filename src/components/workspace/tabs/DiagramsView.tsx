import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Download, Copy, Check, ZoomIn, ZoomOut, Maximize2 } from "lucide-react";
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
    primaryColor: "#14B8A6",
    primaryTextColor: "#E5EBE9",
    primaryBorderColor: "#1F3B36",
    lineColor: "#2DD4BF",
    secondaryColor: "#0F1E1B",
    tertiaryColor: "#132E27",
    background: "#0A1512",
    mainBkg: "#0F1E1B",
    nodeBorder: "#1F3B36",
    clusterBkg: "#132E27",
    clusterBorder: "#1F3B36",
    titleColor: "#E5EBE9",
    edgeLabelBackground: "#0F1E1B",
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
    toast({ title: "Mermaid code copied to clipboard" });
    setTimeout(() => setCopied(false), 2000);
  };

  const handleExport = () => {
    const svgBlob = new Blob([svg], { type: "image/svg+xml" });
    const url = URL.createObjectURL(svgBlob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${id}-diagram.svg`;
    a.click();
    URL.revokeObjectURL(url);
    toast({ title: "Diagram exported as SVG" });
  };

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.25, 2.5));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.25, 0.5));
  const handleReset = () => setZoom(1);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="h-full flex flex-col"
    >
      {/* Toolbar */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">
            Zoom: {Math.round(zoom * 100)}%
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleZoomOut} className="h-8 w-8 p-0">
            <ZoomOut className="w-3.5 h-3.5" />
          </Button>
          <Button variant="outline" size="sm" onClick={handleReset} className="h-8 w-8 p-0">
            <Maximize2 className="w-3.5 h-3.5" />
          </Button>
          <Button variant="outline" size="sm" onClick={handleZoomIn} className="h-8 w-8 p-0">
            <ZoomIn className="w-3.5 h-3.5" />
          </Button>
          <div className="w-px h-6 bg-border mx-1" />
          <Button variant="outline" size="sm" onClick={handleCopy} className="h-8">
            {copied ? <Check className="w-3.5 h-3.5 mr-1.5" /> : <Copy className="w-3.5 h-3.5 mr-1.5" />}
            {copied ? "Copied" : "Copy"}
          </Button>
          <Button variant="outline" size="sm" onClick={handleExport} className="h-8">
            <Download className="w-3.5 h-3.5 mr-1.5" />
            Export
          </Button>
        </div>
      </div>

      {/* Diagram Container */}
      <div className="flex-1 rounded-xl bg-card border border-border overflow-hidden">
        <div 
          className="h-full overflow-auto p-8"
          style={{ 
            backgroundImage: 'radial-gradient(circle at 1px 1px, hsl(var(--border)) 1px, transparent 0)',
            backgroundSize: '24px 24px'
          }}
        >
          <div
            ref={containerRef}
            className="inline-block min-w-full transition-transform duration-200 origin-top-left"
            style={{ transform: `scale(${zoom})` }}
            dangerouslySetInnerHTML={{ __html: svg }}
          />
        </div>
      </div>
    </motion.div>
  );
}

export function DiagramsView({ diagrams }: DiagramsViewProps) {
  const [activeTab, setActiveTab] = useState("architecture");

  const tabs = [
    { id: "architecture", label: "Architecture", description: "System component overview" },
    { id: "erd", label: "ER Diagram", description: "Database relationships" },
    { id: "sequence", label: "Sequence", description: "Request flow" },
  ];

  return (
    <div className="h-full flex flex-col max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <h1 className="text-2xl font-semibold text-foreground tracking-tight mb-1">
          System Diagrams
        </h1>
        <p className="text-sm text-muted-foreground">
          Visual representations of your architecture
        </p>
      </motion.div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
        <TabsList className="w-fit bg-card border border-border p-1 mb-6">
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab.id}
              value={tab.id}
              className="data-[state=active]:bg-secondary data-[state=active]:text-foreground px-4"
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        <div className="flex-1 min-h-0">
          <TabsContent value="architecture" className="mt-0 h-full">
            <MermaidDiagram code={diagrams.architecture} id="architecture" />
          </TabsContent>
          <TabsContent value="erd" className="mt-0 h-full">
            <MermaidDiagram code={diagrams.erd} id="erd" />
          </TabsContent>
          <TabsContent value="sequence" className="mt-0 h-full">
            <MermaidDiagram code={diagrams.sequence} id="sequence" />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
