import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Flame, Leaf } from "lucide-react";

const chefs = [
  {
    id: "soul-food",
    title: "Soul Food Kitchen",
    subtitle: "Washington, Louisiana Roots",
    description: "Collard greens, gumbo, cornbread, candied yams — and Nanny's Fried Chicken",
    route: "/soul-food",
    icon: Flame,
    accentClass: "text-brand-gold",
    borderClass: "border-brand-gold/20 hover:border-brand-gold/50",
    glowClass: "glow-gold",
    bgClass: "bg-brand-gold/5",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&h=400&fit=crop",
  },
  {
    id: "latin",
    title: "Latin Kitchen",
    subtitle: "State by State — México",
    description: "Mole negro, birria, cochinita pibil — authentic recipes from every Mexican state",
    route: "/latin-kitchen",
    icon: Leaf,
    accentClass: "text-brand-green",
    borderClass: "border-brand-green/20 hover:border-brand-green/50",
    glowClass: "glow-green",
    bgClass: "bg-brand-green/5",
    image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=600&h=400&fit=crop",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

const ChefSelector = () => {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto"
    >
      {chefs.map((chef) => {
        const Icon = chef.icon;
        return (
          <motion.div key={chef.id} variants={item}>
            <Link
              to={chef.route}
              className={`group block rounded-lg border ${chef.borderClass} ${chef.bgClass} p-6 transition-all duration-300 hover:${chef.glowClass}`}
            >
              {/* Image */}
              <div className="relative overflow-hidden rounded-md mb-4 aspect-[3/2]">
                <img
                  src={chef.image}
                  alt={chef.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3">
                  <Icon className={`h-6 w-6 ${chef.accentClass}`} />
                </div>
              </div>

              {/* Text */}
              <h3 className={`font-serif text-xl font-semibold ${chef.accentClass}`}>
                {chef.title}
              </h3>
              <p className="text-xs text-muted-foreground tracking-wider uppercase mt-1">
                {chef.subtitle}
              </p>
              <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                {chef.description}
              </p>

              {/* Arrow */}
              <div className={`mt-4 text-xs font-mono ${chef.accentClass} opacity-50 group-hover:opacity-100 transition-opacity`}>
                Explore →
              </div>
            </Link>
          </motion.div>
        );
      })}
    </motion.div>
  );
};

export default ChefSelector;
