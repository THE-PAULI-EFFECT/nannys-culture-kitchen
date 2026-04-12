import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, Send, Mic, MicOff, MessageSquare, Calendar, Users, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const DANNY_MEYER_GREETING = `Welcome! I'm your Nanny's Culture Kitchen catering consultant. 

Inspired by Danny Meyer's philosophy of Enlightened Hospitality — we believe the way you make people feel is just as important as what you serve.

How can I help you plan an unforgettable event? I can assist with:
• **Event planning** — from intimate dinners to large celebrations
• **Menu customization** — soul food, Latin kitchen, or both
• **Dietary accommodations** — all plant-based with endless options
• **Budget estimation** — transparent pricing, no surprises
• **Logistics** — scheduling, staffing, and coordination`;

const QUICK_PROMPTS = [
  { label: "Plan a Wedding", icon: Calendar, prompt: "I'm planning a wedding reception for 150 guests. We'd love a mix of soul food and Latin cuisine." },
  { label: "Corporate Event", icon: Users, prompt: "We need catering for a corporate event — 50 people, mostly plant-based with some flexibility." },
  { label: "Family Reunion", icon: MessageSquare, prompt: "Planning a family reunion with about 80 people. Southern comfort food is a must!" },
  { label: "Get a Quote", icon: DollarSign, prompt: "Can you give me a rough estimate for catering a party of 30 people?" },
];

