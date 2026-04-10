import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const AboutSection = () => {
  return (
    <section id="about" className="py-20 bg-card">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-10 md:gap-16">
          {/* Photo */}
          <div className="shrink-0">
            <Avatar className="w-48 h-48 md:w-56 md:h-56 border-4 border-accent/30 shadow-lg">
              <AvatarImage 
                src={`${import.meta.env.BASE_URL}EricWait.png`} 
                alt="Eric Wait" 
                className="object-cover" 
              />
              <AvatarFallback className="text-4xl font-semibold bg-secondary text-muted-foreground" style={{ fontFamily: "'Lora', serif" }}>
                EW
              </AvatarFallback>
            </Avatar>
          </div>

          {/* Bio */}
          <div className="text-center md:text-left">
            <h2
              className="text-3xl md:text-4xl font-bold text-primary mb-4"
              style={{ fontFamily: "'Lora', serif" }}
            >
              Meet Eric Wait
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Eric Wait is a retired pastor with decades of experience shepherding communities and teaching the Word. After years of ministry, Eric felt a growing urgency to speak into the cultural and spiritual challenges facing Christians today.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              That calling led to <em>A Concerned Christian</em> — a podcast where Eric brings a thoughtful, pastoral voice to the conversations that matter most. His hope is to encourage believers to think deeply, live faithfully, and hold fast to the truth of Scripture.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
