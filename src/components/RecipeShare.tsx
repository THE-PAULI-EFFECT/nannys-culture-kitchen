import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Share2, Download, Copy, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface RecipeShareProps {
  recipe: {
    title: string;
    description: string;
    ingredients: string[];
    instructions: string[];
    image?: string;
  };
}

const RecipeShare = ({ recipe }: RecipeShareProps) => {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const recipeUrl = window.location.href;

  const handleNativeShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: `${recipe.title} — Nanny's Culture Kitchen`,
        text: recipe.description,
        url: recipeUrl,
      });
    }
  };

  const handleCopyLink = async () => {
    await navigator.clipboard.writeText(recipeUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadText = () => {
    const text = [
      `${recipe.title}`,
      `Nanny's Culture Kitchen`,
      ``,
      recipe.description,
      ``,
      `INGREDIENTS`,
      ...recipe.ingredients.map((i) => `• ${i}`),
      ``,
      `INSTRUCTIONS`,
      ...recipe.instructions.map((s, i) => `${i + 1}. ${s}`),
      ``,
      `---`,
      `Shared from Nanny's Culture Kitchen`,
      recipeUrl,
    ].join("\n");

    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${recipe.title.replace(/[^a-zA-Z0-9]/g, "-").toLowerCase()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const hasNativeShare = typeof navigator.share === "function";

  return (
    <>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setOpen(true)}
        className="gap-1.5 text-muted-foreground hover:text-foreground"
      >
        <Share2 className="h-4 w-4" />
        <span className="text-xs">Share</span>
      </Button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          >
            <motion.div
              className="bg-card border border-border/50 rounded-lg p-6 max-w-sm w-full mx-4 space-y-4"
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between">
                <h3 className="font-heading text-base font-semibold">Share Recipe</h3>
                <button onClick={() => setOpen(false)} className="text-muted-foreground hover:text-foreground">
                  <X className="h-4 w-4" />
                </button>
              </div>

              <p className="text-sm text-muted-foreground">{recipe.title}</p>

              <div className="space-y-2">
                {hasNativeShare && (
                  <button
                    onClick={handleNativeShare}
                    className="w-full flex items-center gap-3 rounded-md border border-border/50 bg-card px-4 py-3 text-sm hover:border-brand-purple/30 transition-colors"
                  >
                    <Share2 className="h-4 w-4 text-brand-purple" />
                    Share via device
                  </button>
                )}

                <button
                  onClick={handleCopyLink}
                  className="w-full flex items-center gap-3 rounded-md border border-border/50 bg-card px-4 py-3 text-sm hover:border-brand-gold/30 transition-colors"
                >
                  {copied ? <Check className="h-4 w-4 text-brand-green" /> : <Copy className="h-4 w-4 text-brand-gold" />}
                  {copied ? "Copied!" : "Copy link"}
                </button>

                <button
                  onClick={handleDownloadText}
                  className="w-full flex items-center gap-3 rounded-md border border-border/50 bg-card px-4 py-3 text-sm hover:border-brand-green/30 transition-colors"
                >
                  <Download className="h-4 w-4 text-brand-green" />
                  Download recipe
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default RecipeShare;
