import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Bot, User, Sparkles } from "lucide-react";
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

const suggestedQuestions = [
  "Why is Redis used here?",
  "How can this scale horizontally?",
  "What are the trade-offs?",
];

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
  const [isFocused, setIsFocused] = useState(false);

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

  const handleSuggestedQuestion = (question: string) => {
    setInput(question);
  };

  return (
    <div className="h-full flex flex-col max-w-3xl mx-auto">
      {/* Messages */}
      <div className="flex-1 overflow-auto space-y-4 pb-4">
        <AnimatePresence>
          {messages.map((message, index) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, delay: index === messages.length - 1 ? 0 : 0 }}
              className={`flex gap-3 ${
                message.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {message.role === "assistant" && (
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200 }}
                  className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0"
                >
                  <Bot className="w-4 h-4 text-primary" />
                </motion.div>
              )}
              <motion.div
                whileHover={{ scale: 1.01 }}
                className={`max-w-[80%] rounded-xl px-4 py-3 ${
                  message.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-card border border-border text-foreground"
                }`}
              >
                <div className="text-sm whitespace-pre-wrap leading-relaxed">
                  {message.content}
                </div>
              </motion.div>
              {message.role === "user" && (
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200 }}
                  className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0"
                >
                  <User className="w-4 h-4 text-muted-foreground" />
                </motion.div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>

        {isTyping && (
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
                <motion.span 
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                  className="w-2 h-2 bg-primary/50 rounded-full" 
                />
                <motion.span 
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                  className="w-2 h-2 bg-primary/50 rounded-full" 
                />
                <motion.span 
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                  className="w-2 h-2 bg-primary/50 rounded-full" 
                />
              </div>
            </div>
          </motion.div>
        )}
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
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.03, y: -1 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => handleSuggestedQuestion(question)}
              className="px-3 py-1.5 rounded-full text-xs bg-secondary text-secondary-foreground border border-border hover:border-primary/30 transition-colors"
            >
              <Sparkles className="w-3 h-3 inline mr-1.5" />
              {question}
            </motion.button>
          ))}
        </motion.div>
      )}

      {/* Input */}
      <div className="border-t border-border pt-4">
        <div className={`flex gap-3 p-1 rounded-xl transition-all duration-300 ${
          isFocused ? "ring-2 ring-primary/20" : ""
        }`}>
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Ask about the architecture..."
            className="flex-1 bg-card border-border focus-visible:ring-0"
          />
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button onClick={handleSend} disabled={!input.trim() || isTyping} variant="hero">
              <Send className="w-4 h-4" />
            </Button>
          </motion.div>
        </div>
        <p className="text-xs text-muted-foreground mt-2 text-center">
          Ask anything about the architecture design
        </p>
      </div>
    </div>
  );
}
