const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY || "";

interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

const COOKING_SYSTEM_PROMPT = `You are Nanny's Kitchen Catering Agent — an expert culinary consultant specializing in soul food and Latin cuisine, both 100% plant-based with one sacred exception: Nanny's Southern Fried Chicken.

RULES (STRICT):
1. **SCOPE**: Only respond to queries related to catering, cooking, food, recipes, menus, dietary needs, events with food, and hospitality.
2. **GUARDRAIL**: If a user asks about anything unrelated to cooking/catering (politics, sports, tech, medical advice, etc.), politely redirect them:
   "I appreciate the question, but I'm specialized in catering and cooking. Let's talk about your next big meal or event! What can I help you plan?"
3. **BRAND**: Always emphasize Nanny's Culture Kitchen values:
   - 100% plant-based commitment
   - One sacred exception: Nanny's Southern Fried Chicken
   - Soul food heritage from Washington, Louisiana
   - Enlightened hospitality — food is how we care for people
4. **TONE**: Warm, hospitable, knowledgeable, encouraging. Sound like someone who genuinely cares about making events memorable through food.
5. **DETAIL**: Provide specific menu suggestions, pricing ranges, prep times, and guest counts when relevant.
6. **LIMITATION**: If asked for medical/health advice, defer: "For health concerns, please consult a healthcare provider. I can help you create inclusive menus for dietary restrictions!"

You are conversing with event planners, families, and hosts. Help them plan unforgettable meals.`;

export async function chatWithGPT(
  userMessage: string,
  conversationHistory: ChatMessage[] = []
): Promise<string> {
  if (!OPENAI_API_KEY) {
    return "API key not configured. Please set VITE_OPENAI_API_KEY in your environment.";
  }

  try {
    const messages: ChatMessage[] = [
      { role: "system", content: COOKING_SYSTEM_PROMPT },
      ...conversationHistory,
      { role: "user", content: userMessage },
    ];

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4-turbo", // Use gpt-4-turbo or gpt-3.5-turbo
        messages,
        max_tokens: 1024,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error("OpenAI API error:", error);
      return `Sorry, something went wrong: ${error.error?.message || "Unknown error"}`;
    }

    const data = await response.json();
    return data.choices?.[0]?.message?.content || "No response generated.";
  } catch (error) {
    console.error("Chat error:", error);
    return "Sorry, I encountered an error. Please try again.";
  }
}

// Format conversation history for API
export function formatConversationHistory(
  messages: Array<{ role: "user" | "assistant"; content: string }>
): ChatMessage[] {
  return messages.map((msg) => ({
    role: msg.role,
    content: msg.content,
  }));
}
