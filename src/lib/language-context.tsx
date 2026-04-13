import { createContext, useContext, useState, useEffect } from "react";

type Language = "en" | "es";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const TRANSLATIONS: Record<Language, Record<string, string>> = {
  en: {
    "catering.title": "Catering Agent",
    "catering.subtitle": "Enlightened Hospitality",
    "catering.greeting": `Welcome! I'm your Nanny's Culture Kitchen catering consultant.

At Nanny's, we believe the way you make people feel is just as important as what you serve. Food is how we take care of people.

How can I help you plan an unforgettable event? I can assist with:
• **Event planning** — from intimate dinners to large celebrations
• **Menu customization** — soul food, Latin kitchen, or both
• **Dietary accommodations** — all plant-based with endless options
• **Budget estimation** — transparent pricing, no surprises
• **Logistics** — scheduling, staffing, and coordination`,
    "catering.plan_wedding": "Plan a Wedding",
    "catering.corporate_event": "Corporate Event",
    "catering.family_reunion": "Family Reunion",
    "catering.get_quote": "Get a Quote",
    "catering.input_placeholder": "Ask about catering, menus, or events...",
    "catering.quick_start": "Quick start:",
    "catering.back": "Back",
    "catering.prompt_wedding": "I'm planning a wedding reception for 150 guests. We'd love a mix of soul food and Latin cuisine.",
    "catering.prompt_corporate": "We need catering for a corporate event — 50 people, mostly plant-based with some flexibility.",
    "catering.prompt_reunion": "Planning a family reunion with about 80 people. Southern comfort food is a must!",
    "catering.prompt_quote": "Can you give me a rough estimate for catering a party of 30 people?",
    "catering.agent_label": "Nanny's Kitchen Agent",
    "nav.soul_food": "Soul Food",
    "nav.latin_kitchen": "Latin Kitchen",
    "nav.catering": "Catering",
    "nav.dashboard": "Dashboard",
    "nav.chef": "Chef",
  },
  es: {
    "catering.title": "Agente de Catering",
    "catering.subtitle": "Hospitalidad Iluminada",
    "catering.greeting": `¡Bienvenido! Soy tu consultor de catering de la Cocina de la Cultura de Nanny.

En Nanny's, creemos que la forma en que haces sentir a las personas es tan importante como lo que sirves. La comida es cómo cuidamos a las personas.

¿Cómo puedo ayudarte a planificar un evento inolvidable? Puedo asistirte con:
• **Planificación de eventos** — desde cenas íntimas hasta grandes celebraciones
• **Personalización de menús** — cocina soul food, cocina latina, o ambas
• **Adaptaciones dietéticas** — 100% basado en plantas con opciones infinitas
• **Estimación de presupuesto** — precios transparentes, sin sorpresas
• **Logística** — programación, personal y coordinación`,
    "catering.plan_wedding": "Planificar una Boda",
    "catering.corporate_event": "Evento Corporativo",
    "catering.family_reunion": "Reunión Familiar",
    "catering.get_quote": "Obtener una Cotización",
    "catering.input_placeholder": "Pregunta sobre catering, menús o eventos...",
    "catering.quick_start": "Inicio rápido:",
    "catering.back": "Atrás",
    "catering.prompt_wedding": "Estoy planificando una recepción de bodas para 150 invitados. Nos gustaría una mezcla de cocina soul food y latina.",
    "catering.prompt_corporate": "Necesitamos catering para un evento corporativo — 50 personas, principalmente basado en plantas con cierta flexibilidad.",
    "catering.prompt_reunion": "Planificando una reunión familiar de unos 80 personas. ¡La comida de confort sureña es imprescindible!",
    "catering.prompt_quote": "¿Puedes darme una estimación aproximada para catering de una fiesta de 30 personas?",
    "catering.agent_label": "Agente de Cocina de Nanny",
    "nav.soul_food": "Soul Food",
    "nav.latin_kitchen": "Cocina Latina",
    "nav.catering": "Catering",
    "nav.dashboard": "Panel",
    "nav.chef": "Chef",
  },
};

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguage] = useState<Language>("en");

  useEffect(() => {
    const saved = localStorage.getItem("nck_language") as Language | null;
    if (saved && ["en", "es"].includes(saved)) {
      setLanguage(saved);
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem("nck_language", lang);
  };

  const t = (key: string): string => {
    return TRANSLATIONS[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return context;
};
