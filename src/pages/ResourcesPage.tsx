import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Search,
  ExternalLink,
  GraduationCap,
  DollarSign,
  Building,
  Landmark,
  Globe,
  FileText,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { GRANTS, UNIVERSITIES, CORPORATE_STRUCTURE, type Grant } from "@/data/resources";

const CATEGORY_LABELS: Record<Grant["category"], string> = {
  federal: "Federal",
  state: "Louisiana",
  private: "Private",
  university: "University",
};

const CATEGORY_COLORS: Record<Grant["category"], string> = {
  federal: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  state: "bg-brand-green/10 text-brand-green border-brand-green/20",
  private: "bg-brand-gold/10 text-brand-gold border-brand-gold/20",
  university: "bg-brand-purple/10 text-brand-purple-light border-brand-purple/20",
};

const ResourcesPage = () => {
  const [filter, setFilter] = useState<Grant["category"] | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedGrant, setExpandedGrant] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"grants" | "universities" | "corporate">("grants");

  const filteredGrants = GRANTS.filter((g) => {
    const matchesCategory = filter === "all" || g.category === filter;
    const matchesSearch =
      !searchQuery ||
      g.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      g.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border/50 bg-background/95 backdrop-blur">
        <div className="mx-auto max-w-6xl flex h-14 items-center justify-between px-4">
          <Link
            to="/"
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="text-sm">Back</span>
          </Link>
          <div className="text-center">
            <span className="font-heading text-lg font-semibold text-gradient-gold">
              Resources & Grants
            </span>
          </div>
          <div className="w-20" />
        </div>
      </header>

      {/* Tab Navigation */}
      <div className="border-b border-border/50">
        <div className="mx-auto max-w-6xl px-4 flex gap-1">
          {(["grants", "universities", "corporate"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab
                  ? "border-brand-gold text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab === "grants" && <DollarSign className="h-3.5 w-3.5 inline mr-1.5" />}
              {tab === "universities" && <GraduationCap className="h-3.5 w-3.5 inline mr-1.5" />}
              {tab === "corporate" && <Building className="h-3.5 w-3.5 inline mr-1.5" />}
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-8">
        {/* ===== GRANTS TAB ===== */}
        {activeTab === "grants" && (
          <>
            {/* Search + Filters */}
            <div className="flex flex-col md:flex-row gap-4 mb-8">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search grants..."
                  className="w-full pl-10 pr-4 py-2.5 bg-card border border-border/50 rounded-md text-sm focus:outline-none focus:border-brand-gold/40"
                />
              </div>
              <div className="flex gap-2 flex-wrap">
                {(["all", "federal", "state", "private"] as const).map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setFilter(cat)}
                    className={`px-3 py-2 text-xs font-medium rounded-md border transition-colors ${
                      filter === cat
                        ? "bg-brand-gold/10 text-brand-gold border-brand-gold/30"
                        : "bg-card border-border/50 text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {cat === "all" ? "All" : CATEGORY_LABELS[cat]}
                  </button>
                ))}
              </div>
            </div>

            {/* Grant Cards */}
            <div className="space-y-3">
              {filteredGrants.map((grant, i) => (
                <motion.div
                  key={grant.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-card border border-border/50 rounded-lg overflow-hidden"
                >
                  <button
                    onClick={() =>
                      setExpandedGrant(expandedGrant === grant.id ? null : grant.id)
                    }
                    className="w-full flex items-center justify-between p-4 text-left hover:bg-muted/30 transition-colors"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span
                          className={`text-[10px] px-2 py-0.5 rounded border font-mono ${
                            CATEGORY_COLORS[grant.category]
                          }`}
                        >
                          {CATEGORY_LABELS[grant.category]}
                        </span>
                        <span className="text-xs text-muted-foreground">{grant.source}</span>
                      </div>
                      <h3 className="font-heading text-sm font-medium truncate">{grant.name}</h3>
                      <p className="text-xs text-brand-gold font-mono mt-0.5">{grant.amount}</p>
                    </div>
                    {expandedGrant === grant.id ? (
                      <ChevronUp className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                    ) : (
                      <ChevronDown className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                    )}
                  </button>

                  {expandedGrant === grant.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      className="px-4 pb-4 border-t border-border/30"
                    >
                      <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
                        {grant.description}
                      </p>
                      <div className="mt-3">
                        <p className="text-xs text-foreground font-medium mb-1.5">Eligibility:</p>
                        <ul className="space-y-1">
                          {grant.eligibility.map((e) => (
                            <li key={e} className="text-xs text-muted-foreground flex items-start gap-1.5">
                              <span className="text-brand-gold mt-0.5">•</span>
                              {e}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="flex items-center gap-4 mt-4">
                        <span className="text-xs text-muted-foreground">
                          Deadline: {grant.deadline}
                        </span>
                        <a
                          href={grant.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs text-brand-gold hover:text-brand-gold-light transition-colors"
                        >
                          Apply <ExternalLink className="h-3 w-3" />
                        </a>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              ))}

              {filteredGrants.length === 0 && (
                <p className="text-center text-sm text-muted-foreground py-12">
                  No grants match your search.
                </p>
              )}
            </div>
          </>
        )}

        {/* ===== UNIVERSITIES TAB ===== */}
        {activeTab === "universities" && (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground mb-6">
              Louisiana university partnerships for research, training, and pipeline development.
            </p>
            {UNIVERSITIES.map((uni, i) => (
              <motion.div
                key={uni.name}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="bg-card border border-border/50 rounded-lg p-5"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-heading text-sm font-semibold">{uni.name}</h3>
                    <p className="text-xs text-brand-gold font-mono mt-0.5">{uni.program}</p>
                  </div>
                  <a
                    href={uni.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 rounded-md border border-border/50 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </div>
                <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{uni.focus}</p>
                <p className="text-xs text-muted-foreground mt-2">{uni.contact}</p>
              </motion.div>
            ))}
          </div>
        )}

        {/* ===== CORPORATE TAB ===== */}
        {activeTab === "corporate" && (
          <div className="space-y-6">
            <p className="text-sm text-muted-foreground mb-6">
              Recommended Louisiana corporate and nonprofit structure for Nanny's Culture Kitchen.
            </p>

            {/* For-Profit */}
            <div className="bg-card border border-border/50 rounded-lg p-6">
              <div className="flex items-center gap-2 mb-3">
                <Landmark className="h-4 w-4 text-brand-gold" />
                <h3 className="font-heading text-base font-semibold">
                  {CORPORATE_STRUCTURE.forProfit.name}
                </h3>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded bg-brand-gold/10 text-brand-gold border border-brand-gold/20 font-mono">
                {CORPORATE_STRUCTURE.forProfit.type}
              </span>
              <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
                {CORPORATE_STRUCTURE.forProfit.description}
              </p>
              <div className="mt-4">
                <p className="text-xs font-medium mb-2">Steps to File:</p>
                <ol className="space-y-1.5">
                  {CORPORATE_STRUCTURE.forProfit.steps.map((step, i) => (
                    <li key={i} className="text-xs text-muted-foreground flex items-start gap-2">
                      <span className="text-brand-gold font-mono text-[10px] mt-px">{i + 1}.</span>
                      {step}
                    </li>
                  ))}
                </ol>
              </div>
              <a
                href={CORPORATE_STRUCTURE.forProfit.filing}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 mt-4 text-xs text-brand-gold hover:text-brand-gold-light transition-colors"
              >
                <FileText className="h-3 w-3" /> File via geauxBIZ
              </a>
            </div>

            {/* Nonprofit */}
            <div className="bg-card border border-border/50 rounded-lg p-6">
              <div className="flex items-center gap-2 mb-3">
                <Building className="h-4 w-4 text-brand-green" />
                <h3 className="font-heading text-base font-semibold">
                  {CORPORATE_STRUCTURE.nonProfit.name}
                </h3>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded bg-brand-green/10 text-brand-green border border-brand-green/20 font-mono">
                {CORPORATE_STRUCTURE.nonProfit.type}
              </span>
              <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
                {CORPORATE_STRUCTURE.nonProfit.description}
              </p>
              <div className="mt-4">
                <p className="text-xs font-medium mb-2">Steps to File:</p>
                <ol className="space-y-1.5">
                  {CORPORATE_STRUCTURE.nonProfit.steps.map((step, i) => (
                    <li key={i} className="text-xs text-muted-foreground flex items-start gap-2">
                      <span className="text-brand-green font-mono text-[10px] mt-px">{i + 1}.</span>
                      {step}
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            {/* Indigo Asul */}
            <div className="bg-card border border-border/50 rounded-lg p-6">
              <div className="flex items-center gap-2 mb-3">
                <Globe className="h-4 w-4 text-brand-copper" />
                <h3 className="font-heading text-base font-semibold">
                  {CORPORATE_STRUCTURE.indigoAsul.name}
                </h3>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded bg-brand-copper/10 text-brand-copper border border-brand-copper/20 font-mono">
                {CORPORATE_STRUCTURE.indigoAsul.location}
              </span>
              <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
                {CORPORATE_STRUCTURE.indigoAsul.description}
              </p>
              <p className="text-xs text-muted-foreground mt-3 italic">
                {CORPORATE_STRUCTURE.indigoAsul.structure}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResourcesPage;
