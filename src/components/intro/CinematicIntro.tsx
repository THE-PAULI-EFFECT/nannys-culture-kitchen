import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface CinematicIntroProps {
  onComplete: () => void;
}

const TAGLINE_WORDS = "Soul Food & Latin Flavors".split("");
const SUBTITLE = "100% Plant-Based. One Sacred Exception.";
const QUOTE = '"Hospitality is present when something happens for you. It is absent when something happens to you."';
const QUOTE_AUTHOR = "— Danny Meyer";

// Mardi Gras floating particles
const PARTICLES = Array.from({ length: 24 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 3 + 1,
  delay: Math.random() * 4,
  duration: Math.random() * 3 + 3,
  color: ['hsl(270, 65%, 45%)', 'hsl(45, 90%, 55%)', 'hsl(155, 60%, 40%)', 'hsl(320, 75%, 55%)'][i % 4],
}));

const CinematicIntro = ({ onComplete }: CinematicIntroProps) => {
  const [phase, setPhase] = useState(0); // 0=particles+logo, 1=tagline, 2=subtitle, 3=quote, 4=fade out
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 1000),
      setTimeout(() => setPhase(2), 2800),
      setTimeout(() => setPhase(3), 4500),
      setTimeout(() => setPhase(4), 7000),
      setTimeout(() => onComplete(), 8000),
    ];
    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  const handleSkip = useCallback(() => {
    setPhase(4);
    setTimeout(onComplete, 400);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase < 4 && (
        <motion.div
          ref={containerRef}
          className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          style={{ background: 'linear-gradient(180deg, hsl(240, 15%, 6%) 0%, hsl(260, 18%, 10%) 50%, hsl(240, 15%, 6%) 100%)' }}
        >
          {/* Mardi Gras tri-color radial glow */}
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(ellipse at 25% 40%, hsla(270, 65%, 40%, 0.08) 0%, transparent 60%),
                              radial-gradient(ellipse at 75% 40%, hsla(45, 90%, 55%, 0.06) 0%, transparent 60%),
                              radial-gradient(ellipse at 50% 85%, hsla(155, 60%, 35%, 0.05) 0%, transparent 50%)`
          }} />

          {/* Floating particles */}
          {PARTICLES.map((p) => (
            <motion.div
              key={p.id}
              className="absolute rounded-full"
              style={{
                left: `${p.x}%`,
                top: `${p.y}%`,
                width: p.size,
                height: p.size,
                backgroundColor: p.color,
              }}
              initial={{ opacity: 0, y: 0 }}
              animate={{
                opacity: [0, 0.7, 0],
                y: [-20, -60, -100],
              }}
              transition={{
                duration: p.duration,
                delay: p.delay,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}

          {/* Horizontal gold line accent */}
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-px"
            style={{ background: 'linear-gradient(90deg, transparent, hsl(45, 90%, 55%), transparent)' }}
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 0.3 }}
            transition={{ duration: 1.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          />

          <div className="relative text-center px-6 max-w-2xl z-10">
            {/* Phase 0: Nanny's wordmark with mask reveal */}
            <AnimatePresence>
              {phase >= 0 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                >
                  <h1 className="font-heading text-5xl md:text-7xl font-bold tracking-tight text-gradient-gold leading-tight">
                    Nanny's
                  </h1>
                  <motion.p
                    className="font-heading text-lg md:text-xl text-brand-cream/60 tracking-[0.3em] uppercase mt-1"
                    initial={{ opacity: 0, letterSpacing: "0.6em" }}
                    animate={{ opacity: 1, letterSpacing: "0.3em" }}
                    transition={{ duration: 1.2, delay: 0.4 }}
                  >
                    Culture Kitchen
                  </motion.p>
                  {/* Purple underline accent */}
                  <motion.div
                    className="mx-auto mt-3 h-[2px] rounded-full"
                    style={{ background: 'linear-gradient(90deg, hsl(270, 65%, 45%), hsl(45, 90%, 55%), hsl(155, 60%, 40%))' }}
                    initial={{ width: 0 }}
                    animate={{ width: 120 }}
                    transition={{ duration: 0.8, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Phase 1: Tagline letter-by-letter with scramble effect */}
            {phase >= 1 && (
              <motion.div
                className="mt-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <p className="font-mono text-sm md:text-base tracking-wide text-brand-cream/70">
                  {TAGLINE_WORDS.map((char, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, filter: "blur(4px)" }}
                      animate={{ opacity: 1, filter: "blur(0px)" }}
                      transition={{ delay: i * 0.025, duration: 0.15 }}
                    >
                      {char}
                    </motion.span>
                  ))}
                </p>
              </motion.div>
            )}

            {/* Phase 2: Subtitle */}
            {phase >= 2 && (
              <motion.p
                className="mt-4 text-sm text-brand-cream/40 tracking-wide"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                {SUBTITLE}
              </motion.p>
            )}

            {/* Phase 3: Danny Meyer quote — KEPT as brand tribute */}
            {phase >= 3 && (
              <motion.div
                className="mt-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
              >
                <p className="font-heading italic text-sm md:text-base text-brand-cream/30 leading-relaxed max-w-md mx-auto">
                  {QUOTE}
                </p>
                <p className="mt-2 text-xs text-brand-gold/40 tracking-wider">
                  {QUOTE_AUTHOR}
                </p>
              </motion.div>
            )}
          </div>

          {/* Skip button */}
          <motion.button
            onClick={handleSkip}
            className="absolute bottom-8 right-8 text-xs text-brand-cream/25 hover:text-brand-cream/50 transition-colors tracking-wider uppercase font-mono"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
          >
            Skip →
          </motion.button>

          {/* Mardi Gras tri-color progress bar */}
          <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-brand-cream/5">
            <motion.div
              className="h-full"
              style={{ background: 'linear-gradient(90deg, hsl(270, 65%, 45%), hsl(45, 90%, 55%), hsl(155, 60%, 40%))' }}
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 8, ease: "linear" }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CinematicIntro;

