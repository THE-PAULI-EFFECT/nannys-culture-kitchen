# Nanny's Culture Kitchen — Agent Architecture

## Overview
NCK uses specialized AI agents, each with a distinct persona and domain. All agents share the NCK brand voice: warm, knowledgeable, hospitable — like Nanny herself.

## Active Agents

### 1. NANNY (Catering Concierge)
- **File**: `src/lib/chatgpt-client.ts` → CateringAgent page
- **Model**: GPT-4-turbo (primary), Mercury 2 via Inception Labs (fast fallback)
- **Scope**: Event planning, menu customization, pricing, dietary needs, logistics
- **Guardrails**: Cooking/catering ONLY. Redirects off-topic questions.
- **Voice**: Warm Southern hospitality. "Let me help you plan something unforgettable."
- **Languages**: English, Spanish (via LanguageContext)

### 2. SCOUT (Grant Research Agent)
- **Status**: Data-only (Phase 3) — see `src/data/resources.ts`
- **Scope**: Federal/state/private grants, university partnerships, corporate filing guidance
- **Future**: MCP server for live grant database search, telephony outreach via Bland AI

### 3. SOUL (Brand Guardian)
- **Status**: Design-time only — see `agents/SOUL.md`
- **Scope**: Ensures all output matches NCK brand: Mardi Gras palette, Sora/DM Sans type, no generic AI patterns
- **Rules**: No glassmorphism. No gradient text abuse. No oversized radii. Clean, editorial, warm.

## Voice Stack
- **Web**: Web Speech API (browser-native, zero cost) → VAPI upgrade path
- **Telephony**: Bland AI (future — inbound/outbound for catering bookings)
- **TTS**: ElevenLabs (future — voice cloning for Nanny persona)
- **Fast LLM**: Mercury 2 by Inception Labs — OpenAI-compatible, $0.25/1M tokens, sub-500ms

## Model Routing
| Use Case | Primary Model | Fallback |
|----------|--------------|----------|
| Chat conversations | gpt-4-turbo | Mercury 2 |
| Quick completions | Mercury 2 | gpt-3.5-turbo |
| Voice transcription | Web Speech API | Whisper |
| Image generation | (not yet) | — |

## Agent Development Rules
1. Every agent has a system prompt defining scope, tone, and guardrails
2. Cooking/food scope is enforced — agents redirect off-topic queries
3. Brand voice is warm, never corporate. "Nanny would say it this way."
4. All agents support EN/ES via `useLanguage()` context
5. Conversation history is maintained per session (not persisted yet)
