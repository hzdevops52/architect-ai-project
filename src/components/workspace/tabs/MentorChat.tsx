import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Bot, User, Sparkles, Copy, Check } from "lucide-react";
import { ArchitectureData } from "@/types/architecture";
import { toast } from "@/hooks/use-toast";

interface MentorChatProps {
  architecture: ArchitectureData;
}

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const mockResponses: Record<string, string> = {
  default: `Great question! Let me explain based on the architecture we've designed.

The key considerations here are:

**1. Scalability**
The system needs to handle varying loads efficiently through horizontal scaling and load balancing.

**2. Reliability**
We need fault tolerance at every layer with circuit breakers and graceful degradation.

**3. Performance**
Minimizing latency is critical—this is why we use caching layers and CDNs.

Would you like me to dive deeper into any of these aspects?`,
  redis: `Redis is used here primarily for its speed and versatility. Here's the breakdown:

**Why Redis?**
• **Sub-millisecond latency** — Critical for real-time operations
• **In-memory data store** — Perfect for caching frequent queries  
• **Pub/Sub capability** — Enables real-time notifications
• **Rich data structures** — Lists, sets, sorted sets for complex operations

**Alternatives Considered:**
• Memcached — Simpler but fewer features
• Apache Ignite — More complex setup

The trade-off is Redis requires more memory, but the performance benefits outweigh costs for this use case.`,
  scale: `For horizontal scaling, here's the recommended approach:

**Service Layer**
• Stateless microservices in containers
• Auto-scaling based on CPU/memory metrics
• Load balancing with health checks

**Database Layer**
• Read replicas for query distribution
• Sharding by user_id or geographic region
• Connection pooling to manage resources

**Caching Layer**
• Redis Cluster for distributed caching
• CDN for static content delivery

The key is ensuring no single point of failure while maintaining data consistency.`,
  kafka: `Kafka is preferred over RabbitMQ here for several reasons:

**Kafka Advantages**
• **Higher throughput** — Handles millions of events/second
• **Message persistence** — Events stored on disk, replay capability
• **Consumer groups** — Multiple consumers read independently
• **Ordering guarantees** — Messages ordered within partitions

**When to Choose RabbitMQ Instead:**
• Complex routing requirements
• Smaller scale with simpler needs
• When message acknowledgment is critical

For high event volume and audit trail needs, Kafka is the better choice.`,
};

const suggestedQuestions = [
  "Why is Redis used here?",
  "How does this scale horizontally?",
  "What are the main trade-offs?",
  "Explain the database design",
];

export function MentorChat({ architecture }: MentorChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: `Hi! I'm your AI system design mentor. I've analyzed the architecture for **"${architecture.prompt}"**.

I can help you understand:
• Why specific technologies were chosen
• How to scale individual components
• Trade-offs and alternatives
• Best practices and industry patterns

What would you like to explore?`,
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    await new Promise((resolve) => setTimeout(resolve, 1500));

    const lowerInput = input.toLowerCase();
    let response = mockResponses.default;

    if (lowerInput.includes("redis") || lowerInput.includes("cache")) {
      response = mockResponses.redis;
    } else if (lowerInput.includes("scale") || lowerInput.includes("horizontal")) {
      response = mockResponses.scale;
    } else if (lowerInput.includes("kafka") || lowerInput.includes("rabbit") || lowerInput.includes("queue")) {
      response = mockResponses.kafka;
    }

    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: "assistant",
      content: response,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, assistantMessage]);
    setIsTyping(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="h-full flex max-w-4xl mx-auto gap-6">
      {/* Chat Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4"
        >
          <h1 className="text-2xl font-semibold text-foreground tracking-tight mb-1">
            AI Mentor
          </h1>
          <p className="text-sm text-muted-foreground">
            Ask questions about your architecture design
          </p>
        </motion.div>

        {/* Messages */}
        <div className="flex-1 overflow-auto space-y-4 pb-4 pr-2">
          <AnimatePresence>
            {messages.map((message) => (
              <MessageBubble key={message.id} message={message} />
            ))}
          </AnimatePresence>

          {isTyping && <TypingIndicator />}
          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Questions */}
        {messages.length <= 2 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-wrap gap-2 mb-4"
          >
            {suggestedQuestions.map((question, i) => (
              <motion.button
                key={question}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => setInput(question)}
                className="px-3 py-1.5 rounded-full text-xs bg-secondary text-secondary-foreground border border-border hover:border-primary/30 hover:bg-secondary/80 transition-all"
              >
                {question}
              </motion.button>
            ))}
          </motion.div>
        )}

        {/* Input */}
        <div className="flex gap-3 p-1 rounded-xl bg-card border border-border">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask about the architecture..."
            className="flex-1 bg-transparent border-none focus-visible:ring-0 h-10"
          />
          <Button 
            onClick={handleSend} 
            disabled={!input.trim() || isTyping}
            size="sm"
            className="h-10 px-4 bg-foreground text-background hover:bg-foreground/90"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

function MessageBubble({ message }: { message: Message }) {
  const [copied, setCopied] = useState(false);
  const isAssistant = message.role === "assistant";

  const handleCopy = async () => {
    await navigator.clipboard.writeText(message.content);
    setCopied(true);
    toast({ title: "Message copied" });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex gap-3 ${isAssistant ? "justify-start" : "justify-end"}`}
    >
      {isAssistant && (
        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
          <Bot className="w-4 h-4 text-primary" />
        </div>
      )}
      <div className={`group max-w-[85%] ${isAssistant ? "" : "order-first"}`}>
        <div
          className={`rounded-xl px-4 py-3 ${
            isAssistant
              ? "bg-card border border-border"
              : "bg-primary text-primary-foreground"
          }`}
        >
          <div className={`text-sm leading-relaxed whitespace-pre-wrap ${isAssistant ? "prose prose-sm prose-invert max-w-none" : ""}`}>
            {message.content.split('\n').map((line, i) => {
              if (line.startsWith('**') && line.endsWith('**')) {
                return <p key={i} className="font-semibold text-foreground mt-3 first:mt-0">{line.replace(/\*\*/g, '')}</p>;
              }
              if (line.startsWith('• ')) {
                return <p key={i} className="ml-2">{line}</p>;
              }
              return <p key={i}>{line}</p>;
            })}
          </div>
        </div>
        {isAssistant && (
          <div className="flex items-center gap-2 mt-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={handleCopy}
              className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1"
            >
              {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
              {copied ? "Copied" : "Copy"}
            </button>
          </div>
        )}
      </div>
      {!isAssistant && (
        <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0">
          <User className="w-4 h-4 text-muted-foreground" />
        </div>
      )}
    </motion.div>
  );
}

function TypingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex gap-3"
    >
      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
        <Bot className="w-4 h-4 text-primary" />
      </div>
      <div className="bg-card border border-border rounded-xl px-4 py-3">
        <div className="flex gap-1.5 items-center">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
              className="w-2 h-2 bg-primary/50 rounded-full"
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
