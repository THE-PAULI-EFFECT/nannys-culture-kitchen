import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface CurtainRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

const CurtainReveal = ({ children, className = "", delay = 0 }: CurtainRevealProps) => {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <motion.div
        initial={{ y: "100%" }}
        whileInView={{ y: "0%" }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{
          duration: 0.7,
          delay,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default CurtainReveal;
