import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface MeshGradientHeroProps {
  children: ReactNode;
  className?: string;
}

const MeshGradientHero = ({ children, className = "" }: MeshGradientHeroProps) => {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Animated mesh gradient background */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse at 20% 30%, hsla(270, 65%, 30%, 0.15) 0%, transparent 50%),
              radial-gradient(ellipse at 80% 20%, hsla(45, 90%, 55%, 0.1) 0%, transparent 50%),
              radial-gradient(ellipse at 60% 80%, hsla(155, 60%, 35%, 0.08) 0%, transparent 50%),
              radial-gradient(ellipse at 10% 80%, hsla(320, 75%, 45%, 0.06) 0%, transparent 40%)
            `,
          }}
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
          }}
          transition={{
            duration: 20,
            ease: "linear",
            repeat: Infinity,
          }}
        />
        {/* Noise texture overlay */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E")`,
          }}
        />
      </div>
      {children}
    </div>
  );
};

export default MeshGradientHero;
