import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section className="relative pt-16 min-h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Warm gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/10" />
      
      <div className="relative container mx-auto px-4 text-center py-20">
        <h1
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-primary leading-tight mb-6"
          style={{ fontFamily: "'Lora', serif" }}
        >
          A Concerned Christian
        </h1>
        <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
          A podcast by Eric Wait — exploring faith, culture, and the call to thoughtful Christianity in today's world.
        </p>
        <Button
          size="lg"
          className="text-base px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-shadow"
          asChild
        >
          <a href="#podcast">Listen Now</a>
        </Button>
      </div>
    </section>
  );
};

export default HeroSection;
