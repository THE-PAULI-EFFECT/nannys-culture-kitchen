import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface CinematicIntroProps {
  onComplete: () => void;
}

const TAGLINE_WORDS = "Soul Food & Latin Flavors".split("");
const SUBTITLE = "100% Plant-Based. One Sacred Exception.";
const QUOTE = '"Hospitality is present when something happens for you. It is absent when something happens to you."';
const QUOTE_AUTHOR = "— Danny Meyer";

const CinematicIntro = ({ onComplete }: CinematicIntroProps) => {
  const [phase, setPhase] = useState(0); // 0=logo, 1=tagline, 2=subtitle, 3= quote, 4=fade out

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 800),
      setTimeout(() => setPhase(2), 2400),
      setTimeout(() => setPhase(3), 4000),
      setTimeout(() => setPhase(4), 6500),
      setTimeout(() => onComplete(), 7500),
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
          className="fixed inset-0 z-50 flex items-center justify-center bg-warm-gradient overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          {/* Background texture */}
          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: `radial-gradient(circle at 20% 50%, hsl(38, 75%, 50%) 0%, transparent 50%),
                              radial-gradient(circle at 80% 50%, hsl(142, 45%, 38%) 0%, transparent 50%)`
          }} />

          <div className="relative text-center px-6 max-w-2xl">
            {/* Phase 0: Nanny's wordmark */}
            <AnimatePresence>
              {phase >= 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                  <h1 className="font-serif text-5xl md:text-7xl font-bold tracking-tight text-gradient-gold leading-tight">
                    Nanny's
                  </h1>
                  <motion.p
                    className="font-serif text-lg md:text-xl text-brand-cream/60 tracking-[0.3em] uppercase mt-1"
                    initial={{ opacity: 0, letterSpacing: "0.6em" }}
                    animate={{ opacity: 1, letterSpacing: "0.3em" }}
                    transition={{ duration: 1, delay: 0.3 }}
                  >
                    Culture Kitchen
                  </motion.p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Phase 1: Tagline letter-by-letter */}
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
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.03, duration: 0.1 }}
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

            {/* Phase 3: Danny Meyer quote */}
            {phase >= 3 && (
              <motion.div
                className="mt-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
              >
                <p className="font-serif italic text-sm md:text-base text-brand-cream/30 leading-relaxed max-w-md mx-auto">
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

          {/* Progress bar */}
          <div className="absolute bottom-0 left-0 right-0 h-px bg-brand-cream/5">
            <motion.div
              className="h-full bg-brand-gold/30"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 7.5, ease: "linear" }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CinematicIntro;
