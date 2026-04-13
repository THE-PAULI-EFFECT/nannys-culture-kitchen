import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface ParticleButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  variant?: "purple" | "gold" | "green";
}

const VARIANT_STYLES = {
  purple: {
    bg: "bg-brand-purple/10 hover:bg-brand-purple/20",
    border: "border-brand-purple/30 hover:border-brand-purple/50",
    text: "text-brand-purple-light",
    glow: "hover:shadow-[0_0_20px_rgba(102,51,153,0.15)]",
  },
  gold: {
    bg: "bg-brand-gold/10 hover:bg-brand-gold/20",
    border: "border-brand-gold/30 hover:border-brand-gold/50",
    text: "text-brand-gold",
    glow: "hover:shadow-[0_0_20px_rgba(230,190,40,0.15)]",
  },
  green: {
    bg: "bg-brand-green/10 hover:bg-brand-green/20",
    border: "border-brand-green/30 hover:border-brand-green/50",
    text: "text-brand-green-light",
    glow: "hover:shadow-[0_0_20px_rgba(40,142,80,0.15)]",
  },
};

const ParticleButton = ({
  children,
  className = "",
  onClick,
  variant = "purple",
}: ParticleButtonProps) => {
  const styles = VARIANT_STYLES[variant];

  return (
    <motion.button
      onClick={onClick}
      className={`relative overflow-hidden rounded-md border px-5 py-2.5 text-sm font-medium transition-all duration-300 ${styles.bg} ${styles.border} ${styles.text} ${styles.glow} ${className}`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {children}
    </motion.button>
  );
};

export default ParticleButton;
