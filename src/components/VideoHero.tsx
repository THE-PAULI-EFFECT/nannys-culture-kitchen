import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { Play, Volume2, VolumeX } from "lucide-react";

interface VideoHeroProps {
  /** MP4 video URL — falls back to poster image if not available */
  videoSrc?: string;
  /** Static poster image for mobile / preload */
  posterSrc?: string;
  /** Overlay headline */
  headline?: string;
  /** Overlay subtitle */
  subtitle?: string;
}

const VideoHero = ({
  videoSrc,
  posterSrc = "/hero-poster.jpg",
  headline = "Nanny's Culture Kitchen",
  subtitle = "Soul food and Latin flavors, reimagined plant-based.",
}: VideoHeroProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    // Animate overlay text in
    if (overlayRef.current) {
      gsap.fromTo(
        overlayRef.current.children,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.15,
          duration: 1,
          delay: 0.5,
          ease: "power3.out",
        }
      );
    }
  }, []);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <section className="relative w-full h-[60vh] md:h-[80vh] overflow-hidden bg-brand-bayou">
      {/* Video layer */}
      {videoSrc ? (
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          src={videoSrc}
          poster={posterSrc}
          autoPlay
          muted
          loop
          playsInline
          onPlay={() => setIsPlaying(true)}
        />
      ) : (
        /* Fallback gradient if no video */
        <div
          className="absolute inset-0 bg-mardi-gras"
          style={{
            backgroundImage: posterSrc ? `url(${posterSrc})` : undefined,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      )}

      {/* Dark overlay for text legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-brand-bayou via-brand-bayou/60 to-transparent" />

      {/* Content overlay */}
      <div
        ref={overlayRef}
        className="relative z-10 h-full flex flex-col items-center justify-end pb-16 md:pb-24 px-4 text-center"
      >
        <p className="text-xs tracking-[0.3em] uppercase text-brand-gold/50 font-mono mb-3">
          Washington, Louisiana → The World
        </p>
        <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight">
          <span className="text-gradient-gold">{headline.split(" ")[0]}</span>{" "}
          <span className="text-foreground">{headline.split(" ").slice(1).join(" ")}</span>
        </h1>
        <p className="mt-4 text-base md:text-lg text-foreground/70 max-w-xl leading-relaxed">
          {subtitle}
        </p>
      </div>

      {/* Video controls */}
      {videoSrc && (
        <div className="absolute bottom-4 right-4 z-20 flex gap-2">
          {!isPlaying && (
            <button
              onClick={handlePlay}
              className="p-2 rounded-full bg-brand-bayou/60 backdrop-blur border border-border/30 text-foreground/70 hover:text-foreground transition-colors"
              aria-label="Play video"
            >
              <Play className="h-4 w-4" />
            </button>
          )}
          <button
            onClick={toggleMute}
            className="p-2 rounded-full bg-brand-bayou/60 backdrop-blur border border-border/30 text-foreground/70 hover:text-foreground transition-colors"
            aria-label={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
          </button>
        </div>
      )}
    </section>
  );
};

export default VideoHero;
