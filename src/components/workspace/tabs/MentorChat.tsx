import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Bot, User } from "lucide-react";
import { ArchitectureData } from "@/types/architecture";

interface MentorChatProps {
  architecture: ArchitectureData;
}

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

const mockResponses: Record<string, string> = {
  default: `Great question! Let me explain based on the architecture we've designed.

The key considerations here are:
1. **Scalability** - The system needs to handle varying loads efficiently
2. **Reliability** - We need fault tolerance at every layer
3. **Performance** - Minimizing latency is critical for user experience

Would you like me to dive deeper into any of these aspects?`,
  redis: `Redis is used here primarily for its speed and versatility. Here's why:

**Why Redis?**
- **Sub-millisecond latency** - Critical for real-time operations
- **In-memory data store** - Perfect for caching frequent queries
- **Pub/Sub capability** - Enables real-time notifications
- **Data structures** - Supports lists, sets, sorted sets for complex operations

**Alternatives considered:**
- Memcached (simpler but less features)
- Apache Ignite (more complex setup)

The trade-off is Redis requires more memory, but the performance benefits outweigh the costs for this use case.`,
  scale: `For horizontal scaling, here's the approach:

**Service Layer:**
- Stateless microservices in containers
- Auto-scaling based on CPU/memory metrics
- Load balancing with health checks

**Database Layer:**
- Read replicas for query distribution
- Sharding by user_id or geographic region
- Connection pooling to manage resources

**Caching Layer:**
- Redis Cluster for distributed caching
- CDN for static content

The key is ensuring no single point of failure while maintaining data consistency.`,
  kafka: `Kafka is preferred over RabbitMQ here because:

**Kafka advantages for this architecture:**
- **Higher throughput** - Handles millions of events/second
- **Message persistence** - Events stored on disk, can replay
- **Consumer groups** - Multiple consumers can read independently
- **Ordering guarantees** - Messages ordered within partitions

**When to use RabbitMQ instead:**
- Complex routing requirements
- Smaller scale with simpler needs
- When message acknowledgment is critical

For a ride-sharing platform with high event volume and need for audit trails, Kafka is the better choice.`,
};

export function MentorChat({ architecture }: MentorChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: `Hi! I'm your AI system design mentor. I've analyzed the architecture for "${architecture.prompt}".

Feel free to ask me anything about:
- Why specific technologies were chosen
- How to scale individual components
- Trade-offs and alternatives
- Best practices and industry patterns

What would you like to explore?`,
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
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate AI response
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const lowerInput = input.toLowerCase();
    let response = mockResponses.default;

    if (lowerInput.includes("redis") || lowerInput.includes("cache")) {
      response = mockResponses.redis;
    } else if (lowerInput.includes("scale") || lowerInput.includes("horizontal")) {
      response = mockResponses.scale;
    } else if (lowerInput.includes("kafka") || lowerInput.includes("rabbit")) {
      response = mockResponses.kafka;
    }

    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: "assistant",
      content: response,
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
    <div className="h-full flex flex-col max-w-3xl mx-auto">
      {/* Messages */}
      <div className="flex-1 overflow-auto space-y-4 pb-4">
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className={`flex gap-3 ${
                message.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {message.role === "assistant" && (
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Bot className="w-4 h-4 text-primary" />
                </div>
              )}
              <div
                className={`max-w-[80%] rounded-xl px-4 py-3 ${
                  message.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-card border border-border text-foreground"
                }`}
              >
                <div className="text-sm whitespace-pre-wrap leading-relaxed">
                  {message.content}
                </div>
              </div>
              {message.role === "user" && (
                <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0">
                  <User className="w-4 h-4 text-muted-foreground" />
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>

        {isTyping && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex gap-3"
          >
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <Bot className="w-4 h-4 text-primary" />
            </div>
            <div className="bg-card border border-border rounded-xl px-4 py-3">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse" />
                <span className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse" style={{ animationDelay: "0.2s" }} />
                <span className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse" style={{ animationDelay: "0.4s" }} />
              </div>
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="border-t border-border pt-4">
        <div className="flex gap-3">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask about the architecture..."
            className="flex-1 bg-card border-border"
          />
          <Button onClick={handleSend} disabled={!input.trim() || isTyping} variant="hero">
            <Send className="w-4 h-4" />
          </Button>
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          Try asking: "Why is Redis used here?" or "How can this scale horizontally?"
        </p>
      </div>
    </div>
  );
}
