import { Button } from "@/components/ui/button";
import heroBanner from "@/assets/hero-banner.png";

const HeroSection = () => {
  return (
    <section className="relative pt-16 min-h-[85vh] flex items-center justify-center overflow-hidden bg-slate-950">
      {/* Background image with gradient fallback */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000"
        style={{ 
          backgroundImage: `linear-gradient(to bottom, rgba(15, 23, 42, 0.5), rgba(15, 23, 42, 0.8)), url(${heroBanner})`,
        }}
      />
      {/* Additional dark overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-slate-950/20 to-transparent" />

      <div className="relative container mx-auto px-4 text-center py-20 flex flex-col items-center justify-end min-h-[45vh]">
        <h1
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-4 text-background drop-shadow-lg"
          style={{ fontFamily: "'Lora', serif" }}
        >
          A Concerned Christian
        </h1>
        <p className="text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-8 leading-relaxed text-background/90 drop-shadow">
          A podcast by Eric Wait — exploring faith, culture, and the call to thoughtful Christianity in today's world.
        </p>
        <Button
          size="lg"
          className="text-base px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-shadow bg-accent text-accent-foreground hover:bg-accent/90"
          asChild
        >
          <a href="#podcast">Listen Now</a>
        </Button>
      </div>
    </section>
  );
};

export default HeroSection;