const CateringAgent = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: DANNY_MEYER_GREETING,
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: text,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    // Simulate AI response (in production, this calls the actual API)
    setTimeout(() => {
      const response = generateResponse(text);
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: response,
          timestamp: new Date(),
        },
      ]);
      setIsTyping(false);
    }, 1200);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const toggleVoice = () => {
    setIsListening(!isListening);
    // ElevenLabs integration placeholder
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border/50 bg-background/95 backdrop-blur">
        <div className="mx-auto max-w-4xl flex h-14 items-center justify-between px-4">
          <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-4 w-4" />
            <span className="text-sm">Back</span>
          </Link>
          <div className="text-center">
            <span className="font-serif text-lg font-semibold text-gradient-gold">Catering Agent</span>
            <p className="text-[10px] text-muted-foreground font-mono">Enlightened Hospitality</p>
          </div>
          <div className="w-16" />
        </div>
      </header>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-3xl px-4 py-6 space-y-4">
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[85%] rounded-lg px-4 py-3 text-sm leading-relaxed ${
                  msg.role === "user"
                    ? "bg-brand-gold/10 border border-brand-gold/20 text-foreground"
                    : "bg-card border border-border/50 text-foreground"
                }`}
              >
                {msg.role === "assistant" && (
                  <p className="text-[10px] text-brand-gold/50 font-mono mb-1.5">Nanny's Kitchen Agent</p>
                )}
                <div className="whitespace-pre-wrap">{msg.content.split('**').map((part, i) =>
                  i % 2 === 1 ? <strong key={i}>{part}</strong> : part
                )}</div>
                <p className="text-[10px] text-muted-foreground mt-2">
                  {msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </p>
              </div>
            </motion.div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-card border border-border/50 rounded-lg px-4 py-3">
                <div className="flex gap-1">
                  <span className="w-2 h-2 rounded-full bg-brand-gold/40 animate-pulse" />
                  <span className="w-2 h-2 rounded-full bg-brand-gold/40 animate-pulse" style={{ animationDelay: "0.2s" }} />
                  <span className="w-2 h-2 rounded-full bg-brand-gold/40 animate-pulse" style={{ animationDelay: "0.4s" }} />
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Quick Prompts */}
      {messages.length <= 1 && (
        <div className="border-t border-border/50">
          <div className="mx-auto max-w-3xl px-4 py-4">
            <p className="text-xs text-muted-foreground mb-3 font-mono">Quick start:</p>
            <div className="grid grid-cols-2 gap-2">
              {QUICK_PROMPTS.map((qp) => {
                const Icon = qp.icon;
                return (
                  <button
                    key={qp.label}
                    onClick={() => sendMessage(qp.prompt)}
                    className="flex items-center gap-2 text-left p-3 rounded-lg border border-border/50 bg-card hover:border-brand-gold/30 transition-colors text-sm"
                  >
                    <Icon className="h-4 w-4 text-brand-gold/60 flex-shrink-0" />
                    <span>{qp.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Input */}
      <div className="border-t border-border/50 bg-background/95 backdrop-blur">
        <form onSubmit={handleSubmit} className="mx-auto max-w-3xl px-4 py-3 flex items-center gap-2">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={toggleVoice}
            className={`flex-shrink-0 ${isListening ? "text-brand-gold" : "text-muted-foreground"}`}
          >
            {isListening ? <Mic className="h-5 w-5" /> : <MicOff className="h-5 w-5" />}
          </Button>
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about catering, menus, or events..."
            className="flex-1 bg-card border-border/50"
          />
          <Button type="submit" size="icon" disabled={!input.trim()} className="bg-brand-gold/20 text-brand-gold hover:bg-brand-gold/30 border border-brand-gold/30">
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  );
};

function generateResponse(input: string): string {
  const lower = input.toLowerCase();

  if (lower.includes("wedding")) {
    return `A wedding — how wonderful! Let me help make this celebration unforgettable.

For **150 guests**, I'd recommend a dual-kitchen experience:

**Soul Food Station:**
• Plant-Based Gumbo (our signature)
• Cashew Mac & Cheese
• Southern Collard Greens
• Cast Iron Cornbread
• Nanny's Southern Fried Chicken (the sacred exception)

**Latin Kitchen Station:**
• Jackfruit Cochinita Pibil Tacos
• Vegan Mole Negro with Roasted Cauliflower
• Churros with Chocolate Sauce

**Estimated range:** $45-65 per person depending on service style.

Shall I build out a full menu proposal? I can also suggest cocktail pairings from our Hibiscus Lemonade and Southern Sweet Tea collections.`;
  }

  if (lower.includes("corporate") || lower.includes("business")) {
    return `Corporate events are our specialty — we understand that the experience should reflect your company's values.

For **50 guests**, I'd suggest an elegant buffet:

**Menu suggestion:**
• Blackened Cauliflower Steaks
• Vegan Red Beans & Rice
• Baja 'Fish' Tacos with Chipotle Mayo
• Fresh Hibiscus Lemonade
• Vegan Tres Leches Cake

**Estimated range:** $35-50 per person.

All 100% plant-based, beautifully presented. Would you like to discuss dietary restrictions or specific presentation needs?`;
  }

  if (lower.includes("family") || lower.includes("reunion")) {
    return `Family reunions are the heart of what we do — it's literally why Nanny started this kitchen.

For **80 guests** — full Southern comfort:

**The Southern Spread:**
• Southern Collard Greens
• Plant-Based Gumbo (Washington, LA style)
• Vegan Boudin (hometown special!)
• Cashew Mac & Cheese
• BBQ Jackfruit Pulled 'Pork' Sandwiches
• Candied Yams
• Nanny's Southern Fried Chicken
• Sweet Potato Pie + Peach Cobbler
• Southern Sweet Tea by the gallon

**Estimated range:** $30-45 per person.

This is a menu built for seconds and thirds. Want me to add Latin dishes to the mix?`;
  }

  if (lower.includes("quote") || lower.includes("price") || lower.includes("cost") || lower.includes("estimate")) {
    return `Here's a general pricing guide for **30 guests**:

**Tier 1 — Essential ($25-35/person):**
3 mains + 2 sides + 1 dessert + drinks

**Tier 2 — Celebration ($40-55/person):**
5 mains + 3 sides + 2 desserts + specialty drinks + service staff

**Tier 3 — Full Experience ($60-80/person):**
Dual-kitchen (soul food + Latin), custom menu, live cooking stations, Nanny's Fried Chicken, full service team

All pricing includes:
✓ Compostable serving ware
✓ Setup and cleanup
✓ Dietary accommodation
✓ Locally sourced ingredients where possible

Would you like a detailed proposal for your specific event?`;
  }

  return `Thank you for your question! As Danny Meyer says, "The road to success is paved with mistakes well handled."

I'd love to help you plan the perfect event. Can you tell me:
1. **How many guests** are you expecting?
2. **What type of event** is this? (celebration, corporate, casual, etc.)
3. **Do you have a preference** — Soul Food, Latin, or a mix of both?
4. **Any dietary restrictions** I should know about?

The more details you share, the better I can tailor the experience.`;
}

export default CateringAgent;
