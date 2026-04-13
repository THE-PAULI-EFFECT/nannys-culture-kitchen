import { motion } from "framer-motion";

interface KineticMarqueeProps {
  items: string[];
  speed?: number;
  className?: string;
  separator?: string;
}

const KineticMarquee = ({ items, speed = 25, className = "", separator = "✦" }: KineticMarqueeProps) => {
  const content = items.join(` ${separator} `) + ` ${separator} `;

  return (
    <div className={`overflow-hidden whitespace-nowrap ${className}`}>
      <motion.div
        className="inline-block"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: speed, ease: "linear", repeat: Infinity }}
      >
        <span className="inline-block pr-4">{content}</span>
        <span className="inline-block pr-4">{content}</span>
      </motion.div>
    </div>
  );
};

export default KineticMarquee;
