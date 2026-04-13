const VAPI_PUBLIC_KEY = import.meta.env.VITE_VAPI_PUBLIC_KEY || "";

interface VapiConfig {
  onTranscript?: (text: string) => void;
  onSpeechStart?: () => void;
  onSpeechEnd?: () => void;
  onError?: (error: string) => void;
}

let vapiInstance: any = null;
let mediaRecorder: MediaRecorder | null = null;
let recognition: any = null;

/**
 * Start voice listening using Web Speech API (browser-native, zero-cost).
 * Falls back gracefully if not supported.
 */
export function startVoiceListening(config: VapiConfig): boolean {
  const SpeechRecognition =
    (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

  if (!SpeechRecognition) {
    config.onError?.("Speech recognition not supported in this browser.");
    return false;
  }

  recognition = new SpeechRecognition();
  recognition.continuous = false;
  recognition.interimResults = false;
  recognition.lang = "en-US";

  recognition.onstart = () => {
    config.onSpeechStart?.();
  };

  recognition.onresult = (event: any) => {
    const transcript = event.results[0][0].transcript;
    config.onTranscript?.(transcript);
  };

  recognition.onerror = (event: any) => {
    config.onError?.(event.error);
  };

  recognition.onend = () => {
    config.onSpeechEnd?.();
  };

  recognition.start();
  return true;
}

/** Stop voice listening */
export function stopVoiceListening() {
  if (recognition) {
    recognition.stop();
    recognition = null;
  }
}

/**
 * Initialize VAPI for advanced voice (requires VITE_VAPI_PUBLIC_KEY).
 * This is the premium path — sub-500ms latency, multilingual.
 */
export async function initVapi(): Promise<boolean> {
  if (!VAPI_PUBLIC_KEY) {
    console.warn("VAPI key not configured. Using Web Speech API fallback.");
    return false;
  }

  try {
    const { default: Vapi } = await import("@vapi-ai/web");
    vapiInstance = new Vapi(VAPI_PUBLIC_KEY);
    return true;
  } catch (err) {
    console.error("Failed to initialize VAPI:", err);
    return false;
  }
}

/** Check if voice is available */
export function isVoiceSupported(): boolean {
  return !!(
    (window as any).SpeechRecognition ||
    (window as any).webkitSpeechRecognition
  );
}
