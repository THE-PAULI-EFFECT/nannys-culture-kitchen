import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, Send, Mic, MicOff, MessageSquare, Calendar, Users, DollarSign, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/lib/language-context";
import { chatWithGPT, formatConversationHistory } from "@/lib/chatgpt-client";
import { startVoiceListening, stopVoiceListening, isVoiceSupported } from "@/lib/vapi-client";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const CateringAgent = () => {
  const { language, setLanguage, t } = useLanguage();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: t("catering.greeting"),
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

  const QUICK_PROMPTS = [
    { label: t("catering.plan_wedding"), icon: Calendar, prompt: t("catering.prompt_wedding") },
    { label: t("catering.corporate_event"), icon: Users, prompt: t("catering.prompt_corporate") },
    { label: t("catering.family_reunion"), icon: MessageSquare, prompt: t("catering.prompt_reunion") },
    { label: t("catering.get_quote"), icon: DollarSign, prompt: t("catering.prompt_quote") },
  ];

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

    try {
      // Format conversation history for API (excluding welcome message)
      const conversationHistory = messages
        .filter((m) => m.id !== "welcome")
        .map((m) => ({
          role: m.role,
          content: m.content,
        }));

      const response = await chatWithGPT(text, conversationHistory);

      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: response,
          timestamp: new Date(),
        },
      ]);
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: "Sorry, I encountered an error. Please try again.",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const toggleVoice = () => {
    if (isListening) {
      stopVoiceListening();
      setIsListening(false);
      return;
    }

    const started = startVoiceListening({
      onTranscript: (text) => {
        setIsListening(false);
        if (text.trim()) {
          sendMessage(text);
        }
      },
      onSpeechStart: () => setIsListening(true),
      onSpeechEnd: () => setIsListening(false),
      onError: (err) => {
        console.error("Voice error:", err);
        setIsListening(false);
      },
    });

    if (!started) {
      alert("Voice input is not supported in this browser. Try Chrome or Edge.");
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border/50 bg-background/95 backdrop-blur">
        <div className="mx-auto max-w-4xl flex h-14 items-center justify-between px-4 w-full">
          <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors flex-shrink-0">
            <ArrowLeft className="h-4 w-4" />
            <span className="text-sm">{t("catering.back")}</span>
          </Link>
          <div className="text-center flex-1">
            <span className="font-heading text-lg font-semibold text-gradient-gold">{t("catering.title")}</span>
            <p className="text-[10px] text-muted-foreground font-mono">{t("catering.subtitle")}</p>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={() => setLanguage(language === "en" ? "es" : "en")}
              className="flex items-center gap-1 px-2 py-1.5 rounded-md border border-border/50 bg-card hover:border-brand-gold/30 transition-colors text-xs text-muted-foreground hover:text-foreground"
              title={language === "en" ? "Cambiar a Español" : "Switch to English"}
            >
              <Globe className="h-3 w-3" />
              <span className="font-mono font-semibold">{language.toUpperCase()}</span>
            </button>
            <div className="w-8" />
          </div>
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
                  <p className="text-[10px] text-brand-gold/50 font-mono mb-1.5">{t("catering.agent_label")}</p>
                )}
                <div className="whitespace-pre-wrap">
                  {msg.content.split("**").map((part, i) =>
                    i % 2 === 1 ? <strong key={i}>{part}</strong> : part
                  )}
                </div>
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
            <p className="text-xs text-muted-foreground mb-3 font-mono">{t("catering.quick_start")}</p>
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
        <form onSubmit={handleSubmit} className="mx-auto max-w-3xl px-4 py-3 flex items-center gap-2 w-full">
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
            placeholder={t("catering.input_placeholder")}
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

export default CateringAgent;

